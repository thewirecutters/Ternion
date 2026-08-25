import { createServerFn } from "@tanstack/react-start";
import { briefingSchema, synthesizeInputSchema } from "./schema";
import { buildUserPrompt, SYSTEM_PROMPT } from "./prompt";
import type { Briefing } from "./types";

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = (fenced?.[1] ?? text).trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start < 0 || end <= start) {
    throw new Error("The engine returned no briefing object.");
  }
  return JSON.parse(raw.slice(start, end + 1)) as unknown;
}

function compactPrior(briefing: Briefing) {
  return {
    title: briefing.title,
    proposition: briefing.proposition,
    topology: briefing.topology,
    verdict: briefing.verdict,
    register: briefing.register,
    ooda: briefing.ooda,
    gates: briefing.gates,
    failures: briefing.failures,
    actionCard: briefing.actionCard,
  };
}

export const aiStatus = createServerFn({ method: "GET" }).handler(async () => {
  return { available: Boolean(process.env.XAI_API_KEY) };
});

export const synthesize = createServerFn({ method: "POST" })
  .validator((input: unknown) => synthesizeInputSchema.parse(input))
  .handler(async ({ data }): Promise<{ ok: true; briefing: Briefing } | { ok: false; error: string }> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return {
        ok: false,
        error: "Live synthesis is unavailable here. Open an example briefing instead.",
      };
    }

    const user = buildUserPrompt({
      input: data.input,
      mode: data.mode,
      refine: data.refine,
      priorJson: data.prior ? JSON.stringify(compactPrior(data.prior)) : undefined,
    });

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.4,
        max_tokens: 3000,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: user },
        ],
      }),
    });

    if (!res.ok) {
      let detail = "";
      try {
        const errBody = (await res.json()) as { error?: string; code?: string };
        detail = `${errBody.code ?? ""} ${errBody.error ?? ""}`;
      } catch {
        /* ignore */
      }
      if (res.status === 403 && /credits|spending-limit|subscription/i.test(detail)) {
        return {
          ok: false,
          error: "Live synthesis is out of credits. Open an example briefing instead.",
        };
      }
      return { ok: false, error: `Synthesis failed (${res.status}). Try again in a moment.` };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content ?? "";
    try {
      const parsed = briefingSchema.parse(extractJson(text));
      if (data.mode === "artifact" && !parsed.actionCard) {
        return { ok: false, error: "Artifact mode needs an action card. Run it again." };
      }
      return { ok: true, briefing: parsed };
    } catch {
      return { ok: false, error: "The engine returned a malformed briefing. Run it again." };
    }
  });
