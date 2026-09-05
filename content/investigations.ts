export interface Investigation {
  slug: string
  title: string
  subtitle: string
  date: string
  category: string
  tags: string[]
  paperBadge?: string
  status: string
  question: string
  approach: string
  experiment: string
  observation: string
  interpretation: string
  limitation: string
  nextQuestion: string
  paperCitation?: string
  interactiveType?: "latency-comparator" | "vlm-error-browser" | "none"
  metrics?: Record<string, string>
}

export const investigations: Investigation[] = [
  {
    slug: "vr-latency-study",
    title: "Wait for It: Latency Feedback Mechanisms for LLM Agents in VR",
    subtitle:
      "A component-level analysis showing that feedback channels, not raw response time, govern perceived animacy and immersion in conversational VR.",
    date: "2025-12-01",
    category: "Human-AI Interaction / VR",
    tags: ["Unity", "Gemini 2.5 Flash", "Within-Subjects Study", "HCI", "Statistical Analysis"],
    paperBadge: "Paper Under Review · MIT Presence",
    status: "Under Review",
    question:
      "Most conversational agents in VR exhibit noticeable latency (often 2–4 seconds) while coordinating speech-to-text, LLM inference, and audio synthesis. Does this delay inherently break immersion, or is the core breakdown that users have zero feedback while waiting?",
    approach:
      "Engineered a real-time VR conversational agent in Unity integrating Gemini 2.5 Flash with Google Cloud STT/TTS. Parallelized API calls, cached partial inferences, and preprocessed audio to achieve a fast baseline latency of ~1.8 seconds. Rather than treating 1.8s as the final goal, we built an experimental testbed with three distinct feedback conditions triggered during the wait window: embodied non-verbal gestures (head tilts, subtle breathing/listening posture), a conventional visual HUD loading indicator, and verbal conversational fillers ('Hmm, let me think...').",
    experiment:
      "Designed and executed a formal within-subjects empirical study (N=18) where participants engaged in conversational dialogue tasks under all three feedback conditions. Evaluated responses across standardized dimensions using the Godspeed questionnaire suite, focusing on perceived animacy, anthropomorphism, and user immersion.",
    observation:
      "Embodied non-verbal gestures significantly outperformed the visual loading indicator (Wilcoxon signed-rank test, p < 0.05) on both perceived animacy and immersion. Participants reported that visual spinners felt like 'software buffering', whereas embodied gestures made the agent feel like it was actively reflecting on the prompt. Verbal fillers performed moderately well, but occasionally caused awkward turn-taking collisions when users continued speaking.",
    interpretation:
      "The feedback channel through which latency is communicated matters far more than the raw milliseconds. When latency is accompanied by embodied, naturalistic signals, users attribute the wait to cognitive effort rather than technological failure.",
    limitation:
      "Small sample size (N=18) within a single controlled conversational domain in a VR headset. Does not yet test whether this holds across long multi-turn sessions where repetition of embodied gestures might induce uncanny-valley fatigue.",
    nextQuestion:
      "Does this feedback-channel effect translate to non-embodied generative AI workflows - such as agentic coding assistants that silently 'think' or edit files across 10–30 second windows without visual intermediate state?",
    paperCitation:
      "P. Arora, A. Lodha, S. Siddharth. 'Wait for It: A Component-Level Analysis of Latency Feedback Mechanisms for LLM Agents in VR.' Under review, MIT Presence, 2026.",
    interactiveType: "latency-comparator",
    metrics: {
      latency: "1.8s avg",
      cohort: "N=18",
      significance: "p < 0.05",
    },
  },
  {
    slug: "vlm-physical-reasoning",
    title: "QUIVER: Characterizing Failure Modes in VLM Physical-World Reasoning",
    subtitle:
      "Empirical benchmark of 459 instrument-verified images revealing a misidentification vs. miscalibration dichotomy and pixel-shortcut cheating.",
    date: "2026-05-01",
    category: "Model Evaluation / Vision-Language",
    tags: ["Vision-Language Models", "Benchmarking", "Error Analysis", "OpenCV", "Physical Reasoning"],
    paperBadge: "Submitted to AAAI 2027",
    status: "Submitted",
    question:
      "When frontier vision-language models estimate physical properties (mass, height, volume) of everyday objects, how are they actually failing? Are they failing to perceive the object, or do they lack a calibrated physical model of the world?",
    approach:
      "Served as primary data collector for a 459-image benchmark spanning 5 physical estimation tasks (weight, height, volume, material density, center-of-mass) with ground truth verified using precision digital scales and calipers. Built a custom capture workflow to log instrument values alongside image captures, and constructed a 3-tier blur degradation pipeline (OpenCV) to test perceptual robustness under optical noise.",
    experiment:
      "Conducted independent benchmarking runs across frontier models (Gemini 3.1 Pro, GPT-5.4, Gemini-Robotics-ER, Claude Opus 4.7, Gemma 4, Qwen 3.5). Performed deep qualitative error analysis on the 10 worst-performing responses per category per batch, analyzing the chain-of-thought tokens against ground-truth measurements.",
    observation:
      "Uncovered a clear misidentification-vs-miscalibration failure dichotomy: GPT-5.4 frequently fails by misidentifying objects or materials entirely (e.g., classifying a solid metal paperweight as hollow plastic), whereas Gemini variants correctly identify the object but overestimate mass by 1.8x–2.5x due to uncalibrated numerical grounding. Furthermore, models exhibited 'pixel-coverage cheating' - deriving height and volume estimates by counting bounding-box pixels in the frame rather than understanding scene depth or perspective. Under image blur, estimation performance collapsed catastrophically across all models.",
    interpretation:
      "Frontier VLMs do not construct genuine physical-world spatial priors. Instead, they synthesize compelling reasoning prose on top of brittle 2D pixel heuristics. When challenged with degraded perception, the superficial reasoning unspools.",
    limitation:
      "Evaluation focused on indoor, tabletop objects of rigid geometry. Dynamic interactions, deformability, and outdoor environments were beyond the scope of this benchmark.",
    nextQuestion:
      "Can open-weight models be fine-tuned via reasoning distillation to explicitly verify spatial anchor points and reject pixel-coverage heuristics before guessing scale?",
    paperCitation:
      "V. Lalwani, A. Shafiq, P. Arora, M. K. Gurumurthy, P. Pansari. 'QUIVER: Benchmarking and Enhancing Physical Reasoning Abilities of Vision-Language Models.' Submitted to AAAI 2027.",
    interactiveType: "vlm-error-browser",
    metrics: {
      datasetSize: "459 images",
      tasks: "5 physical tasks",
      models: "6 VLMs",
      biasFactor: "1.8–2.5x over-est",
    },
  },
  {
    slug: "cotality-rag-tradeoffs",
    title: "AST-Fingerprinted Code RAG: Balancing Trust and API Cost at Scale",
    subtitle:
      "How syntactic function fingerprinting cut embedding costs by 85% across 50,000+ LOC/day polyglot enterprise codebases.",
    date: "2025-07-01",
    category: "Applied ML / Systems",
    tags: ["FastAPI", "AST Parsing", "Azure Cosmos DB", "Azure OpenAI", "Vector Search"],
    status: "Shipped in Production",
    question:
      "When building an automated documentation pipeline indexing 15+ programming languages at 50,000+ LOC/day, how do you guarantee code changes are promptly reflected in retrieval without generating prohibitive Azure OpenAI embedding bills?",
    approach:
      "Built a FastAPI backend with AST-based parsing across 15+ languages. Rather than chunking files by line count or token window, the system parses source files into Abstract Syntax Trees and computes cryptographic hash digests for each individual function AST. When updates are pushed, unchanged function subtrees produce identical hashes and skip re-embedding entirely. Whitespace, comment updates, and reformatting generate no new API calls.",
    experiment:
      "Evaluated indexing and retrieval behavior across 17+ enterprise client repositories. Initially tested FAISS for fast local vector retrieval, but encountered operational fragility: process crashes required complete in-memory index rebuilds, leading to query downtime. Migrated storage to Azure Cosmos DB with IVF (Inverted File) vector indexing to support multi-tenant isolation, durable persistence, and ACID metadata updates.",
    observation:
      "AST fingerprinting reduced embedding API costs by 85% compared to naive file re-indexing. In real-world enterprise repos, fewer than 15% of functions are modified per commit. Migration to Cosmos DB increased query latency by ~12ms compared to in-memory FAISS, but eliminated index rebuild downtime and enabled concurrent documentation queries across 12 production REST endpoints.",
    interpretation:
      "In code-centric AI systems, syntactic structure is a far better unit of caching and retrieval than arbitrary text windows. Engineering for production trust requires accepting modest storage latency tradeoffs in exchange for persistence and consistency.",
    limitation:
      "AST parsing is language-grammar dependent. Dynamic metaprogramming or module-level alias mutations in interpreted languages can change execution semantics without modifying a local function's AST node.",
    nextQuestion:
      "Can we build lightweight dependency graphs connecting AST hashes, so that upstream interface changes automatically trigger targeted re-documentation of downstream call sites without brute-force re-crawling?",
    interactiveType: "none",
    metrics: {
      costReduction: "85%",
      throughput: "50k+ LOC/day",
      languages: "15+ langs",
      endpoints: "12 REST APIs",
    },
  },
]
