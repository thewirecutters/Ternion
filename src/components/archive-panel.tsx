import { formatDistanceToNow } from "date-fns";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EXAMPLES } from "@/lib/synthesis/examples";
import { MODE_LABEL } from "@/lib/synthesis/types";
import { useEngine } from "@/lib/synthesis/store";
import { cn } from "@/lib/utils";

export function ArchivePanel() {
  const open = useEngine((s) => s.archiveOpen);
  const archive = useEngine((s) => s.archive);
  const current = useEngine((s) => s.current);
  const setArchiveOpen = useEngine((s) => s.setArchiveOpen);
  const loadRun = useEngine((s) => s.loadRun);
  const loadExample = useEngine((s) => s.loadExample);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-bg/60 transition-opacity duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={() => setArchiveOpen(false)}
        aria-hidden={!open}
      />
      <aside
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-surface shadow-[var(--shadow-border)] transition-transform duration-[var(--motion-slow)] ease-[var(--ease-smooth-out)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-hidden={!open}
        aria-label="Archive"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <h2 className="font-display text-lg tracking-[-0.02em]">Archive</h2>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-11"
            onClick={() => setArchiveOpen(false)}
            aria-label="Close archive"
          >
            <X className="size-5" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-8">
          <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">Examples</p>
          <ul className="mt-3 space-y-2">
            {EXAMPLES.map((run) => (
              <li key={run.id}>
                <button
                  type="button"
                  onClick={() => loadExample(run.id)}
                  className={cn(
                    "w-full rounded-xl px-4 py-3 text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)]",
                    current?.id === run.id
                      ? "shadow-[var(--shadow-held)]"
                      : "hover:shadow-[var(--shadow-border-hover)]",
                  )}
                >
                  <span className="block text-sm text-fg">{run.briefing.title}</span>
                  <span className="mt-1 block text-xs text-subtle">{MODE_LABEL[run.mode]}</span>
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs font-medium tracking-[0.14em] text-subtle uppercase">
            This device
          </p>
          {archive.length === 0 ? (
            <p className="mt-3 text-sm text-muted">No live briefings yet.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {archive.map((run) => (
                <li key={run.id}>
                  <button
                    type="button"
                    onClick={() => loadRun(run)}
                    className={cn(
                      "w-full rounded-xl px-4 py-3 text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)]",
                      current?.id === run.id
                        ? "shadow-[var(--shadow-held)]"
                        : "hover:shadow-[var(--shadow-border-hover)]",
                    )}
                  >
                    <span className="block text-sm text-fg">{run.briefing.title}</span>
                    <span className="mt-1 block text-xs text-subtle">
                      {MODE_LABEL[run.mode]} ·{" "}
                      {formatDistanceToNow(run.createdAt, { addSuffix: true })}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
