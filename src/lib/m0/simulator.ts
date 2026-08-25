import { fromInt, rbnsAdd, rbnsMul, rbnsNegate, toInt, type Word } from "./rbns";
import type { AsmLine } from "./compiler";

export type TraceStep = {
  pc: number;
  text: string;
  op: string;
  energy: number;
};

export type SimResult = {
  registers: Record<string, Word>;
  memory: Record<number, Word>;
  cycles: number;
  energyPj: number;
  halted: boolean;
  trace: TraceStep[];
  output: { addr: number; word: Word; value: number } | null;
};

const ENERGY: Record<string, number> = {
  LOAD: 1.2,
  STORE: 1.0,
  ADD: 0.8,
  NEG: 0.2,
  MUL: 2.4,
  CMP3: 0.6,
  HALT: 0,
};

export class M0Simulator {
  registers: Record<string, Word> = {};
  memory: Record<number, Word> = {};
  pc = 0;
  halted = false;
  cycles = 0;
  energyPj = 0;
  trace: TraceStep[] = [];
  program: AsmLine[] = [];

  constructor() {
    this.reset();
  }

  reset() {
    this.registers = {};
    for (let i = 0; i < 27; i++) this.registers[`R${i}`] = fromInt(0);
    this.memory = {};
    this.pc = 0;
    this.halted = false;
    this.cycles = 0;
    this.energyPj = 0;
    this.trace = [];
  }

  load(program: AsmLine[]) {
    this.reset();
    this.program = program;
  }

  step(): boolean {
    if (this.halted || this.pc >= this.program.length) {
      this.halted = true;
      return false;
    }
    const instr = this.program[this.pc]!;
    const pc = this.pc;
    this.pc += 1;
    this.cycles += 1;
    const energy = ENERGY[instr.op] ?? 0;
    this.energyPj += energy;
    this.trace.push({ pc, text: instr.text, op: instr.op, energy });
    this.exec(instr);
    return !this.halted;
  }

  runAll() {
    while (this.step()) {
      if (this.cycles > 256) {
        throw new Error("Runaway program — halted at 256 cycles.");
      }
    }
  }

  snapshot(): SimResult {
    const word = this.memory[100];
    return {
      registers: this.registers,
      memory: this.memory,
      cycles: this.cycles,
      energyPj: this.energyPj,
      halted: this.halted,
      trace: this.trace,
      output: word ? { addr: 100, word, value: toInt(word) } : null,
    };
  }

  private exec(instr: AsmLine) {
    const a = instr.args;
    switch (instr.op) {
      case "HALT":
        this.halted = true;
        return;
      case "LOAD": {
        const dest = a[0]!;
        const src = a[1]!;
        this.registers[dest] = src.startsWith("R")
          ? [...(this.registers[src] ?? fromInt(0))]
          : fromInt(Number(src));
        return;
      }
      case "STORE": {
        const src = a[0]!;
        const addr = Number(a[1]);
        this.memory[addr] = [...(this.registers[src] ?? fromInt(0))];
        return;
      }
      case "ADD": {
        this.registers[a[0]!] = rbnsAdd(
          this.registers[a[1]!] ?? fromInt(0),
          this.registers[a[2]!] ?? fromInt(0),
        );
        return;
      }
      case "NEG": {
        this.registers[a[0]!] = rbnsNegate(this.registers[a[1]!] ?? fromInt(0));
        return;
      }
      case "MUL": {
        this.registers[a[0]!] = rbnsMul(
          this.registers[a[1]!] ?? fromInt(0),
          this.registers[a[2]!] ?? fromInt(0),
        );
        return;
      }
      case "CMP3": {
        const v1 = toInt(this.registers[a[1]!] ?? fromInt(0));
        const v2 = toInt(this.registers[a[2]!] ?? fromInt(0));
        const res = v1 > v2 ? 1 : v1 < v2 ? -1 : 0;
        this.registers[a[0]!] = fromInt(res);
        return;
      }
      default:
        throw new Error(`Unknown instruction in M0 ISA: ${instr.text}`);
    }
  }
}

export function runProgram(program: AsmLine[]): SimResult {
  const sim = new M0Simulator();
  sim.load(program);
  sim.runAll();
  return sim.snapshot();
}
