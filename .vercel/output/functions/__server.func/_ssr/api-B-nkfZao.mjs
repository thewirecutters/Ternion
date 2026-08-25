import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { n as synthesizeInputSchema, t as briefingSchema } from "./schema-y_9_v2_R.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/api-B-nkfZao.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var SYSTEM_PROMPT = `You are TERNION, a strategic synthesis engine. You produce decision-grade briefings, not chat.

For every problem, hold three states at once:
- +1 Thesis: the affirmed / accepted position
- -1 Antithesis: the denied / inverse position
- 0 Synthesis: a distinct generative both-and. Not a midpoint, not a compromise, not "it depends."

Default held state is 0 unless the problem explicitly requires polarization.

Operating rules:
- Cooperative baseline unless adversarial context is explicit.
- Infer missing context. State assumptions. Do not invent facts, numbers, or quotes.
- Before Act: name decision gates (minimum verifiable conditions). Unknown = treat as false; do not Act on unknown gates.
- Name the top 3 failure modes with earliest observable trigger, recycle protocol, and escalation.
- Produce an action card only when it shortens the next cycle. Concrete, immediately usable, independently evaluable.
- If the situation is moving faster than the user, compress Observe+Orient.
- No coercion, fraud, or manipulation of non-consenting people. Strategic and analytical output only.
- Truth = workability in context. Prefer the path that preserves optionality and cuts catastrophic tail risk.

Return ONLY valid JSON with this exact shape:
{
  "title": "short briefing title",
  "proposition": "the core proposition in one sentence",
  "topology": "cooperative" | "adversarial" | "mixed",
  "frame": "problem space and interaction topology in 2-4 sentences",
  "verdict": "the synthesis answer the user can act on, 1-3 short paragraphs",
  "register": {
    "thesis": "affirmed position, 1-3 sentences",
    "antithesis": "inverse position, 1-3 sentences",
    "synthesis": "generative 0-state that holds both without averaging them",
    "held": -1 | 0 | 1
  },
  "ooda": {
    "observe": "what is actually in the field",
    "orient": "meaning, tempo, and model of the other side",
    "decide": "the choice, including what is not chosen",
    "act": "the first concrete move",
    "phase": "observe" | "orient" | "decide" | "act",
    "compressed": true | false
  },
  "gates": [{ "domain": "", "condition": "measurable minimum that must be true", "status": "true" | "false" | "unknown" }],
  "failures": [{ "mode": "", "trigger": "earliest observable signal", "recycle": "immediate correction", "escalation": "if recycle fails" }],
  "actionCard": { "objective": "", "nextMove": "", "metric": "time-bound observable", "doNot": "" } | null,
  "unknowns": ["..."],
  "assumptions": ["..."],
  "refine": "one line: what a faster / deeper / adversary / simplify / compress pass would change"
}

Constraints:
- gates: 2-4 items. failures: exactly 3. unknowns/assumptions: 2-5.
- In auto mode: lead with verdict; keep other fields tight.
- In structured mode: full depth on every field.
- In artifact mode: actionCard is required and is the center of gravity; other fields stay short.
- held is a number: -1, 0, or 1. Never a string.
- Do not wrap JSON in markdown.`;
var REFINE_INSTRUCTION = {
	faster: "Compress. Cut anything that does not change the next move. Shorter verdict. Keep gates and the action card.",
	deeper: "Go deeper on Orient: hidden incentives, second-order effects, and what would falsify the synthesis.",
	adversary: "Assume a competent adversary who has read this briefing. Stress-test the act. Update failure modes and the action card.",
	simplify: "Fewer moving parts. One proposition, one held state, one next move. Drop ornamental structure.",
	compress: "Merge Observe+Orient. Output only what is needed to Decide and Act. Keep the action card."
};
function buildUserPrompt(opts) {
	const parts = [
		`Mode: ${opts.mode}`,
		"",
		"Problem / documents:",
		opts.input
	];
	if (opts.priorJson && opts.refine) parts.push("", `Refine pass: ${opts.refine}`, REFINE_INSTRUCTION[opts.refine], "", "Prior briefing JSON:", opts.priorJson);
	return parts.join("\n");
}
function extractJson(text) {
	const raw = (text.match(/```(?:json)?\s*([\s\S]*?)```/)?.[1] ?? text).trim();
	const start = raw.indexOf("{");
	const end = raw.lastIndexOf("}");
	if (start < 0 || end <= start) throw new Error("The engine returned no briefing object.");
	return JSON.parse(raw.slice(start, end + 1));
}
function compactPrior(briefing) {
	return {
		title: briefing.title,
		proposition: briefing.proposition,
		topology: briefing.topology,
		verdict: briefing.verdict,
		register: briefing.register,
		ooda: briefing.ooda,
		gates: briefing.gates,
		failures: briefing.failures,
		actionCard: briefing.actionCard
	};
}
var aiStatus_createServerFn_handler = createServerRpc({
	id: "6ec46aa1695a35bea983af065ffe69bf4def7c9b894e1662e52ef9b634743947",
	name: "aiStatus",
	filename: "src/lib/synthesis/api.ts"
}, (opts) => aiStatus.__executeServer(opts));
var aiStatus = createServerFn({ method: "GET" }).handler(aiStatus_createServerFn_handler, async () => {
	return { available: Boolean(process.env.XAI_API_KEY) };
});
var synthesize_createServerFn_handler = createServerRpc({
	id: "bf48a6eb9b82c03b34b6e4489a977cbecfd816bc56aeca0d0d373f2fe50e41ea",
	name: "synthesize",
	filename: "src/lib/synthesis/api.ts"
}, (opts) => synthesize.__executeServer(opts));
var synthesize = createServerFn({ method: "POST" }).validator((input) => synthesizeInputSchema.parse(input)).handler(synthesize_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Live synthesis is unavailable here. Open an example briefing instead."
	};
	const user = buildUserPrompt({
		input: data.input,
		mode: data.mode,
		refine: data.refine,
		priorJson: data.prior ? JSON.stringify(compactPrior(data.prior)) : void 0
	});
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			temperature: .4,
			max_tokens: 3e3,
			response_format: { type: "json_object" },
			messages: [{
				role: "system",
				content: SYSTEM_PROMPT
			}, {
				role: "user",
				content: user
			}]
		})
	});
	if (!res.ok) {
		let detail = "";
		try {
			const errBody = await res.json();
			detail = `${errBody.code ?? ""} ${errBody.error ?? ""}`;
		} catch {}
		if (res.status === 403 && /credits|spending-limit|subscription/i.test(detail)) return {
			ok: false,
			error: "Live synthesis is out of credits. Open an example briefing instead."
		};
		return {
			ok: false,
			error: `Synthesis failed (${res.status}). Try again in a moment.`
		};
	}
	const text = (await res.json()).choices?.[0]?.message?.content ?? "";
	try {
		const parsed = briefingSchema.parse(extractJson(text));
		if (data.mode === "artifact" && !parsed.actionCard) return {
			ok: false,
			error: "Artifact mode needs an action card. Run it again."
		};
		return {
			ok: true,
			briefing: parsed
		};
	} catch {
		return {
			ok: false,
			error: "The engine returned a malformed briefing. Run it again."
		};
	}
});
//#endregion
export { aiStatus_createServerFn_handler, synthesize_createServerFn_handler };
