import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as synthesizeInputSchema } from "./schema-y_9_v2_R.mjs";
import { a as Check, i as Copy, o as ArrowUpRight, r as Plus, s as Archive, t as X } from "../_libs/lucide-react.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BHnVn9rS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium select-none transition-[opacity,transform,background-color,color,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg hover:opacity-90",
			ghost: "bg-transparent text-fg hover:bg-raised",
			outline: "bg-transparent text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			plus: "bg-plus text-plus-fg hover:opacity-90",
			minus: "bg-minus text-minus-fg hover:opacity-90"
		},
		size: {
			default: "h-11 px-5 rounded-lg text-sm",
			sm: "h-9 px-3.5 rounded-md text-sm",
			lg: "h-12 px-6 rounded-xl text-sm",
			icon: "size-11 rounded-lg",
			chip: "h-9 px-3.5 rounded-full text-sm"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		ref,
		...props
	});
});
Button.displayName = "Button";
var now = Date.UTC(2026, 7, 24, 16, 0, 0);
var EXAMPLES = [
	{
		id: "ex-competitor",
		createdAt: now,
		source: "example",
		mode: "structured",
		input: "A competitor shipped our core feature last week. Do we match, differentiate, or ignore?",
		briefing: {
			title: "Do not race the copy. Race the frame.",
			proposition: "A rival shipped the category-defining feature; the live choice is match, differentiate, or ignore.",
			topology: "adversarial",
			frame: "The field looks like a feature race. It is actually a frame race. Matching accepts their definition of the category. Ignoring preserves focus only if customers do not treat the feature as table stakes. Differentiating works only if you can name a job the copy cannot do.",
			verdict: "Hold match and ignore as live options, but do not Act on either yet. The workable move is a 10-day differentiation probe: pick one job-to-be-done the copy is structurally bad at, ship a thin wedge there, and measure whether buyers still ask for parity.\n\nIf the probe fails to move conversations, then match the smallest viable slice — not the whole feature. Full ignore is only legal if win-loss notes stay silent on the feature for two full sales cycles.",
			register: {
				thesis: "Match now. The feature is becoming table stakes. Delay reads as weakness, sales will stall, and the rival owns the default story.",
				antithesis: "Ignore. Copying burns the roadmap, concedes their frame, and produces a worse version of a thing they will keep shipping faster.",
				synthesis: "Do not choose the category. Choose a job. Probe a wedge the copy cannot occupy; keep a parity fallback sized to the smallest slice that unblocks deals. Matching and ignoring are both held as contingent, not as identity.",
				held: 0
			},
			ooda: {
				observe: "A rival shipped the core feature. Internal debate is already binary: copy or stay proud. No one has yet counted how many live deals named the feature unprompted.",
				orient: "Tempo is theirs on the feature axis, yours on narrative if you refuse their axis. The hidden risk is not losing the feature — it is letting their launch set your next quarter's agenda.",
				decide: "Open a time-boxed differentiation probe. Do not announce a match. Do not publish an ignore manifesto. Keep a parity kit on the shelf.",
				act: "In 48 hours: pull the last 20 win-loss notes and the next 10 active deals. Score whether the feature is a veto, a preference, or noise. That score is the gate.",
				phase: "orient",
				compressed: true
			},
			gates: [
				{
					domain: "Demand",
					condition: "At least 4 of the next 10 live deals name the feature unprompted as a veto or a short-list criterion.",
					status: "unknown"
				},
				{
					domain: "Wedge",
					condition: "A job-to-be-done exists that the copy is structurally bad at (architecture, data, workflow, or trust) and that a 10-day slice can touch.",
					status: "unknown"
				},
				{
					domain: "Capacity",
					condition: "A parity kit can be staffed without freezing the current flagship bet.",
					status: "unknown"
				}
			],
			failures: [
				{
					mode: "Panic parity",
					trigger: "A public match announcement or a full-team swarm onto the copy within 7 days.",
					recycle: "Kill the announcement. Re-scope to the smallest slice that unblocks a named deal.",
					escalation: "Executive freeze on feature work until win-loss scoring is done."
				},
				{
					mode: "Pride ignore",
					trigger: "Two consecutive lost deals cite the feature and the roadmap does not move.",
					recycle: "Stand up the parity kit for that slice only.",
					escalation: "Treat the feature as table stakes and fund a true match."
				},
				{
					mode: "Wedge theater",
					trigger: "The 'different' work is a skin, not a job the copy cannot do.",
					recycle: "Rewrite the wedge as a job story with a disqualifying test against the rival.",
					escalation: "Abandon the wedge; fall back to scored match-or-ignore."
				}
			],
			actionCard: {
				objective: "Know, in 10 days, whether this is a veto feature or a story you can refuse.",
				nextMove: "Score 20 win-loss notes and 10 live deals by tonight-plus-two. In parallel, write one job story the copy cannot serve and a 10-day slice that touches it.",
				metric: "Day 10: a written call — probe, parity-slice, or ignore — signed against the deal score, not against fear.",
				doNot: "Do not ship a public 'we have it too' page, and do not write a strategy memo that picks a side before the score exists."
			},
			unknowns: [
				"How often the feature is a veto versus a talking point.",
				"Whether the copy is deep or a thin launch.",
				"What buyers actually hired your product to do last quarter."
			],
			assumptions: [
				"The rival's launch is real and visible to your buyers.",
				"You still have a flagship bet worth protecting.",
				"Win-loss notes or deal conversations exist and can be read this week."
			],
			refine: "Deeper: map the rival's next two moves if you refuse their frame."
		}
	},
	{
		id: "ex-craft",
		createdAt: now - 864e5,
		source: "example",
		mode: "auto",
		input: "I've been offered a leadership role that pays more but kills the craft work I care about. Take it or stay?",
		briefing: {
			title: "Do not pick identity. Pick a term.",
			proposition: "A higher-paid leadership seat would starve the craft that currently makes the work worth doing.",
			topology: "cooperative",
			frame: "This is being framed as a binary of ambition versus purity. Both frames are traps. The real object is time: how much craft survives inside the new seat, for how long, and what option you keep if the craft dies.",
			verdict: "Do not take the seat as a personality change, and do not refuse it as a moral stand. Treat it as a 12-month term with a craft floor and a pre-committed exit.\n\nIf the offer cannot protect a weekly craft block, a named successor path back to the work, and a review date, the gate is false — decline or renegotiate. If it can, take the term, not the identity.",
			register: {
				thesis: "Take it. Money, scope, and career surface area compound. Craft can be a hobby; leverage cannot be recovered later.",
				antithesis: "Stay. The craft is the actual product of a life. Leadership will turn you into a meeting. The raise is a buyout of attention.",
				synthesis: "Hold both: accept leverage only as a time-boxed term that keeps a measurable craft floor. The seat is a tour, not a conversion. If the floor breaks, the prior role — or an equivalent — is the recycle, not a failure.",
				held: 0
			},
			ooda: {
				observe: "An offer exists. Pay is up. The work that currently produces meaning is not in the job description. The ask is already 'take it or stay.'",
				orient: "The other party wants a manager. You want a life that still makes things. Those are compatible only if the calendar is a contract, not a hope.",
				decide: "Negotiate a term. Do not answer the identity question. Answer the calendar question.",
				act: "Write three non-negotiables tonight: weekly craft hours, a 12-month review, and the exit that restores the work. Send them as the condition of yes.",
				phase: "decide",
				compressed: false
			},
			gates: [
				{
					domain: "Craft floor",
					condition: "A written weekly block of craft work (not 'when things calm down') exists in the offer or a side letter.",
					status: "unknown"
				},
				{
					domain: "Term",
					condition: "A 12-month review date and a path back to the work are explicit.",
					status: "unknown"
				},
				{
					domain: "Money",
					condition: "The raise changes a real constraint (debt, runway, dependents) rather than only status.",
					status: "unknown"
				}
			],
			failures: [
				{
					mode: "Identity capture",
					trigger: "You start introducing yourself only by the new title within 30 days.",
					recycle: "Re-open the craft block on the calendar as a standing meeting with yourself.",
					escalation: "Trigger the 12-month exit early."
				},
				{
					mode: "Calendar erosion",
					trigger: "The craft block is skipped three weeks in a row.",
					recycle: "Move it to the least interruptible slot and decline one recurring meeting to pay for it.",
					escalation: "Treat the gate as false and start the exit."
				},
				{
					mode: "Pride refuse",
					trigger: "You decline without naming what the raise would have unlocked.",
					recycle: "Price the 'no' — what constraint stays unsolved — and confirm you accept it.",
					escalation: "Re-enter negotiation with a smaller scope instead of a pure no."
				}
			],
			actionCard: {
				objective: "Convert an identity trap into a term with a craft floor.",
				nextMove: "Tonight: write the three conditions. Tomorrow: send them as the shape of yes, not as a complaint.",
				metric: "A written answer from the other side on the three conditions within 7 days.",
				doNot: "Do not accept on vibe, and do not reject to protect a story about who you are."
			},
			unknowns: [
				"Whether the craft floor is negotiable.",
				"What the raise actually unlocks in the next 24 months.",
				"Whether the prior role remains available as a recycle."
			],
			assumptions: [
				"The offer is real and time-sensitive.",
				"The craft work is not secretly already gone.",
				"You can tolerate a tour of leadership if the floor holds."
			],
			refine: "Simplify: one sentence yes-condition and one sentence no-condition."
		}
	},
	{
		id: "ex-local",
		createdAt: now - 1728e5,
		source: "example",
		mode: "artifact",
		input: "Should this product add accounts and cloud sync, or stay local-first?",
		briefing: {
			title: "Sync is a promise. Accounts are a tax.",
			proposition: "The product must choose between local-first simplicity and account-backed sync across devices.",
			topology: "cooperative",
			frame: "This is usually sold as 'real product versus toy.' That frame hides the actual costs: auth support, data model ownership, and the day a stranger's data is world-writable. Local-first is not a moral position. Accounts are not maturity. They are different failure modes.",
			verdict: "Stay local-first until a named user job requires the same object on two devices, and until you are willing to own identity. Do not add accounts to look finished.\n\nIf cross-device restore is the job, ship export/import first. If sharing between people is the job, that is a different product — and it does require accounts. Do not build the second to satisfy the first.",
			register: {
				thesis: "Add accounts and sync. People expect to find their work on the next phone. Without it the product is a demo.",
				antithesis: "Stay local. Accounts add login friction, support load, and a class of privacy failures you cannot take back. Most 'I lost my data' pain is solved by a file.",
				synthesis: "Hold local as the default runtime. Treat sync as a gated capability behind a job that a file cannot do. Accounts exist only to protect that job — never as chrome, never as a leaderboard costume.",
				held: 0
			},
			ooda: {
				observe: "The app works on one device. Someone will ask for 'save my stuff.' That sentence collapses three jobs: backup, second device, and sharing.",
				orient: "Backup is a file. Second device is sync. Sharing is identity plus permissions. Building accounts for backup is a category error with a long tail of cost.",
				decide: "Split the jobs. Ship backup as export. Keep accounts off until a second-device or multi-user job is explicit and staffed.",
				act: "Write the three jobs on the readme of the product. Add export this week. Do not open an auth ticket.",
				phase: "act",
				compressed: false
			},
			gates: [
				{
					domain: "Job",
					condition: "A real user needs the same object on two devices in the same week, not 'someday when I switch phones.'",
					status: "false"
				},
				{
					domain: "Ownership",
					condition: "You will scope every query by a verified user id and refuse unowned personal data.",
					status: "unknown"
				},
				{
					domain: "Support",
					condition: "Someone is on the hook for locked-out accounts and bad merges.",
					status: "false"
				}
			],
			failures: [
				{
					mode: "Costume accounts",
					trigger: "Login ships so the product 'looks real' with no per-user data model.",
					recycle: "Remove the login path. Put the energy into export.",
					escalation: "If login stays, stop and design ownership before any other feature."
				},
				{
					mode: "World-writable diary",
					trigger: "Durable personal rows with no user id, or a delete-all control on shared data.",
					recycle: "Strip personal fields. Keep only unowned, non-sensitive records — or turn auth on properly.",
					escalation: "Take the app down until the data class is decided."
				},
				{
					mode: "Forever local",
					trigger: "Repeated lost-work complaints and a still-missing export.",
					recycle: "Ship a readable export/import file this week.",
					escalation: "Then, and only then, reopen the second-device job."
				}
			],
			actionCard: {
				objective: "Give people a restore path without taking on identity.",
				nextMove: "Ship export/import as a file. Add a one-line note in the product: local on this device, backup is yours.",
				metric: "A user can leave and return on a new browser with a file, this week.",
				doNot: "Do not add login, a cloud sync toggle, or a shared leaderboard to solve backup."
			},
			unknowns: [
				"How often users actually switch devices in a week.",
				"Whether anyone needs sharing versus restore.",
				"Who would own account support."
			],
			assumptions: [
				"The current product is useful on one device.",
				"No regulation currently forces an account.",
				"A file export is technically cheap relative to auth."
			],
			refine: "Adversary: a user who loses a phone tomorrow and has no export habit."
		}
	}
];
var MODE_LABEL = {
	auto: "Auto",
	structured: "Structured",
	artifact: "Artifact"
};
var PHASE_LABEL = {
	observe: "Observe",
	orient: "Orient",
	decide: "Decide",
	act: "Act"
};
var REFINE_LABEL = {
	faster: "Faster",
	deeper: "Deeper",
	adversary: "Adversary",
	simplify: "Simplify",
	compress: "Compress"
};
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var aiStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("6ec46aa1695a35bea983af065ffe69bf4def7c9b894e1662e52ef9b634743947"));
var synthesize = createServerFn({ method: "POST" }).validator((input) => synthesizeInputSchema.parse(input)).handler(createSsrRpc("bf48a6eb9b82c03b34b6e4489a977cbecfd816bc56aeca0d0d373f2fe50e41ea"));
var STORAGE_KEY = "ternion.archive.v1";
var PHASES$2 = [
	"observe",
	"orient",
	"decide",
	"act"
];
function uid() {
	return `run-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}
function loadArchive() {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		return Array.isArray(parsed) ? parsed.slice(0, 24) : [];
	} catch {
		return [];
	}
}
function saveArchive(archive) {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(archive.slice(0, 24)));
	} catch {}
}
var useEngine = create((set, get) => ({
	input: "",
	mode: "auto",
	status: "idle",
	error: null,
	phase: "observe",
	current: null,
	archive: [],
	archiveOpen: false,
	live: null,
	setInput: (input) => set({
		input,
		error: null
	}),
	setMode: (mode) => set({ mode }),
	setArchiveOpen: (archiveOpen) => set({ archiveOpen }),
	setLive: (live) => set({ live }),
	tickPhase: () => {
		set({ phase: PHASES$2[(PHASES$2.indexOf(get().phase) + 1) % PHASES$2.length] });
	},
	newBrief: () => set({
		current: null,
		error: null,
		status: "idle",
		phase: "observe",
		input: "",
		archiveOpen: false
	}),
	loadRun: (run) => set({
		current: run,
		input: run.input,
		mode: run.mode,
		status: "idle",
		error: null,
		archiveOpen: false
	}),
	loadExample: (id) => {
		const run = EXAMPLES.find((item) => item.id === id);
		if (run) get().loadRun(run);
	},
	run: async (refine) => {
		const { input, mode, current, archive, live } = get();
		const text = input.trim();
		if (!text) {
			set({
				error: "Paste a problem first.",
				status: "error"
			});
			return;
		}
		if (live === false) {
			set({
				error: "Live synthesis is unavailable. Open an example briefing instead.",
				status: "error"
			});
			return;
		}
		set({
			status: "running",
			error: null,
			phase: "observe",
			archiveOpen: false
		});
		try {
			const result = await synthesize({ data: {
				input: text,
				mode,
				refine,
				prior: refine && current ? current.briefing : void 0
			} });
			if (!result.ok) {
				const liveOff = /out of credits|unavailable here/i.test(result.error);
				set({
					status: "error",
					error: result.error,
					live: liveOff ? false : get().live
				});
				return;
			}
			const briefing = result.briefing;
			const run = {
				id: uid(),
				createdAt: Date.now(),
				input: text,
				mode,
				source: "live",
				briefing
			};
			const nextArchive = [run, ...archive.filter((item) => item.id !== run.id)].slice(0, 24);
			saveArchive(nextArchive);
			set({
				current: run,
				archive: nextArchive,
				status: "idle",
				phase: briefing.ooda.phase
			});
		} catch {
			set({
				status: "error",
				error: "The loop broke before a briefing landed. Try again."
			});
		}
	}
}));
function hydrateArchive() {
	const archive = loadArchive();
	useEngine.setState({ archive });
}
function ArchivePanel() {
	const open = useEngine((s) => s.archiveOpen);
	const archive = useEngine((s) => s.archive);
	const current = useEngine((s) => s.current);
	const setArchiveOpen = useEngine((s) => s.setArchiveOpen);
	const loadRun = useEngine((s) => s.loadRun);
	const loadExample = useEngine((s) => s.loadExample);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("fixed inset-0 z-40 bg-bg/60 transition-opacity duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]", open ? "opacity-100" : "pointer-events-none opacity-0"),
		onClick: () => setArchiveOpen(false),
		"aria-hidden": !open
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: cn("fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-surface shadow-[var(--shadow-border)] transition-transform duration-[var(--motion-slow)] ease-[var(--ease-smooth-out)]", open ? "translate-x-0" : "translate-x-full"),
		"aria-hidden": !open,
		"aria-label": "Archive",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-[-0.02em]",
				children: "Archive"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon",
				className: "size-11",
				onClick: () => setArchiveOpen(false),
				"aria-label": "Close archive",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 overflow-y-auto px-5 pb-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
					children: "Examples"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: EXAMPLES.map((run) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => loadExample(run.id),
						className: cn("w-full rounded-xl px-4 py-3 text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)]", current?.id === run.id ? "shadow-[var(--shadow-held)]" : "hover:shadow-[var(--shadow-border-hover)]"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm text-fg",
							children: run.briefing.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-xs text-subtle",
							children: MODE_LABEL[run.mode]
						})]
					}) }, run.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-xs font-medium tracking-[0.14em] text-subtle uppercase",
					children: "This device"
				}),
				archive.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "No live briefings yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: archive.map((run) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => loadRun(run),
						className: cn("w-full rounded-xl px-4 py-3 text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)]", current?.id === run.id ? "shadow-[var(--shadow-held)]" : "hover:shadow-[var(--shadow-border-hover)]"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm text-fg",
							children: run.briefing.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-1 block text-xs text-subtle",
							children: [
								MODE_LABEL[run.mode],
								" ·",
								" ",
								formatDistanceToNow(run.createdAt, { addSuffix: true })
							]
						})]
					}) }, run.id))
				})
			]
		})]
	})] });
}
var PHASES$1 = [
	"observe",
	"orient",
	"decide",
	"act"
];
var REFINES = [
	"faster",
	"deeper",
	"adversary",
	"simplify",
	"compress"
];
function heldTone(held, self) {
	if (held !== self) return "bg-surface text-muted shadow-[var(--shadow-border)]";
	if (self === 1) return "bg-plus text-plus-fg";
	if (self === -1) return "bg-minus text-minus-fg";
	return "bg-accent text-accent-fg";
}
function BriefingView({ run }) {
	const { briefing } = run;
	const status = useEngine((s) => s.status);
	const error = useEngine((s) => s.error);
	const live = useEngine((s) => s.live);
	const runEngine = useEngine((s) => s.run);
	const running = status === "running";
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copyCard = async () => {
		const card = briefing.actionCard;
		if (!card) return;
		const text = [
			briefing.title,
			"",
			`Objective: ${card.objective}`,
			`Next move: ${card.nextMove}`,
			`Metric: ${card.metric}`,
			`Do not: ${card.doNot}`
		].join("\n");
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto w-full max-w-3xl px-1 pb-28 pt-4 sm:pt-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "rise",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
						children: [
							briefing.topology,
							" · held ",
							briefing.register.held === 1 ? "+1" : briefing.register.held
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-xl font-medium tracking-[-0.03em] text-fg sm:text-2xl",
						children: briefing.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-normal text-muted",
						children: briefing.proposition
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rise rise-1 mt-8 grid gap-2 sm:grid-cols-3",
				children: [
					{
						key: 1,
						label: "+1 Thesis",
						body: briefing.register.thesis
					},
					{
						key: 0,
						label: "0 Synthesis",
						body: briefing.register.synthesis
					},
					{
						key: -1,
						label: "−1 Antithesis",
						body: briefing.register.antithesis
					}
				].map((col) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("rounded-xl p-4 transition-[box-shadow,background-color,color] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]", heldTone(briefing.register.held, col.key)),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-medium tracking-[0.12em] uppercase opacity-80",
						children: [col.label, briefing.register.held === col.key ? " · held" : ""]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-normal",
						children: col.body
					})]
				}, col.key))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rise rise-2 mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
						children: "Verdict"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 space-y-3 text-base leading-normal text-fg",
						children: briefing.verdict.split("\n").filter(Boolean).map((para) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: para }, para.slice(0, 48)))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-normal text-muted",
						children: briefing.frame
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rise rise-3 mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
					children: "OODA"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 grid gap-2 sm:grid-cols-4",
					children: PHASES$1.map((phase) => {
						const active = briefing.ooda.phase === phase;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: cn("rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]", active && "shadow-[var(--shadow-held)]"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs font-medium tracking-[0.12em] text-subtle uppercase",
								children: [
									PHASE_LABEL[phase],
									active ? " · now" : "",
									phase === "observe" && briefing.ooda.compressed ? " · fused" : ""
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-normal text-fg",
								children: briefing.ooda[phase]
							})]
						}, phase);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rise rise-4 mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
						children: "Decision gates"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 divide-y divide-border",
						children: briefing.gates.map((gate) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-4 py-3 first:pt-0 last:pb-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("mt-0.5 w-16 shrink-0 text-xs font-medium tracking-[0.08em] uppercase", gate.status === "true" && "text-plus", gate.status === "false" && "text-minus", gate.status === "unknown" && "text-subtle"),
								children: gate.status
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-fg",
									children: gate.domain
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-normal text-muted",
									children: gate.condition
								})]
							})]
						}, gate.domain))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-subtle",
						children: "Unknown is treated as false. Do not Act until the minimum conditions are true."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rise rise-5 mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
					children: "Failure modes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 grid gap-2",
					children: briefing.failures.map((fail, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl bg-surface p-4 shadow-[var(--shadow-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mr-2 font-display text-muted",
								children: i + 1
							}), fail.mode]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-3 grid gap-2 text-sm leading-normal sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs tracking-[0.1em] text-subtle uppercase",
									children: "Trigger"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-muted",
									children: fail.trigger
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs tracking-[0.1em] text-subtle uppercase",
									children: "Recycle"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-muted",
									children: fail.recycle
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-xs tracking-[0.1em] text-subtle uppercase",
									children: "Escalate"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "mt-1 text-muted",
									children: fail.escalation
								})] })
							]
						})]
					}, fail.mode))
				})]
			}),
			briefing.actionCard ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rise rise-6 mt-10 rounded-2xl bg-raised p-5 shadow-[var(--shadow-border)] sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg tracking-[-0.02em] text-fg",
						children: "Action card"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: () => void copyCard(),
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? "Copied" : "Copy"]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs tracking-[0.1em] text-subtle uppercase",
							children: "Objective"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-sm leading-normal text-fg",
							children: briefing.actionCard.objective
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs tracking-[0.1em] text-subtle uppercase",
							children: "Next move"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-sm leading-normal text-fg",
							children: briefing.actionCard.nextMove
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs tracking-[0.1em] text-subtle uppercase",
							children: "Metric"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-sm leading-normal text-fg",
							children: briefing.actionCard.metric
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs tracking-[0.1em] text-subtle uppercase",
							children: "Do not"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 text-sm leading-normal text-fg",
							children: briefing.actionCard.doNot
						})] })
					]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 grid gap-6 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
					children: "Assumptions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm leading-normal text-muted",
					children: briefing.assumptions.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-medium tracking-[0.14em] text-subtle uppercase",
					children: "Unknowns"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2 text-sm leading-normal text-muted",
					children: briefing.unknowns.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: item }, item))
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm text-subtle",
				children: briefing.refine
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-minus",
				role: "alert",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 flex flex-wrap gap-2",
				children: REFINES.map((kind) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					size: "chip",
					disabled: running || live === false,
					onClick: () => void runEngine(kind),
					children: REFINE_LABEL[kind]
				}, kind))
			}),
			live === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-subtle",
				children: "Refine needs the live engine."
			}) : null
		]
	});
}
function TrinaryMark({ className, size = 72 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 72 72",
		fill: "none",
		"aria-hidden": "true",
		className: cn("text-fg", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M36 14 L16 52 H56 Z",
				stroke: "currentColor",
				strokeOpacity: "0.35",
				strokeWidth: "1.25"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "36",
				cy: "14",
				r: "5",
				fill: "var(--color-zero)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "52",
				r: "5",
				fill: "var(--color-plus)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "56",
				cy: "52",
				r: "5",
				fill: "var(--color-minus)"
			})
		]
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		ref,
		className: cn("w-full min-h-44 resize-y rounded-xl bg-surface px-4 py-3.5 text-base text-fg shadow-[var(--shadow-border)] placeholder:text-subtle", "transition-[box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)]", "focus-visible:outline-none focus-visible:shadow-[var(--shadow-held)]", className),
		...props
	});
});
Textarea.displayName = "Textarea";
var MODES = [
	"auto",
	"structured",
	"artifact"
];
function InputStage() {
	const input = useEngine((s) => s.input);
	const mode = useEngine((s) => s.mode);
	const status = useEngine((s) => s.status);
	const error = useEngine((s) => s.error);
	const live = useEngine((s) => s.live);
	const setInput = useEngine((s) => s.setInput);
	const setMode = useEngine((s) => s.setMode);
	const loadExample = useEngine((s) => s.loadExample);
	const run = useEngine((s) => s.run);
	const running = status === "running";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex w-full max-w-3xl flex-col items-center px-1 pb-16 pt-6 sm:pt-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrinaryMark, {
				size: 64,
				className: "rise mb-8 opacity-90"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "rise rise-1 font-display text-2xl font-medium tracking-[-0.03em] text-fg sm:text-3xl",
				children: "Hold all three states."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rise rise-2 mt-3 max-w-md text-center text-sm leading-normal text-muted",
				children: "Paste a problem, a decision, or a document. The engine will not collapse to binary."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rise rise-3 mt-10 w-full",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						htmlFor: "problem",
						className: "sr-only",
						children: "Problem"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						id: "problem",
						value: input,
						onChange: (e) => setInput(e.target.value),
						onKeyDown: (e) => {
							if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
								e.preventDefault();
								run();
							}
						},
						placeholder: "A decision that is being forced into either/or…",
						disabled: running
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-11 items-center rounded-xl bg-surface p-1 shadow-[var(--shadow-border)]",
							role: "tablist",
							"aria-label": "Output mode",
							children: MODES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								role: "tab",
								"aria-selected": mode === item,
								onClick: () => setMode(item),
								className: cn("h-9 flex-1 rounded-lg px-3.5 text-sm transition-[background-color,color] duration-[var(--motion-quick)] ease-[var(--ease-out)] sm:flex-none", mode === item ? "bg-raised text-fg" : "text-muted hover:text-fg"),
								children: MODE_LABEL[item]
							}, item))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							size: "lg",
							onClick: () => void run(),
							disabled: running || !input.trim(),
							className: "w-full sm:w-auto",
							children: ["Synthesize", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-minus",
						role: "alert",
						children: error
					}) : live === false ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm text-muted",
						children: "Live engine is offline. Open an example briefing to see a full cycle."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 hidden text-sm text-subtle sm:block",
						children: "⌘ Enter to run"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rise rise-4 mt-14 w-full",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-xs font-medium tracking-[0.14em] text-subtle uppercase",
					children: "Try a field"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2",
					children: EXAMPLES.map((ex) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => loadExample(ex.id),
						className: "group flex w-full items-start gap-3 rounded-xl bg-surface px-4 py-3.5 text-left shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] hover:shadow-[var(--shadow-border-hover)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 font-display text-lg leading-none text-subtle",
							children: ex.briefing.register.held === 0 ? "0" : ex.briefing.register.held === 1 ? "+1" : "−1"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm text-fg",
								children: ex.input
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-1 block text-xs text-subtle",
								children: [
									MODE_LABEL[ex.mode],
									" · ",
									ex.briefing.title
								]
							})]
						})]
					}) }, ex.id))
				})]
			})
		]
	});
}
var PHASES = [
	"observe",
	"orient",
	"decide",
	"act"
];
var COPY = {
	observe: "Reading the field without collapsing it.",
	orient: "Holding thesis, antithesis, and the third state.",
	decide: "Testing gates. Unknown is treated as false.",
	act: "Writing only what shortens the next cycle."
};
function RunningStage() {
	const phase = useEngine((s) => s.phase);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-[60dvh] w-full max-w-xl flex-col items-center justify-center px-1 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-subtle uppercase",
				children: "Loop"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-6 flex items-center gap-2",
				children: PHASES.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-sm tracking-[0.08em] uppercase", item === phase ? "text-fg phase-pulse" : "text-subtle"),
						children: PHASE_LABEL[item]
					}), i < PHASES.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-subtle",
						"aria-hidden": true,
						children: "·"
					}) : null]
				}, item))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 font-display text-xl tracking-[-0.03em] text-fg sm:text-2xl",
				children: COPY[phase]
			})
		]
	});
}
function Console() {
	const current = useEngine((s) => s.current);
	const status = useEngine((s) => s.status);
	const phase = useEngine((s) => s.phase);
	const live = useEngine((s) => s.live);
	const newBrief = useEngine((s) => s.newBrief);
	const setArchiveOpen = useEngine((s) => s.setArchiveOpen);
	const setLive = useEngine((s) => s.setLive);
	const tickPhase = useEngine((s) => s.tickPhase);
	(0, import_react.useEffect)(() => {
		hydrateArchive();
		aiStatus().then((res) => setLive(res.available));
	}, [setLive]);
	(0, import_react.useEffect)(() => {
		if (status !== "running") return;
		const id = window.setInterval(() => tickPhase(), 900);
		return () => window.clearInterval(id);
	}, [status, tickPhase]);
	const statusLabel = status === "running" ? PHASE_LABEL[phase] : current ? `held ${current.briefing.register.held === 1 ? "+1" : current.briefing.register.held}` : live === false ? "examples" : "idle";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 flex items-center justify-between gap-3 bg-bg/90 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: newBrief,
					className: "flex min-h-11 items-center gap-2.5 text-left",
					"aria-label": "TERNION home",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrinaryMark, { size: 28 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg tracking-[-0.03em]",
							children: "TERNION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-xs tracking-[0.16em] text-subtle uppercase sm:inline",
							children: "v8"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1 sm:gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mr-1 hidden text-xs tracking-[0.14em] text-subtle uppercase sm:inline",
							children: statusLabel
						}),
						current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "ghost",
							size: "sm",
							onClick: newBrief,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New"]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "ghost",
							size: "icon",
							"aria-label": "Open archive",
							onClick: () => setArchiveOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Archive, { className: "size-5" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "flex-1 px-4 sm:px-6",
				children: status === "running" && !current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunningStage, {}) : current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: status === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RunningStage, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefingView, { run: current }) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputStage, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArchivePanel, {})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Console, {});
}
//#endregion
export { Home as component };
