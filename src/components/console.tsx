import { useEffect, useState } from "react";
import { Archive, Plus } from "lucide-react";
import { ArchivePanel } from "@/components/archive-panel";
import { BriefingView } from "@/components/briefing-view";
import { InputStage } from "@/components/input-stage";
import { Machine } from "@/components/machine";
import { RunningStage } from "@/components/running-stage";
import { Button } from "@/components/ui/button";
import { TrinaryMark } from "@/components/mark";
import { aiStatus } from "@/lib/synthesis/api";
import { hydrateArchive, useEngine } from "@/lib/synthesis/store";
import { PHASE_LABEL } from "@/lib/synthesis/types";
import { cn } from "@/lib/utils";

type Desk = "field" | "machine";

export function Console() {
  const [desk, setDesk] = useState<Desk>("field");
  const current = useEngine((s) => s.current);
  const status = useEngine((s) => s.status);
  const phase = useEngine((s) => s.phase);
  const live = useEngine((s) => s.live);
  const newBrief = useEngine((s) => s.newBrief);
  const setArchiveOpen = useEngine((s) => s.setArchiveOpen);
  const setLive = useEngine((s) => s.setLive);
  const tickPhase = useEngine((s) => s.tickPhase);

  useEffect(() => {
    hydrateArchive();
    void aiStatus().then((res) => setLive(res.available));
  }, [setLive]);

  useEffect(() => {
    if (status !== "running") return;
    const id = window.setInterval(() => tickPhase(), 900);
    return () => window.clearInterval(id);
  }, [status, tickPhase]);

  const statusLabel =
    desk === "machine"
      ? "M0"
      : status === "running"
        ? PHASE_LABEL[phase]
        : current
          ? `held ${current.briefing.register.held === 1 ? "+1" : current.briefing.register.held}`
          : live === false
            ? "examples"
            : "idle";

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 bg-bg/90 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6">
        <button
          type="button"
          onClick={() => {
            setDesk("field");
            newBrief();
          }}
          className="flex min-h-11 items-center gap-2.5 text-left"
          aria-label="TERNION home"
        >
          <TrinaryMark size={28} />
          <span className="font-display text-lg tracking-[-0.03em]">TERNION</span>
          <span className="hidden text-xs tracking-[0.16em] text-subtle uppercase sm:inline">
            v8
          </span>
        </button>
        <div
          className="flex h-11 items-center rounded-xl bg-surface p-1 shadow-[var(--shadow-border)]"
          role="tablist"
          aria-label="Desk"
        >
          {(["field", "machine"] as const).map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={desk === item}
              onClick={() => setDesk(item)}
              className={cn(
                "h-9 rounded-lg px-3.5 text-sm capitalize transition-[background-color,color] duration-[var(--motion-quick)] ease-[var(--ease-out)]",
                desk === item ? "bg-raised text-fg" : "text-muted hover:text-fg",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="mr-1 hidden text-xs tracking-[0.14em] text-subtle uppercase md:inline">
            {statusLabel}
          </span>
          {desk === "field" && current ? (
            <Button type="button" variant="ghost" size="sm" onClick={newBrief}>
              <Plus className="size-4" />
              New
            </Button>
          ) : null}
          {desk === "field" ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Open archive"
              onClick={() => setArchiveOpen(true)}
            >
              <Archive className="size-5" />
            </Button>
          ) : null}
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6">
        {desk === "machine" ? (
          <Machine />
        ) : status === "running" && !current ? (
          <RunningStage />
        ) : current ? (
          <>
            {status === "running" ? <RunningStage /> : <BriefingView run={current} />}
          </>
        ) : (
          <InputStage />
        )}
      </main>

      {desk === "field" ? <ArchivePanel /> : null}
    </div>
  );
}
