import { PHASE_LABEL, type OodaPhase } from "@/lib/synthesis/types";
import { useEngine } from "@/lib/synthesis/store";
import { cn } from "@/lib/utils";

const PHASES: OodaPhase[] = ["observe", "orient", "decide", "act"];

const COPY: Record<OodaPhase, string> = {
  observe: "Reading the field without collapsing it.",
  orient: "Holding thesis, antithesis, and the third state.",
  decide: "Testing gates. Unknown is treated as false.",
  act: "Writing only what shortens the next cycle.",
};

export function RunningStage() {
  const phase = useEngine((s) => s.phase);

  return (
    <div className="mx-auto flex min-h-[60dvh] w-full max-w-xl flex-col items-center justify-center px-1 py-16 text-center">
      <p className="text-xs font-medium tracking-[0.18em] text-subtle uppercase">Loop</p>
      <ol className="mt-6 flex items-center gap-2">
        {PHASES.map((item, i) => (
          <li key={item} className="flex items-center gap-2">
            <span
              className={cn(
                "text-sm tracking-[0.08em] uppercase",
                item === phase ? "text-fg phase-pulse" : "text-subtle",
              )}
            >
              {PHASE_LABEL[item]}
            </span>
            {i < PHASES.length - 1 ? (
              <span className="text-subtle" aria-hidden>
                ·
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <p className="mt-8 font-display text-xl tracking-[-0.03em] text-fg sm:text-2xl">
        {COPY[phase]}
      </p>
    </div>
  );
}
