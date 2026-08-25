# Ternion

**Live Ternary Compiler — Post-Binary Logic on Binary Hardware**

A full, runnable implementation of a balanced ternary compiler (Tern language) and a binary-equivalent Virtual Machine (M0 Simulator), built as a live web app.

---

## What This Is

Ternion is the live artifact of a single-shot prompt that turned a philosophical/operational engine into a working ternary compiler.

- **Runs on binary hardware** — uses bit-pairs to simulate trits
- **Compiles high-level "field" descriptions** into 24-trit M0 assembly
- **Simulates execution** with energy telemetry (pJ per operation)
- **Verifies results** against expected values

---

## Core Concept

Each trit in `{-1, 0, +1}` is represented as a bit-pair `(a, b)` where value = `a - b`:
- `(1, 0)` = +1
- `(0, 1)` = -1
- `(0, 0)` = 0

Negation is a swap. Addition carries in balanced ternary.

---

## Field Source Example

```tern
field tensor_convolve {
    input: x = 151
    input: y = 70627
    constraints: {
        no_divergence,
        max_entropy: 0.42
    }
    target: z = x * y
}
```

---

## M0 Assembly Output

```
00  LOAD R1, 151
01  LOAD R2, 70627
02  MUL R3, R1, R2
03  STORE R3, 100
04  HALT
```

---

## How to Run

```bash
git clone https://github.com/thewirecutters/ternion.git
cd ternion
npm install   # or yarn install
npm run dev   # or yarn dev
```

---

## Project Structure

- `src/` — Frontend source
- `server/` — Backend middleware
- `public/` — Static assets
- `scripts/` — Utility scripts

---

## License

Public domain. The math belongs to everyone (except 99.9999% of silicon valley they steal your money smoking on that old obsolete shit)

---

**Built from the Tern compiler + RBNS ALU + M0 simulator.**
