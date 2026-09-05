export interface Note {
  slug: string
  title: string
  date: string
  readingTime: string
  category: string
  summary: string
  content: string[]
  tags: string[]
}

export const technicalNotes: Note[] = [
  {
    slug: "migrating-faiss-to-cosmos-db",
    title: "Why I Migrated Cotality's Vector Store off FAISS to Cosmos DB with IVF",
    date: "2025-08-14",
    readingTime: "3 min read",
    category: "Systems & Storage",
    summary:
      "In-memory vector stores are brilliant for demos, but catastrophic when a container restart triggers a 40-minute index rebuild. Trading ~12ms for durable partition keys.",
    tags: ["Azure Cosmos DB", "FAISS", "Vector Search", "System Design"],
    content: [
      "When building our code documentation pipeline at Cotality, our first iteration ran on FAISS. It was blisteringly fast - nearest-neighbor searches over thousands of function vectors took barely two milliseconds. For a single developer testing local endpoints, it felt like magic.",
      "The illusion broke the first time our Kubernetes worker pod was evicted. Because FAISS indexes lived in-memory inside the container process, the restart meant our entire vector space was instantly vaporized. The worker had to re-fetch all vectors from blob storage and rebuild the index before serving another query - creating a 20–40 minute indexing downtime during which developer queries failed.",
      "Furthermore, as enterprise client repositories scaled to 17+ distinct codebases, keeping multiple client vector indexes separated in memory created dangerous concurrency locks and memory fragmentation. We needed multi-tenancy, partition isolation, and ACID metadata updates alongside vector embeddings.",
      "We migrated to Azure Cosmos DB with IVF (Inverted File) vector indexing. Was query latency slower? Yes: network roundtrips to Cosmos added roughly 12ms per retrieval. But in exchange, we gained persistent durability across pod lifecycles, native partition keys per client organization, and the ability to update a single function's vector without locking the entire repository's index.",
      "The core architectural takeaway: in production RAG systems, operational durability and index isolation almost always trump microsecond-level search speed.",
    ],
  },
  {
    slug: "pixel-coverage-shortcut-vlms",
    title: "The Pixel-Coverage Shortcut: How Frontier VLMs Fake Height and Volume",
    date: "2026-05-18",
    readingTime: "4 min read",
    category: "Model Evaluation",
    summary:
      "Reviewing the 10 worst errors per category across 459 benchmark images revealed a recurring trick: models cheat by deriving scale from bounding-box pixel area rather than scene perspective.",
    tags: ["Vision-Language Models", "Benchmarking", "Physical Reasoning", "Error Analysis"],
    content: [
      "While conducting the manual qualitative error analysis for the QUIVER physical reasoning benchmark (covering 459 tabletop images measured with digital scales and calipers), one peculiar trend kept appearing in the chain-of-thought outputs.",
      "When prompted to estimate the height or volume of an everyday object (a mug, an aerosol canister, a textbook), models like GPT-5.4 and Gemini variants would produce remarkably articulate reasoning paragraphs citing object geometry and estimated material density. But when you looked at the numerical estimates across varied camera distances, a glaring pattern emerged.",
      "The models were not performing 3D spatial estimation or grounding against contextual anchors (like table wood grain or shadows). Instead, they were using a crude 2D heuristic: how many vertical pixels does the object span in the image canvas? If you moved the camera closer to a small object so it occupied 70% of the frame height, the model's estimate surged as if the object had physically grown.",
      "This explains why introducing optical blur caused physical reasoning performance to collapse so abruptly across all frontier models. Blur doesn't necessarily hide what an object is - a human can easily tell a blurred coffee mug is still a mug - but blur destroys high-frequency edge detection, breaking the model's brittle bounding-box pixel heuristic.",
      "Frontier models do not possess an internalized 3D intuitive physics simulator. They possess a very good text generator that rationalizes 2D bounding-box heuristics in the vocabulary of physical reasoning.",
    ],
  },
  {
    slug: "rebuilding-dl-math-fundamentals",
    title: "Rebuilding DL and Linear Algebra Fundamentals from First Principles",
    date: "2026-07-22",
    readingTime: "3 min read",
    category: "Personal Growth / Research",
    summary:
      "Why I stepped back from high-level PyTorch APIs to re-derive matrix calculus, write attention mechanisms from raw tensor ops, and shore up mathematical foundations.",
    tags: ["Deep Learning", "Linear Algebra", "First Principles", "Self-Study"],
    content: [
      "After spending months evaluating vision-language models and building production RAG pipelines, I noticed a personal gap that made me uneasy. I was very effective at wiring together APIs, writing custom loss loops in PyTorch, and tuning hyperparameters. But whenever I read frontier research papers on diffusion mechanics or Riemannian manifolds in latent space, I felt the friction of relying on intuition rather than rigorous mathematical fluency.",
      "High-level libraries are deceptive: they make it effortless to train a model without truly understanding the spectral properties of the weight matrices, or how singular value decomposition relates to low-rank adaptation.",
      "I decided to spend dedicated morning hours rebuilding these foundations from scratch: working through Gilbert Strang's linear algebra problem sets, deriving backpropagation by hand across non-standard topologies, and implementing self-attention using only raw multidimensional arrays without autograd.",
      "It is humbling to step back from shipping high-level features to wrestle with matrix calculus. But if my goal is to conduct genuine research into model interpretability and physical grounding, mathematical rigor is not optional.",
    ],
  },
  {
    slug: "latency-vs-court-speed",
    title: "Latency vs. Court Speed: What a Basketball Scoring Tool Taught Me About UX Friction",
    date: "2024-11-10",
    readingTime: "3 min read",
    category: "Ergonomics & Tools",
    summary:
      "When a fast break occurs, you have 1.5 seconds to log points and fouls. Why building for court-side scorekeeping killed nested dropdowns forever.",
    tags: ["Ergonomics", "UI Under Pressure", "Mobile UX", "HCI"],
    content: [
      "In standard web design, a 200-millisecond delay or a two-step confirmation modal ('Are you sure you want to increment?') is considered acceptable. On a basketball court, it makes an interface completely useless.",
      "During a fast-break transition, a scorer has about 1.5 seconds to register a made layup, determine if an 'and-one' foul occurred, award the additional free-throw point, and check team foul thresholds before the defense inbounds the ball and sprints down the floor.",
      "When I built my first standalone court-side scoring site, I initially tried a clean, desktop-inspired layout. Within two minutes of a live pickup match, it failed: sweaty fingers missed small buttons, confirmation dialogs froze the screen, and looking down at the phone meant missing whether a shot was a 2 or a 3.",
      "I threw away the interface and redesigned it around physical thumb zones: huge green touch targets for +1, +2, +3, a distinct destructive -1 button for mis-counts, and inline quarter buttons that never leave the main viewport. No alerts, no dropdowns, instant haptic feedback.",
      "That simple tool taught me an enduring lesson: user friction is not an abstract aesthetic flaw. When an interface operates under real-world time pressure, poor ergonomics directly destroys data accuracy.",
    ],
  },
]
