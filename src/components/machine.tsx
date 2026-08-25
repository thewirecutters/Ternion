import { useMemo, useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { compileTern, opcodeBits } from "@/lib/m0/compiler";
import { MACHINE_EXAMPLES } from "@/lib/m0/examples";
import { tritChar, tritValue, toInt, wordToStr, type Word } from "@/lib/m0/rbns";
import { runProgram, type SimResult } from "@/lib/m0/simulator";
import { cn } from "@/lib/utils";

type Run = {
  name: string;
  program: ReturnType<typeof compileTern>["program"];
  ast: ReturnType<typeof compileTern>["ast"];
  sim: SimResult;
  expected?: number;
};

function TritWord({ word, label }: { word: Word; label?: string }) {
  return (
    <div>
      {label ? (
        <p className="mb-2 text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          {label}
        </p>
      ) : null}
      <ol className="flex flex-wrap gap-0.5" aria-label="24-trit word, MSB left">
        {[...word].reverse().map((trit, i) => {
          const v = tritValue(trit);
          return (
            <li
              key={`${i}-${v}`}
              title={`t${WORD_INDEX(i)} ${tritChar(trit)}  RBNS (${trit[0]},${trit[1]})`}
              className={cn(
                "flex size-5 items-center justify-center rounded-xs font-mono text-xs sm:size-6",
                v === 1 && "bg-plus text-plus-fg",
                v === -1 && "bg-minus text-minus-fg",
                v === 0 && "bg-raised text-subtle",
              )}
            >
              {tritChar(trit)}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function WORD_INDEX(visualFromMsb: number) {
  return 23 - visualFromMsb;
}

export function Machine() {
  const [source, setSource] = useState(MACHINE_EXAMPLES[0]!.source);
  const [activeId, setActiveId] = useState(MACHINE_EXAMPLES[0]!.id);
  const [error, setError] = useState<string | null>(null);
  const [run, setRun] = useState<Run | null>(() => compileAndRun(MACHINE_EXAMPLES[0]!.source));

  const liveRegs = useMemo(() => {
    if (!run) return [];
    return Object.entries(run.sim.registers)
      .map(([name, word]) => ({ name, word, value: toInt(word) }))
      .filter((row) => row.value !== 0)
      .sort((a, b) => Number(a.name.slice(1)) - Number(b.name.slice(1)));
  }, [run]);

  const onRun = (next = source, id = activeId) => {
    try {
      const compiled = compileTern(next);
      const sim = runProgram(compiled.program);
      const expected = MACHINE_EXAMPLES.find((ex) => ex.id === id)?.expected;
      setRun({
        name: compiled.ast.name,
        program: compiled.program,
        ast: compiled.ast,
        sim,
        expected,
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Compile failed.");
    }
  };

  const match =
    run?.sim.output && run.expected !== undefined
      ? run.sim.output.value === run.expected
      : null;

  return (
    <div className="mx-auto w-full max-w-5xl px-1 pb-20 pt-4 sm:pt-8">
      <header className="rise max-w-2xl">
        <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
          ISA M0 · 24-trit word · RBNS bit-pairs
        </p>
        <h1 className="mt-2 font-display text-xl font-medium tracking-[-0.03em] text-fg sm:text-2xl">
          Tern on a binary substrate.
        </h1>
        <p className="mt-3 text-sm leading-normal text-muted">
          Each trit in {`{-1, 0, +1}`} is a bit-pair (a, b) with value a − b.
          (1,0) is +1, (0,1) is −1, (0,0) is 0. Negation is a swap. Addition
          carries in balanced ternary. The field desk thinks in three states;
          this desk executes them.
        </p>
      </header>

      <div className="rise rise-1 mt-8 flex flex-wrap gap-2">
        {MACHINE_EXAMPLES.map((ex) => (
          <Button
            key={ex.id}
            type="button"
            variant={activeId === ex.id ? "primary" : "outline"}
            size="chip"
            onClick={() => {
              setActiveId(ex.id);
              setSource(ex.source);
              onRun(ex.source, ex.id);
            }}
          >
            {ex.title}
          </Button>
        ))}
      </div>

      <div className="rise rise-2 mt-6 grid gap-6 lg:grid-cols-2">
        <div>
          <label htmlFor="tern-source" className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
            Field source
          </label>
          <Textarea
            id="tern-source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            spellCheck={false}
            className="mt-2 min-h-56 font-mono text-sm leading-relaxed"
          />
          <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-subtle">
              {MACHINE_EXAMPLES.find((ex) => ex.id === activeId)?.blurb ??
                "Custom field"}
            </p>
            <Button type="button" onClick={() => onRun()} className="w-full sm:w-auto">
              <Play className="size-4" />
              Compile and run
            </Button>
          </div>
          {error ? (
            <p className="mt-3 text-sm text-minus" role="alert">
              {error}
            </p>
          ) : null}
        </div>

        {run ? (
          <div className="rounded-2xl bg-surface p-4 shadow-[var(--shadow-border)] sm:p-5">
            <p className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
              M0 assembly · field {run.name}
            </p>
            <ol className="mt-3 space-y-1 font-mono text-sm">
              {run.program.map((line, i) => (
                <li key={`${i}-${line.text}`} className="flex gap-3 text-fg">
                  <span className="w-6 text-subtle tabular-nums">{String(i).padStart(2, "0")}</span>
                  <span className="w-14 text-subtle">{opcodeBits(line.op)}</span>
                  <span>{line.text}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-xs text-subtle">
              6-bit opcode on the left is the binary encoding of the trit machine.
            </p>
          </div>
        ) : null}
      </div>

      {run ? (
        <section className="rise rise-3 mt-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="font-display text-lg tracking-[-0.02em]">
              Memory 100
            </h2>
            <p className="text-sm text-muted">
              {run.sim.cycles} cycles · {run.sim.energyPj.toFixed(1)} pJ
              {match === true ? " · verified" : match === false ? " · mismatch" : ""}
            </p>
          </div>
          {run.sim.output ? (
            <div className="mt-4 rounded-2xl bg-raised p-4 sm:p-5">
              <TritWord word={run.sim.output.word} label="24-trit word, MSB left" />
              <p className="mt-4 font-mono text-sm text-fg">
                {wordToStr(run.sim.output.word)}
                <span className="ml-3 text-muted">= {run.sim.output.value}</span>
                {run.expected !== undefined ? (
                  <span className="ml-3 text-subtle">expected {run.expected}</span>
                ) : null}
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-muted">No store to address 100.</p>
          )}
        </section>
      ) : null}

      {run ? (
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
              Live registers
            </h2>
            {liveRegs.length === 0 ? (
              <p className="mt-3 text-sm text-muted">All zeros.</p>
            ) : (
              <ul className="mt-3 divide-y divide-border">
                {liveRegs.map((row) => (
                  <li key={row.name} className="flex items-baseline justify-between gap-3 py-2">
                    <span className="font-mono text-sm text-fg">{row.name}</span>
                    <span className="truncate font-mono text-xs text-muted">
                      {wordToStr(row.word)}
                    </span>
                    <span className="shrink-0 font-mono text-sm tabular-nums text-fg">
                      {row.value}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2 className="text-xs font-medium tracking-[0.14em] text-subtle uppercase">
              Trace
            </h2>
            <ol className="mt-3 space-y-1 font-mono text-sm text-muted">
              {run.sim.trace.map((step) => (
                <li key={step.pc} className="flex gap-3">
                  <span className="w-6 text-subtle tabular-nums">
                    {String(step.pc).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-fg">{step.text}</span>
                  <span className="tabular-nums text-subtle">{step.energy.toFixed(1)} pJ</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}
    </div>
  );
}

function compileAndRun(source: string): Run | null {
  try {
    const compiled = compileTern(source);
    const sim = runProgram(compiled.program);
    return {
      name: compiled.ast.name,
      program: compiled.program,
      ast: compiled.ast,
      sim,
      expected: MACHINE_EXAMPLES[0]?.expected,
    };
  } catch {
    return null;
  }
}
