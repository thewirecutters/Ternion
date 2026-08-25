import { z } from "zod";
import type { Briefing, Held } from "./types";

const heldSchema = z
  .union([z.literal(-1), z.literal(0), z.literal(1), z.string(), z.number()])
  .transform((value): Held => {
    if (value === -1 || value === 0 || value === 1) return value;
    const raw = String(value).trim().toLowerCase();
    if (raw === "1" || raw === "+1" || raw === "thesis" || raw === "affirmed") return 1;
    if (raw === "-1" || raw === "antithesis" || raw === "denied") return -1;
    return 0;
  });

export const briefingSchema: z.ZodType<Briefing> = z.object({
  title: z.string().min(1),
  proposition: z.string().min(1),
  topology: z.enum(["cooperative", "adversarial", "mixed"]),
  frame: z.string().min(1),
  verdict: z.string().min(1),
  register: z.object({
    thesis: z.string().min(1),
    antithesis: z.string().min(1),
    synthesis: z.string().min(1),
    held: heldSchema,
  }),
  ooda: z.object({
    observe: z.string().min(1),
    orient: z.string().min(1),
    decide: z.string().min(1),
    act: z.string().min(1),
    phase: z.enum(["observe", "orient", "decide", "act"]),
    compressed: z.boolean(),
  }),
  gates: z
    .array(
      z.object({
        domain: z.string().min(1),
        condition: z.string().min(1),
        status: z.enum(["true", "false", "unknown"]),
      }),
    )
    .min(1)
    .max(6),
  failures: z
    .array(
      z.object({
        mode: z.string().min(1),
        trigger: z.string().min(1),
        recycle: z.string().min(1),
        escalation: z.string().min(1),
      }),
    )
    .min(1)
    .max(3),
  actionCard: z
    .object({
      objective: z.string().min(1),
      nextMove: z.string().min(1),
      metric: z.string().min(1),
      doNot: z.string().min(1),
    })
    .nullable(),
  unknowns: z.array(z.string()).max(8),
  assumptions: z.array(z.string()).max(8),
  refine: z.string().min(1),
});

export const synthesizeInputSchema = z.object({
  input: z.string().trim().min(1).max(8000),
  mode: z.enum(["auto", "structured", "artifact"]),
  refine: z.enum(["faster", "deeper", "adversary", "simplify", "compress"]).optional(),
  prior: briefingSchema.optional(),
});
