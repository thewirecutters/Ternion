import { a as number, c as union, i as literal, n as array, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/schema-y_9_v2_R.js
var heldSchema = union([
	literal(-1),
	literal(0),
	literal(1),
	string(),
	number()
]).transform((value) => {
	if (value === -1 || value === 0 || value === 1) return value;
	const raw = String(value).trim().toLowerCase();
	if (raw === "1" || raw === "+1" || raw === "thesis" || raw === "affirmed") return 1;
	if (raw === "-1" || raw === "antithesis" || raw === "denied") return -1;
	return 0;
});
var briefingSchema = object({
	title: string().min(1),
	proposition: string().min(1),
	topology: _enum([
		"cooperative",
		"adversarial",
		"mixed"
	]),
	frame: string().min(1),
	verdict: string().min(1),
	register: object({
		thesis: string().min(1),
		antithesis: string().min(1),
		synthesis: string().min(1),
		held: heldSchema
	}),
	ooda: object({
		observe: string().min(1),
		orient: string().min(1),
		decide: string().min(1),
		act: string().min(1),
		phase: _enum([
			"observe",
			"orient",
			"decide",
			"act"
		]),
		compressed: boolean()
	}),
	gates: array(object({
		domain: string().min(1),
		condition: string().min(1),
		status: _enum([
			"true",
			"false",
			"unknown"
		])
	})).min(1).max(6),
	failures: array(object({
		mode: string().min(1),
		trigger: string().min(1),
		recycle: string().min(1),
		escalation: string().min(1)
	})).min(1).max(3),
	actionCard: object({
		objective: string().min(1),
		nextMove: string().min(1),
		metric: string().min(1),
		doNot: string().min(1)
	}).nullable(),
	unknowns: array(string()).max(8),
	assumptions: array(string()).max(8),
	refine: string().min(1)
});
var synthesizeInputSchema = object({
	input: string().trim().min(1).max(8e3),
	mode: _enum([
		"auto",
		"structured",
		"artifact"
	]),
	refine: _enum([
		"faster",
		"deeper",
		"adversary",
		"simplify",
		"compress"
	]).optional(),
	prior: briefingSchema.optional()
});
//#endregion
export { synthesizeInputSchema as n, briefingSchema as t };
