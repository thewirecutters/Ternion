import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  PHASE_LABEL,
  REFINE_LABEL,
  type Held,
  type OodaPhase,
  type RefineKind,
  type Run,
} from "@/lib/synthesis/types";
import { useEngine } from "@/lib/synthesis/store";
import { cn } from "@/lib/utils";

const PHASES: OodaPhase[] = ["observe", "orient", "decide", "act"];
const REFINES: RefineKind[] = ["faster", "deeper", "adversary", "simplify", "compress"];

function heldTone(held: Held, self: Held) {
  if (held !== self) return "bg-surface text-muted shadow-[var(--shadow-border)]";
  if (self === 1) return "bg-plus text-plus-fg";
  if (self === -1) return "bg-minus text-minus-fg";
  return "bg-accent text-accent-fg";
}

export function BriefingView({ run }: { run: Run }) {
  const { briefing } = run;
  const status = useEngine((s) => s.status);
  const error = useEngine((s) => s.error);
  const live = useEngine((s) => s.live);
  const runEngine = useEngine((s) => s.run);
  const running = status === "running";
  const [copied, setCopied] = useState(false);

  const copyCard = async () => {
    const card = briefing.actionCard;
    if (!card) return;
    const text = [
      briefing.title,
      "",
      `Objective: ${card.objective}`,
      `Next move: ${card.nextMove}`,
      `Metric: ${card.metric}`,
      `Do not: ${card.doNot}`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <article className="mx-auto w-full max-w-3xl px-1 pb-28 pt-4 sm:pt-8">
      <header className="rise">
        <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          {briefing.topology} · held {briefing.register.held === 1 ? "+1" : briefing.register.held}
        </p>
        <h1 className="mt-2 font-display text-xl font-medium tracking-[-0.03em] text-fg sm:text-2xl">
          {briefing.title}
        </h1>
        <p className="mt-3 text-sm leading-normal text-muted">{briefing.proposition}</p>
      </header>

      <section className="rise rise-1 mt-8 grid gap-2 sm:grid-cols-3">
        {(
          [
            { key: 1 as Held, label: "+1 Thesis", body: briefing.register.thesis },
            { key: 0 as Held, label: "0 Synthesis", body: briefing.register.synthesis },
            { key: -1 as Held, label: "−1 Antithesis", body: briefing.register.antithesis },
          ] as const
        ).map((col) => (
          <div
            key={col.key}
            className={cn(
              "rounded-xl p-4 transition-[box-shadow,background-color,color] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]",
              heldTone(briefing.register.held, col.key),
            )}
          >
            <p className="text-xs font-medium tracking-[0.12em] uppercase opacity-80">
              {col.label}
              {briefing.register.held === col.key ? " · held" : ""}
            </p>
            <p className="mt-2 text-sm leading-normal">{col.body}</p>
          </div>
        ))}
      </section>

      <section className="rise rise-2 mt-10">
        <h2 className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">Verdict</h2>
        <div className="mt-3 space-y-3 text-base leading-normal text-fg">
          {briefing.verdict.split("\n").filter(Boolean).map((para) => (
            <p key={para.slice(0, 48)}>{para}</p>
          ))}
        </div>
        <p className="mt-4 text-sm leading-normal text-muted">{briefing.frame}</p>
      </section>

      <section className="rise rise-3 mt-10">
        <h2 className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">OODA</h2>
        <ol className="mt-3 grid gap-2 sm:grid-cols-4">
          {PHASES.map((phase) => {
            const active = briefing.ooda.phase === phase;
            return (
              <li
                key={phase}
                className={cn(
                  "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
                  active && "shadow-[var(--shadow-held)]",
                )}
              >
                <p className="text-xs font-medium tracking-[0.12em] text-subtle uppercase">
                  {PHASE_LABEL[phase]}
                  {active ? " · now" : ""}
                  {phase === "observe" && briefing.ooda.compressed ? " · fused" : ""}
                </p>
                <p className="mt-2 text-sm leading-normal text-fg">{briefing.ooda[phase]}</p>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="rise rise-4 mt-10">
        <h2 className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          Decision gates
        </h2>
        <ul className="mt-3 divide-y divide-border">
          {briefing.gates.map((gate) => (
            <li key={gate.domain} className="flex gap-4 py-3 first:pt-0 last:pb-0">
              <span
                className={cn(
                  "mt-0.5 w-16 shrink-0 text-xs font-medium tracking-[0.08em] uppercase",
                  gate.status === "true" && "text-plus",
                  gate.status === "false" && "text-minus",
                  gate.status === "unknown" && "text-subtle",
                )}
              >
                {gate.status}
              </span>
              <div className="min-w-0">
                <p className="text-sm text-fg">{gate.domain}</p>
                <p className="mt-1 text-sm leading-normal text-muted">{gate.condition}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-subtle">
          Unknown is treated as false. Do not Act until the minimum conditions are true.
        </p>
      </section>

      <section className="rise rise-5 mt-10">
        <h2 className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          Failure modes
        </h2>
        <ol className="mt-3 grid gap-2">
          {briefing.failures.map((fail, i) => (
            <li key={fail.mode} className="rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]">
              <p className="text-sm text-fg">
                <span className="mr-2 font-display text-muted">{i + 1}</span>
                {fail.mode}
              </p>
              <dl className="mt-3 grid gap-2 text-sm leading-normal sm:grid-cols-3">
                <div>
                  <dt className="text-xs tracking-[0.1em] text-subtle uppercase">Trigger</dt>
                  <dd className="mt-1 text-muted">{fail.trigger}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.1em] text-subtle uppercase">Recycle</dt>
                  <dd className="mt-1 text-muted">{fail.recycle}</dd>
                </div>
                <div>
                  <dt className="text-xs tracking-[0.1em] text-subtle uppercase">Escalate</dt>
                  <dd className="mt-1 text-muted">{fail.escalation}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ol>
      </section>

      {briefing.actionCard ? (
        <section className="rise rise-6 mt-10 rounded-2xl bg-raised p-5 shadow-[var(--shadow-border)] sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-display text-lg tracking-[-0.02em] text-fg">Action card</h2>
            <Button type="button" variant="ghost" size="sm" onClick={() => void copyCard()}>
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs tracking-[0.1em] text-subtle uppercase">Objective</dt>
              <dd className="mt-1 text-sm leading-normal text-fg">{briefing.actionCard.objective}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.1em] text-subtle uppercase">Next move</dt>
              <dd className="mt-1 text-sm leading-normal text-fg">{briefing.actionCard.nextMove}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.1em] text-subtle uppercase">Metric</dt>
              <dd className="mt-1 text-sm leading-normal text-fg">{briefing.actionCard.metric}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.1em] text-subtle uppercase">Do not</dt>
              <dd className="mt-1 text-sm leading-normal text-fg">{briefing.actionCard.doNot}</dd>
            </div>
          </dl>
        </section>
      ) : null}

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">Assumptions</h2>
          <ul className="mt-3 space-y-2 text-sm leading-normal text-muted">
            {briefing.assumptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">Unknowns</h2>
          <ul className="mt-3 space-y-2 text-sm leading-normal text-muted">
            {briefing.unknowns.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <p className="mt-8 text-sm text-subtle">{briefing.refine}</p>

      {error ? (
        <p className="mt-6 text-sm text-minus" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-2">
        {REFINES.map((kind) => (
          <Button
            key={kind}
            type="button"
            variant="outline"
            size="chip"
            disabled={running || live === false}
            onClick={() => void runEngine(kind)}
          >
            {REFINE_LABEL[kind]}
          </Button>
        ))}
      </div>
      {live === false ? (
        <p className="mt-3 text-xs text-subtle">Refine needs the live engine.</p>
      ) : null}
    </article>
  );
}
