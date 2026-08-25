import { create } from "zustand";
import { EXAMPLES } from "./examples";
import { synthesize } from "./api";
import type { Briefing, Mode, OodaPhase, RefineKind, Run } from "./types";

const STORAGE_KEY = "ternion.archive.v1";
const PHASES: OodaPhase[] = ["observe", "orient", "decide", "act"];

function uid() {
  return `run-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function loadArchive(): Run[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Run[];
    return Array.isArray(parsed) ? parsed.slice(0, 24) : [];
  } catch {
    return [];
  }
}

function saveArchive(archive: Run[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(archive.slice(0, 24)));
  } catch {
    /* quota */
  }
}

type EngineState = {
  input: string;
  mode: Mode;
  status: "idle" | "running" | "error";
  error: string | null;
  phase: OodaPhase;
  current: Run | null;
  archive: Run[];
  archiveOpen: boolean;
  live: boolean | null;
  setInput: (value: string) => void;
  setMode: (mode: Mode) => void;
  setArchiveOpen: (open: boolean) => void;
  setLive: (live: boolean) => void;
  tickPhase: () => void;
  newBrief: () => void;
  loadRun: (run: Run) => void;
  loadExample: (id: string) => void;
  run: (refine?: RefineKind) => Promise<void>;
};

export const useEngine = create<EngineState>((set, get) => ({
  input: "",
  mode: "auto",
  status: "idle",
  error: null,
  phase: "observe",
  current: null,
  archive: [],
  archiveOpen: false,
  live: null,
  setInput: (input) => set({ input, error: null }),
  setMode: (mode) => set({ mode }),
  setArchiveOpen: (archiveOpen) => set({ archiveOpen }),
  setLive: (live) => set({ live }),
  tickPhase: () => {
    const i = PHASES.indexOf(get().phase);
    set({ phase: PHASES[(i + 1) % PHASES.length] });
  },
  newBrief: () =>
    set({
      current: null,
      error: null,
      status: "idle",
      phase: "observe",
      input: "",
      archiveOpen: false,
    }),
  loadRun: (run) =>
    set({
      current: run,
      input: run.input,
      mode: run.mode,
      status: "idle",
      error: null,
      archiveOpen: false,
    }),
  loadExample: (id) => {
    const run = EXAMPLES.find((item) => item.id === id);
    if (run) get().loadRun(run);
  },
  run: async (refine) => {
    const { input, mode, current, archive, live } = get();
    const text = input.trim();
    if (!text) {
      set({ error: "Paste a problem first.", status: "error" });
      return;
    }
    if (live === false) {
      set({
        error: "Live synthesis is unavailable. Open an example briefing instead.",
        status: "error",
      });
      return;
    }
    set({ status: "running", error: null, phase: "observe", archiveOpen: false });
    try {
      const result = await synthesize({
        data: {
          input: text,
          mode,
          refine,
          prior: refine && current ? current.briefing : undefined,
        },
      });
      if (!result.ok) {
        const liveOff = /out of credits|unavailable here/i.test(result.error);
        set({
          status: "error",
          error: result.error,
          live: liveOff ? false : get().live,
        });
        return;
      }
      const briefing: Briefing = result.briefing;
      const run: Run = {
        id: uid(),
        createdAt: Date.now(),
        input: text,
        mode,
        source: "live",
        briefing,
      };
      const nextArchive = [run, ...archive.filter((item) => item.id !== run.id)].slice(0, 24);
      saveArchive(nextArchive);
      set({
        current: run,
        archive: nextArchive,
        status: "idle",
        phase: briefing.ooda.phase,
      });
    } catch {
      set({
        status: "error",
        error: "The loop broke before a briefing landed. Try again.",
      });
    }
  },
}));

export function hydrateArchive() {
  const archive = loadArchive();
  useEngine.setState({ archive });
}
