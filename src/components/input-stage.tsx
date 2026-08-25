import { ArrowUpRight } from "lucide-react";
import { TrinaryMark } from "@/components/mark";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { EXAMPLES } from "@/lib/synthesis/examples";
import { MODE_LABEL, type Mode } from "@/lib/synthesis/types";
import { useEngine } from "@/lib/synthesis/store";
import { cn } from "@/lib/utils";

const MODES: Mode[] = ["auto", "structured", "artifact"];

export function InputStage() {
  const input = useEngine((s) => s.input);
  const mode = useEngine((s) => s.mode);
  const status = useEngine((s) => s.status);
  const error = useEngine((s) => s.error);
  const live = useEngine((s) => s.live);
  const setInput = useEngine((s) => s.setInput);
  const setMode = useEngine((s) => s.setMode);
  const loadExample = useEngine((s) => s.loadExample);
  const run = useEngine((s) => s.run);
  const running = status === "running";

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-1 pb-16 pt-6 sm:pt-12">
      <TrinaryMark size={64} className="rise mb-8 opacity-90" />
      <h1 className="rise rise-1 font-display text-2xl font-medium tracking-[-0.03em] text-fg sm:text-3xl">
        Hold all three states.
      </h1>
      <p className="rise rise-2 mt-3 max-w-md text-center text-sm leading-normal text-muted">
        Paste a problem, a decision, or a document. The engine will not collapse
        to binary.
      </p>

      <div className="rise rise-3 mt-10 w-full">
        <label htmlFor="problem" className="sr-only">
          Problem
        </label>
        <Textarea
          id="problem"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
              e.preventDefault();
              void run();
            }
          }}
          placeholder="A decision that is being forced into either/or…"
          disabled={running}
        />
        <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="flex h-11 items-center rounded-xl bg-surface p-1 shadow-[var(--shadow-border)]"
            role="tablist"
            aria-label="Output mode"
          >
            {MODES.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={mode === item}
                onClick={() => setMode(item)}
                className={cn(
                  "h-9 flex-1 rounded-lg px-3.5 text-sm transition-[background-color,color] duration-[var(--motion-quick)] ease-[var(--ease-out)] sm:flex-none",
                  mode === item ? "bg-raised text-fg" : "text-muted hover:text-fg",
                )}
              >
                {MODE_LABEL[item]}
              </button>
            ))}
          </div>
          <Button
            type="button"
            size="lg"
            onClick={() => void run()}
            disabled={running || !input.trim()}
            className="w-full sm:w-auto"
          >
            Synthesize
            <ArrowUpRight className="size-4" />
          </Button>
        </div>
        {error ? (
          <p className="mt-3 text-sm text-minus" role="alert">
            {error}
          </p>
        ) : live === false ? (
          <p className="mt-3 text-sm text-muted">
            Live engine is offline. Open an example briefing to see a full cycle.
          </p>
        ) : (
          <p className="mt-3 hidden text-sm text-subtle sm:block">
            ⌘ Enter to run
          </p>
        )}
      </div>

      <div className="rise rise-4 mt-14 w-full">
        <p className="mb-3 text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          Try a field
        </p>
        <ul className="grid gap-2">
          {EXAMPLES.map((ex) => (
            <li key={ex.id}>
              <button
                type="button"
                onClick={() => loadExample(ex.id)}
                className="group flex w-full items-start gap-3 rounded-xl bg-surface px-4 py-3.5 text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] hover:shadow-[var(--shadow-border-hover)]"
              >
                <span className="mt-0.5 font-display text-lg leading-none text-subtle">
                  {ex.briefing.register.held === 0
                    ? "0"
                    : ex.briefing.register.held === 1
                      ? "+1"
                      : "−1"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-fg">{ex.input}</span>
                  <span className="mt-1 block text-xs text-subtle">
                    {MODE_LABEL[ex.mode]} · {ex.briefing.title}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
