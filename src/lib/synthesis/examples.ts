import type { Run } from "./types";

const now = Date.UTC(2026, 7, 24, 16, 0, 0);

export const EXAMPLES: Run[] = [
  {
    id: "ex-competitor",
    createdAt: now,
    source: "example",
    mode: "structured",
    input:
      "A competitor shipped our core feature last week. Do we match, differentiate, or ignore?",
    briefing: {
      title: "Do not race the copy. Race the frame.",
      proposition:
        "A rival shipped the category-defining feature; the live choice is match, differentiate, or ignore.",
      topology: "adversarial",
      frame:
        "The field looks like a feature race. It is actually a frame race. Matching accepts their definition of the category. Ignoring preserves focus only if customers do not treat the feature as table stakes. Differentiating works only if you can name a job the copy cannot do.",
      verdict:
        "Hold match and ignore as live options, but do not Act on either yet. The workable move is a 10-day differentiation probe: pick one job-to-be-done the copy is structurally bad at, ship a thin wedge there, and measure whether buyers still ask for parity.\n\nIf the probe fails to move conversations, then match the smallest viable slice — not the whole feature. Full ignore is only legal if win-loss notes stay silent on the feature for two full sales cycles.",
      register: {
        thesis:
          "Match now. The feature is becoming table stakes. Delay reads as weakness, sales will stall, and the rival owns the default story.",
        antithesis:
          "Ignore. Copying burns the roadmap, concedes their frame, and produces a worse version of a thing they will keep shipping faster.",
        synthesis:
          "Do not choose the category. Choose a job. Probe a wedge the copy cannot occupy; keep a parity fallback sized to the smallest slice that unblocks deals. Matching and ignoring are both held as contingent, not as identity.",
        held: 0,
      },
      ooda: {
        observe:
          "A rival shipped the core feature. Internal debate is already binary: copy or stay proud. No one has yet counted how many live deals named the feature unprompted.",
        orient:
          "Tempo is theirs on the feature axis, yours on narrative if you refuse their axis. The hidden risk is not losing the feature — it is letting their launch set your next quarter's agenda.",
        decide:
          "Open a time-boxed differentiation probe. Do not announce a match. Do not publish an ignore manifesto. Keep a parity kit on the shelf.",
        act: "In 48 hours: pull the last 20 win-loss notes and the next 10 active deals. Score whether the feature is a veto, a preference, or noise. That score is the gate.",
        phase: "orient",
        compressed: true,
      },
      gates: [
        {
          domain: "Demand",
          condition:
            "At least 4 of the next 10 live deals name the feature unprompted as a veto or a short-list criterion.",
          status: "unknown",
        },
        {
          domain: "Wedge",
          condition:
            "A job-to-be-done exists that the copy is structurally bad at (architecture, data, workflow, or trust) and that a 10-day slice can touch.",
          status: "unknown",
        },
        {
          domain: "Capacity",
          condition:
            "A parity kit can be staffed without freezing the current flagship bet.",
          status: "unknown",
        },
      ],
      failures: [
        {
          mode: "Panic parity",
          trigger: "A public match announcement or a full-team swarm onto the copy within 7 days.",
          recycle: "Kill the announcement. Re-scope to the smallest slice that unblocks a named deal.",
          escalation: "Executive freeze on feature work until win-loss scoring is done.",
        },
        {
          mode: "Pride ignore",
          trigger: "Two consecutive lost deals cite the feature and the roadmap does not move.",
          recycle: "Stand up the parity kit for that slice only.",
          escalation: "Treat the feature as table stakes and fund a true match.",
        },
        {
          mode: "Wedge theater",
          trigger: "The 'different' work is a skin, not a job the copy cannot do.",
          recycle: "Rewrite the wedge as a job story with a disqualifying test against the rival.",
          escalation: "Abandon the wedge; fall back to scored match-or-ignore.",
        },
      ],
      actionCard: {
        objective:
          "Know, in 10 days, whether this is a veto feature or a story you can refuse.",
        nextMove:
          "Score 20 win-loss notes and 10 live deals by tonight-plus-two. In parallel, write one job story the copy cannot serve and a 10-day slice that touches it.",
        metric:
          "Day 10: a written call — probe, parity-slice, or ignore — signed against the deal score, not against fear.",
        doNot:
          "Do not ship a public 'we have it too' page, and do not write a strategy memo that picks a side before the score exists.",
      },
      unknowns: [
        "How often the feature is a veto versus a talking point.",
        "Whether the copy is deep or a thin launch.",
        "What buyers actually hired your product to do last quarter.",
      ],
      assumptions: [
        "The rival's launch is real and visible to your buyers.",
        "You still have a flagship bet worth protecting.",
        "Win-loss notes or deal conversations exist and can be read this week.",
      ],
      refine: "Deeper: map the rival's next two moves if you refuse their frame.",
    },
  },
  {
    id: "ex-craft",
    createdAt: now - 86_400_000,
    source: "example",
    mode: "auto",
    input:
      "I've been offered a leadership role that pays more but kills the craft work I care about. Take it or stay?",
    briefing: {
      title: "Do not pick identity. Pick a term.",
      proposition:
        "A higher-paid leadership seat would starve the craft that currently makes the work worth doing.",
      topology: "cooperative",
      frame:
        "This is being framed as a binary of ambition versus purity. Both frames are traps. The real object is time: how much craft survives inside the new seat, for how long, and what option you keep if the craft dies.",
      verdict:
        "Do not take the seat as a personality change, and do not refuse it as a moral stand. Treat it as a 12-month term with a craft floor and a pre-committed exit.\n\nIf the offer cannot protect a weekly craft block, a named successor path back to the work, and a review date, the gate is false — decline or renegotiate. If it can, take the term, not the identity.",
      register: {
        thesis:
          "Take it. Money, scope, and career surface area compound. Craft can be a hobby; leverage cannot be recovered later.",
        antithesis:
          "Stay. The craft is the actual product of a life. Leadership will turn you into a meeting. The raise is a buyout of attention.",
        synthesis:
          "Hold both: accept leverage only as a time-boxed term that keeps a measurable craft floor. The seat is a tour, not a conversion. If the floor breaks, the prior role — or an equivalent — is the recycle, not a failure.",
        held: 0,
      },
      ooda: {
        observe:
          "An offer exists. Pay is up. The work that currently produces meaning is not in the job description. The ask is already 'take it or stay.'",
        orient:
          "The other party wants a manager. You want a life that still makes things. Those are compatible only if the calendar is a contract, not a hope.",
        decide:
          "Negotiate a term. Do not answer the identity question. Answer the calendar question.",
        act: "Write three non-negotiables tonight: weekly craft hours, a 12-month review, and the exit that restores the work. Send them as the condition of yes.",
        phase: "decide",
        compressed: false,
      },
      gates: [
        {
          domain: "Craft floor",
          condition:
            "A written weekly block of craft work (not 'when things calm down') exists in the offer or a side letter.",
          status: "unknown",
        },
        {
          domain: "Term",
          condition: "A 12-month review date and a path back to the work are explicit.",
          status: "unknown",
        },
        {
          domain: "Money",
          condition:
            "The raise changes a real constraint (debt, runway, dependents) rather than only status.",
          status: "unknown",
        },
      ],
      failures: [
        {
          mode: "Identity capture",
          trigger: "You start introducing yourself only by the new title within 30 days.",
          recycle: "Re-open the craft block on the calendar as a standing meeting with yourself.",
          escalation: "Trigger the 12-month exit early.",
        },
        {
          mode: "Calendar erosion",
          trigger: "The craft block is skipped three weeks in a row.",
          recycle: "Move it to the least interruptible slot and decline one recurring meeting to pay for it.",
          escalation: "Treat the gate as false and start the exit.",
        },
        {
          mode: "Pride refuse",
          trigger: "You decline without naming what the raise would have unlocked.",
          recycle: "Price the 'no' — what constraint stays unsolved — and confirm you accept it.",
          escalation: "Re-enter negotiation with a smaller scope instead of a pure no.",
        },
      ],
      actionCard: {
        objective: "Convert an identity trap into a term with a craft floor.",
        nextMove:
          "Tonight: write the three conditions. Tomorrow: send them as the shape of yes, not as a complaint.",
        metric: "A written answer from the other side on the three conditions within 7 days.",
        doNot:
          "Do not accept on vibe, and do not reject to protect a story about who you are.",
      },
      unknowns: [
        "Whether the craft floor is negotiable.",
        "What the raise actually unlocks in the next 24 months.",
        "Whether the prior role remains available as a recycle.",
      ],
      assumptions: [
        "The offer is real and time-sensitive.",
        "The craft work is not secretly already gone.",
        "You can tolerate a tour of leadership if the floor holds.",
      ],
      refine: "Simplify: one sentence yes-condition and one sentence no-condition.",
    },
  },
  {
    id: "ex-local",
    createdAt: now - 172_800_000,
    source: "example",
    mode: "artifact",
    input:
      "Should this product add accounts and cloud sync, or stay local-first?",
    briefing: {
      title: "Sync is a promise. Accounts are a tax.",
      proposition:
        "The product must choose between local-first simplicity and account-backed sync across devices.",
      topology: "cooperative",
      frame:
        "This is usually sold as 'real product versus toy.' That frame hides the actual costs: auth support, data model ownership, and the day a stranger's data is world-writable. Local-first is not a moral position. Accounts are not maturity. They are different failure modes.",
      verdict:
        "Stay local-first until a named user job requires the same object on two devices, and until you are willing to own identity. Do not add accounts to look finished.\n\nIf cross-device restore is the job, ship export/import first. If sharing between people is the job, that is a different product — and it does require accounts. Do not build the second to satisfy the first.",
      register: {
        thesis:
          "Add accounts and sync. People expect to find their work on the next phone. Without it the product is a demo.",
        antithesis:
          "Stay local. Accounts add login friction, support load, and a class of privacy failures you cannot take back. Most 'I lost my data' pain is solved by a file.",
        synthesis:
          "Hold local as the default runtime. Treat sync as a gated capability behind a job that a file cannot do. Accounts exist only to protect that job — never as chrome, never as a leaderboard costume.",
        held: 0,
      },
      ooda: {
        observe:
          "The app works on one device. Someone will ask for 'save my stuff.' That sentence collapses three jobs: backup, second device, and sharing.",
        orient:
          "Backup is a file. Second device is sync. Sharing is identity plus permissions. Building accounts for backup is a category error with a long tail of cost.",
        decide:
          "Split the jobs. Ship backup as export. Keep accounts off until a second-device or multi-user job is explicit and staffed.",
        act: "Write the three jobs on the readme of the product. Add export this week. Do not open an auth ticket.",
        phase: "act",
        compressed: false,
      },
      gates: [
        {
          domain: "Job",
          condition:
            "A real user needs the same object on two devices in the same week, not 'someday when I switch phones.'",
          status: "false",
        },
        {
          domain: "Ownership",
          condition:
            "You will scope every query by a verified user id and refuse unowned personal data.",
          status: "unknown",
        },
        {
          domain: "Support",
          condition: "Someone is on the hook for locked-out accounts and bad merges.",
          status: "false",
        },
      ],
      failures: [
        {
          mode: "Costume accounts",
          trigger: "Login ships so the product 'looks real' with no per-user data model.",
          recycle: "Remove the login path. Put the energy into export.",
          escalation: "If login stays, stop and design ownership before any other feature.",
        },
        {
          mode: "World-writable diary",
          trigger: "Durable personal rows with no user id, or a delete-all control on shared data.",
          recycle: "Strip personal fields. Keep only unowned, non-sensitive records — or turn auth on properly.",
          escalation: "Take the app down until the data class is decided.",
        },
        {
          mode: "Forever local",
          trigger: "Repeated lost-work complaints and a still-missing export.",
          recycle: "Ship a readable export/import file this week.",
          escalation: "Then, and only then, reopen the second-device job.",
        },
      ],
      actionCard: {
        objective: "Give people a restore path without taking on identity.",
        nextMove:
          "Ship export/import as a file. Add a one-line note in the product: local on this device, backup is yours.",
        metric: "A user can leave and return on a new browser with a file, this week.",
        doNot:
          "Do not add login, a cloud sync toggle, or a shared leaderboard to solve backup.",
      },
      unknowns: [
        "How often users actually switch devices in a week.",
        "Whether anyone needs sharing versus restore.",
        "Who would own account support.",
      ],
      assumptions: [
        "The current product is useful on one device.",
        "No regulation currently forces an account.",
        "A file export is technically cheap relative to auth.",
      ],
      refine: "Adversary: a user who loses a phone tomorrow and has no export habit.",
    },
  },
];
