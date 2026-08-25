export type FieldAst = {
  name: string;
  inputs: Record<string, number>;
  target: { name: string; expr: string } | null;
  constraints: Record<string, number | true>;
};

export type AsmLine = {
  text: string;
  op: string;
  opcode: number;
  args: string[];
};

const OPCODES: Record<string, number> = {
  LOAD: 0b000000,
  LIT: 0b000000,
  ADD: 0b000001,
  SUB: 0b000010,
  MUL: 0b000011,
  DUP: 0b000101,
  DROP: 0b000110,
  SWAP: 0b000111,
  NEG: 0b001000,
  STORE: 0b001001,
  CMP3: 0b001010,
  CALL: 0b010000,
  RET: 0b010001,
  HALT: 0b111111,
};

export function opcodeBits(op: string): string {
  const n = OPCODES[op] ?? 0;
  return n.toString(2).padStart(6, "0");
}

export function parseTern(source: string): FieldAst {
  const clean = source
    .replace(/\/\/.*$/gm, "")
    .replace(/\s+/g, " ")
    .trim();
  const fieldMatch = clean.match(/^field\s+(\w+)\s*\{(.*)\}$/);
  if (!fieldMatch) {
    throw new SyntaxError("A Tern program must be field <name> { ... }");
  }
  const name = fieldMatch[1]!;
  const body = fieldMatch[2] ?? "";
  const ast: FieldAst = { name, inputs: {}, target: null, constraints: {} };

  for (const match of body.matchAll(/input:\s*(\w+)\s*=\s*([+-]?\d+)/g)) {
    ast.inputs[match[1]!] = Number(match[2]);
  }

  const targetMatch = body.match(/target:\s*(\w+)\s*=\s*([^;]+?)(?=\s*(?:constraints:|$))/);
  if (targetMatch) {
    ast.target = { name: targetMatch[1]!, expr: targetMatch[2]!.trim() };
  }

  const constraintsBlock = body.match(/constraints:\s*\{(.*?)\}/);
  if (constraintsBlock) {
    for (const row of constraintsBlock[1]!.split(",")) {
      const piece = row.trim();
      if (!piece) continue;
      const kv = piece.match(/^(\w+)(?:\s*:\s*([0-9.]+))?$/);
      if (!kv) continue;
      ast.constraints[kv[1]!] = kv[2] ? Number(kv[2]) : true;
    }
  }

  return ast;
}

function line(op: string, ...args: string[]): AsmLine {
  const text = args.length ? `${op} ${args.join(", ")}` : op;
  return { text, op, opcode: OPCODES[op] ?? 0, args };
}

export function compileTern(source: string): { ast: FieldAst; program: AsmLine[] } {
  const ast = parseTern(source);
  if (!ast.target) {
    throw new SyntaxError("Missing target: <name> = <expr>");
  }
  const names = Object.keys(ast.inputs);
  if (names.length === 0) {
    throw new SyntaxError("Declare at least one input: x = <int>");
  }

  const symbols: Record<string, string> = {};
  const program: AsmLine[] = [];
  let reg = 1;

  for (const [varName, val] of Object.entries(ast.inputs)) {
    const r = `R${reg++}`;
    symbols[varName] = r;
    program.push(line("LOAD", r, String(val)));
  }

  const tokens = ast.target.expr.split(/\s+/).filter(Boolean);
  let outReg: string;

  if (tokens.length === 1) {
    const src = symbols[tokens[0]!];
    if (!src) throw new NameError(`Unknown symbol '${tokens[0]}'`);
    outReg = `R${reg++}`;
    program.push(line("LOAD", outReg, src));
  } else if (tokens.length === 2 && tokens[0] === "-") {
    const src = symbols[tokens[1]!];
    if (!src) throw new NameError(`Unknown symbol '${tokens[1]}'`);
    outReg = `R${reg++}`;
    program.push(line("NEG", outReg, src));
  } else if (tokens.length === 3) {
    const [left, op, right] = tokens;
    const leftReg = symbols[left!];
    const rightReg = symbols[right!];
    if (!leftReg || !rightReg) {
      throw new NameError(`Symbol in '${ast.target.expr}' is not an input.`);
    }
    outReg = `R${reg++}`;
    if (op === "+") {
      program.push(line("ADD", outReg, leftReg, rightReg));
    } else if (op === "*") {
      program.push(line("MUL", outReg, leftReg, rightReg));
    } else if (op === "-") {
      const negReg = `R${reg++}`;
      program.push(line("NEG", negReg, rightReg));
      program.push(line("ADD", outReg, leftReg, negReg));
    } else if (op === "cmp") {
      program.push(line("CMP3", outReg, leftReg, rightReg));
    } else {
      throw new SyntaxError(`Operator '${op}' is not in the M0 prototype.`);
    }
  } else {
    throw new SyntaxError(
      `Expression '${ast.target.expr}' is too complex. Use x + y, x - y, x * y, or x cmp y.`,
    );
  }

  symbols[ast.target.name] = outReg;
  program.push(line("STORE", outReg, "100"));
  program.push(line("HALT"));
  return { ast, program };
}

class NameError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NameError";
  }
}
