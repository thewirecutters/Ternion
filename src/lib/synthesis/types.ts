export type Mode = "auto" | "structured" | "artifact";
export type Topology = "cooperative" | "adversarial" | "mixed";
export type Held = -1 | 0 | 1;
export type OodaPhase = "observe" | "orient" | "decide" | "act";
export type GateStatus = "true" | "false" | "unknown";
export type RefineKind = "faster" | "deeper" | "adversary" | "simplify" | "compress";

export type Gate = {
  domain: string;
  condition: string;
  status: GateStatus;
};

export type FailureMode = {
  mode: string;
  trigger: string;
  recycle: string;
  escalation: string;
};

export type ActionCard = {
  objective: string;
  nextMove: string;
  metric: string;
  doNot: string;
};

export type Briefing = {
  title: string;
  proposition: string;
  topology: Topology;
  frame: string;
  verdict: string;
  register: {
    thesis: string;
    antithesis: string;
    synthesis: string;
    held: Held;
  };
  ooda: {
    observe: string;
    orient: string;
    decide: string;
    act: string;
    phase: OodaPhase;
    compressed: boolean;
  };
  gates: Gate[];
  failures: FailureMode[];
  actionCard: ActionCard | null;
  unknowns: string[];
  assumptions: string[];
  refine: string;
};

export type Run = {
  id: string;
  createdAt: number;
  input: string;
  mode: Mode;
  source: "example" | "live";
  briefing: Briefing;
};

export const MODE_LABEL: Record<Mode, string> = {
  auto: "Auto",
  structured: "Structured",
  artifact: "Artifact",
};

export const PHASE_LABEL: Record<OodaPhase, string> = {
  observe: "Observe",
  orient: "Orient",
  decide: "Decide",
  act: "Act",
};

export const HELD_LABEL: Record<Held, string> = {
  [-1]: "Denied",
  [0]: "Synthesis",
  [1]: "Affirmed",
};

export const REFINE_LABEL: Record<RefineKind, string> = {
  faster: "Faster",
  deeper: "Deeper",
  adversary: "Adversary",
  simplify: "Simplify",
  compress: "Compress",
};
