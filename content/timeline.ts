export interface TimelineMilestone {
  id: string
  year: string
  title: string
  context: string
  friction: string
  toolBuilt: string
  takeaway: string
  tags: string[]
  domain: "Ergonomics & Tools" | "Systems & Data" | "Human-AI Interaction"
  link?: string
  linkText?: string
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: "basketball-scoring",
    year: "2024",
    title: "Court-Side Basketball Live-Scoring Tool",
    context: "Personal project / Campus sports",
    domain: "Ergonomics & Tools",
    friction:
      "Tracking scores and foul limits court-side on paper or generic timers was error-prone during fast-break transitions. Mis-taps and delayed updates caused confusion between players and referees.",
    toolBuilt:
      "A dedicated, touch-first scoring web app with oversized thumb-zone buttons for rapid increments (+1, +2, +3, -1), instant quarter transitions, and per-quarter foul counts.",
    takeaway:
      "Physical ergonomics under time pressure determine whether an interface survives real-world use. This standalone experiment directly laid the technical foundation for the live-scoring engine built for the university-wide Eklavya sports fest.",
    tags: ["Ergonomics", "UI Under Pressure", "Next.js", "Touch UX"],
  },
  {
    id: "cotality-ast",
    year: "Jun 2025",
    title: "AST-Fingerprinted Code RAG Pipeline",
    context: "AI Engineering Intern, Cotality",
    domain: "Systems & Data",
    friction:
      "Automating code documentation across 15+ languages at 50,000+ LOC/day was causing prohibitive vector embedding costs because naive text-chunking re-embedded files even when only whitespace or comments changed.",
    toolBuilt:
      "An AST-based parser that computes cryptographic hashes for individual function subtrees, skipping vector re-embedding for unchanged AST nodes. Paired with a migration from FAISS to Azure Cosmos DB with IVF vector indexing for durable multi-tenant persistence.",
    takeaway:
      "Cut API costs by 85%. Proved that syntactic AST structure, not raw text chunks, is the correct abstraction for code AI caching, cost control, and retrieval trust.",
    tags: ["FastAPI", "AST Parsing", "Azure Cosmos DB", "Azure OpenAI"],
    link: "/investigations/cotality-rag-tradeoffs",
    linkText: "Read Cotality Case Study",
  },
  {
    id: "timetable-clash",
    year: "Aug 2025",
    title: "Sem-7 Timetable Clash-Checker & Plaksha Timetable",
    context: "CSAI'22 Cohort Representative & Campus-Wide Tool",
    domain: "Systems & Data",
    friction:
      "Selecting elective courses for Semester 7 caused rampant scheduling collisions across student cohorts. Static schedules made multi-course conflict verification nearly impossible.",
    toolBuilt:
      "Started as a lightweight conflict checker used across the entire Batch of '22. Expanded it into `plaksha-timetable`, a full portal with real-time calendar conflict detection, bulk admin schedule diffing, and .ics calendar exports.",
    takeaway:
      "What began as a localized tool in August 2025 to stop peers from missing graduation requirements grew into an institutional scheduling portal delivered to the Academic Office.",
    tags: ["Course Planning", "Conflict Detection", "Next.js", "Firebase"],
  },
  {
    id: "vr-latency",
    year: "Late 2025",
    title: "VR Conversational Latency Study",
    context: "HCI Research / MIT Presence (Under Review)",
    domain: "Human-AI Interaction",
    friction:
      "VR conversational agents exhibit 2–4s inference lags that break user presence. Shaving milliseconds off frontier LLMs hits a hard network and inference floor.",
    toolBuilt:
      "A Unity-based conversational agent (Gemini 2.5 Flash + Google Cloud STT/TTS at 1.8s) instrumented with three latency-feedback conditions (embodied gestures, visual HUD indicators, verbal fillers) evaluated via a formal within-subjects empirical study (N=18).",
    takeaway:
      "Embodied non-verbal gestures significantly beat visual spinners (p < 0.05). Proved that user perception of latency is governed by the feedback channel rather than the stopwatch number.",
    tags: ["VR", "Human-AI Interaction", "Within-Subjects Study", "Unity"],
    link: "/investigations/vr-latency-study",
    linkText: "Read VR Latency Investigation",
  },
  {
    id: "athleda-slides",
    year: "2026",
    title: "Athleda Player Auction Slide Generator",
    context: "Athleda Sports Society (Built Post-Tenure)",
    domain: "Ergonomics & Tools",
    friction:
      "Preparing annual sports player auctions required manually building hundreds of PowerPoint slides by cross-referencing spreadsheet columns with student registration photos.",
    toolBuilt:
      "A zero-server in-browser generation portal (`design-auctions`). Parses spreadsheets client-side, extracts ZIP photo bundles in memory, fuzzy-matches student names to photos, and renders vector-sharp presentation decks directly in the browser.",
    takeaway:
      "Executing heavy media processing directly inside the browser eliminated photo uploads and server costs entirely. Built after stepping down from leadership to solve a recurring auction bottleneck for incoming organizers.",
    tags: ["Client-Side Processing", "Automation", "In-Browser Generation", "Workflow Tools"],
  },
  {
    id: "vlm-annotation",
    year: "2026",
    title: "VLM Physical Benchmark Capture Tool",
    context: "Physical Reasoning Research, Plaksha University",
    domain: "Systems & Data",
    friction:
      "Collecting 459 benchmark objects with instrument-verified ground truth required constantly toggling between the camera app and notes app for each scale or caliper measurement, risking transcription errors.",
    toolBuilt:
      "An integrated iOS capture tool: on shutter press, the user selects the measurement task (weight, volume, height), enters the instrument reading in a pop-up notepad, and upon save it pairs the JPEG and TXT files locally while logging metadata directly to Google Sheets.",
    takeaway:
      "Building a small, tailored tool removed measurement friction during the initial solo data collection phase. When teammates joined with Android devices, the workflow smoothly transitioned into a collaborative division of labor (one photographing, one measuring).",
    tags: ["Research Tooling", "Data Ground-Truth", "Mobile UX", "Workflow Design"],
    link: "/investigations/vlm-physical-reasoning",
    linkText: "Read VLM Investigation",
  },
]
