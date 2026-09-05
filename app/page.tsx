import Link from "next/link"
import resumeData from "@/resume-data.json"
import { FrictionTimeline } from "@/components/friction-timeline"
import { investigations } from "@/content/investigations"

export default function Home() {
  const vrInvestigation = investigations.find((i) => i.slug === "vr-latency-study")!
  const vlmInvestigation = investigations.find((i) => i.slug === "vlm-physical-reasoning")!

  return (
    <div className="space-y-20">
      {/* ── 1. Hero / Thesis Screen ── */}
      <section className="pt-8 md:pt-16 space-y-6">
        <div className="space-y-4 max-w-3xl">
          <h1 className="font-heading font-bold text-heading-lg sm:text-heading-xl text-[var(--text-primary)] leading-[1.12] tracking-tight">
            I keep building small, self-tested tools to remove friction from tasks I do myself.
          </h1>

          <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed">
            And now that AI sits inside almost everything I build or am evaluated with, I want to study what that presence does to a person&apos;s actual skill and their trust in it.
          </p>

          <div className="pt-2 text-caption text-[var(--text-secondary)]">
            <span className="text-[var(--text-primary)] font-medium">Pratham Arora</span>
            <span className="mx-2 text-[var(--text-tertiary)]">/</span>
            <span>Computer Science &amp; AI, Plaksha University &apos;26</span>
          </div>
        </div>

        {/* Action / Nav links */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-caption font-mono text-[var(--text-tertiary)] pt-4 border-t border-[var(--border)]">
          <Link
            href="/investigations"
            className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors font-medium"
          >
            Investigations
          </Link>
          <span className="text-[var(--border)]">/</span>
          <Link href="/notes" className="hover:text-[var(--text-primary)] transition-colors">
            Technical Notes
          </Link>
          <span className="text-[var(--border)]">/</span>
          <Link href="/about" className="hover:text-[var(--text-primary)] transition-colors">
            About
          </Link>
          <span className="text-[var(--border)]">/</span>
          <a
            href={resumeData.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            GitHub <span className="text-micro">↗</span>
          </a>
          <span className="text-[var(--border)]">/</span>
          <a
            href={`mailto:${resumeData.personalInfo.email}`}
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            Email
          </a>
        </div>
      </section>

      {/* Instrumentation divider */}
      <div className="rule-ticked" />

      {/* ── 2. The Friction-Instinct Timeline (Origin Story) ── */}
      <section>
        <FrictionTimeline />
      </section>

      {/* Instrumentation divider */}
      <div className="rule-ticked" />

      {/* ── 3. Centerpiece Investigations ── */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
          <div>
            <h2 className="font-heading font-bold text-heading-md text-[var(--text-primary)]">
              Active Investigations
            </h2>
          </div>
          <Link
            href="/investigations"
            className="text-caption font-mono text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors shrink-0"
          >
            View all investigations
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: VR Latency Study */}
          <article className="border border-[var(--border)] rounded p-6 bg-[var(--bg-elevated)] space-y-4 hover:border-[var(--accent)]/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 text-data font-mono text-[var(--text-tertiary)]">
                <span>{vrInvestigation.category}</span>
                <span className="text-[var(--accent)]">p &lt; 0.05 · N=18</span>
              </div>

              <h3 className="font-heading font-bold text-heading-sm text-[var(--text-primary)]">
                <Link
                  href={`/investigations/${vrInvestigation.slug}`}
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  {vrInvestigation.title}
                </Link>
              </h3>

              <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                Most conversational VR agents feel laggy enough to break immersion. We proved through a within-subjects study that embodied gestures significantly beat conventional loading spinners - showing the feedback channel, not raw latency, dictates perceived cognition.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-caption font-mono">
              <span className="text-data text-[var(--text-tertiary)]">MIT Presence (Under Review)</span>
              <Link
                href={`/investigations/${vrInvestigation.slug}`}
                className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors font-medium"
              >
                Read investigation
              </Link>
            </div>
          </article>

          {/* Card 2: VLM Physical Reasoning Benchmark */}
          <article className="border border-[var(--border)] rounded p-6 bg-[var(--bg-elevated)] space-y-4 hover:border-[var(--accent)]/40 transition-colors flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 text-data font-mono text-[var(--text-tertiary)]">
                <span>{vlmInvestigation.category}</span>
                <span>459 images · 6 models</span>
              </div>

              <h3 className="font-heading font-bold text-heading-sm text-[var(--text-primary)]">
                <Link
                  href={`/investigations/${vlmInvestigation.slug}`}
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  {vlmInvestigation.title}
                </Link>
              </h3>

              <p className="text-base text-[var(--text-secondary)] leading-relaxed">
                Authored error analysis on 459 instrument-measured images across 6 frontier VLMs. Uncovered a misidentification vs. miscalibration dichotomy and documented models cheating on height estimation via 2D bounding-box pixel heuristics.
              </p>
            </div>

            <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-caption font-mono">
              <span className="text-data text-[var(--text-tertiary)]">Submitted to AAAI 2027</span>
              <Link
                href={`/investigations/${vlmInvestigation.slug}`}
                className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors font-medium"
              >
                Read investigation
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* Instrumentation divider */}
      <div className="rule-ticked" />

      {/* ── 4. Compact Track Record ── */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between">
          <div>
            <h2 className="font-heading font-bold text-heading-md text-[var(--text-primary)]">
              Track Record
            </h2>
          </div>
          <Link
            href="/about"
            className="font-mono text-caption text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors"
          >
            Full background
          </Link>
        </div>

        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)] text-base">
          <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div>
              <span className="text-[var(--text-primary)] font-medium">AI &amp; Automation Architect</span>
              <span className="text-[var(--text-secondary)]"> - Practus Advisors</span>
              <span className="block text-caption text-[var(--text-tertiary)] mt-0.5">
                Automating reporting workflows and ERP financial data migrations.
              </span>
            </div>
            <span className="font-mono text-data text-[var(--text-tertiary)] shrink-0">Jul 2026 – Present</span>
          </div>

          <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div>
              <span className="text-[var(--text-primary)] font-medium">Researcher (VLM Physical Reasoning)</span>
              <span className="text-[var(--text-secondary)]"> - Plaksha University</span>
              <span className="block text-caption text-[var(--text-tertiary)] mt-0.5">
                Primary data collector &amp; qualitative error analysis author on 459-image benchmark (AAAI &apos;27).
              </span>
            </div>
            <span className="font-mono text-data text-[var(--text-tertiary)] shrink-0">Jan 2026 – May 2026</span>
          </div>

          <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div>
              <span className="text-[var(--text-primary)] font-medium">AI Engineering Intern</span>
              <span className="text-[var(--text-secondary)]"> - Cotality</span>
              <span className="block text-caption text-[var(--text-tertiary)] mt-0.5">
                AST-hash dedup cutting embedding costs by 85%; Cosmos DB vector indexing across 17+ codebases.
              </span>
            </div>
            <span className="font-mono text-data text-[var(--text-tertiary)] shrink-0">Jun 2025 – Jul 2025</span>
          </div>

          <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div>
              <span className="text-[var(--text-primary)] font-medium">Head of Technology</span>
              <span className="text-[var(--text-secondary)]"> - Athleda Sports Society</span>
              <span className="block text-caption text-[var(--text-tertiary)] mt-0.5">
                Built sports platform serving 500+ students, real-time match scoring, and browser slide generator.
              </span>
            </div>
            <span className="font-mono text-data text-[var(--text-tertiary)] shrink-0">Apr 2025 – Feb 2026</span>
          </div>

          <div className="py-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div>
              <span className="text-[var(--text-primary)] font-medium">Cohort Representative</span>
              <span className="text-[var(--text-secondary)]"> - Plaksha University (CSAI&apos;22)</span>
              <span className="block text-caption text-[var(--text-tertiary)] mt-0.5">
                Built timetable clash-checker used across Batch of &apos;22; expanded to campus scheduling portal.
              </span>
            </div>
            <span className="font-mono text-data text-[var(--text-tertiary)] shrink-0">Oct 2024 – Jul 2026</span>
          </div>
        </div>
      </section>

      {/* Instrumentation divider */}
      <div className="rule-ticked" />

      {/* ── 5. Honest Skills ── */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-heading font-bold text-heading-md text-[var(--text-primary)]">
            Active Stack &amp; Foundations
          </h2>
          <p className="text-base text-[var(--text-secondary)] max-w-xl">
            Distinguishing tools I actively ship with from core mathematical foundations I am currently re-deriving and strengthening from first principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Actively Building With */}
          <div className="p-5 rounded bg-[var(--bg-elevated)] border border-[var(--border)] space-y-3">
            <h3 className="font-sans font-medium text-caption text-[var(--text-primary)]">
              Actively Shipping &amp; Evaluating With
            </h3>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                "Python",
                "PyTorch",
                "FastAPI",
                "TypeScript",
                "Next.js",
                "Azure Cosmos DB",
                "OpenCV",
                "LangChain",
                "AST Parsing",
                "REST APIs",
                "Unity (C#)",
                "Firebase",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-data font-mono rounded bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Rebuilding & Deepening */}
          <div className="p-5 rounded bg-[var(--bg-elevated)] border border-dashed border-[var(--border)] space-y-3">
            <h3 className="font-sans font-medium text-caption text-[var(--text-secondary)]">
              Re-Deriving &amp; Deepening (First Principles)
            </h3>
            <p className="text-data text-[var(--text-tertiary)] leading-relaxed">
              Dedicated self-study focused on building mathematical and experimental foundations without library shortcuts:
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[
                "Linear Algebra (Strang)",
                "Matrix Calculus / Backprop by hand",
                "Within-Subjects Study Design",
                "Statistical Hypothesis Testing (Wilcoxon)",
                "Attention Ops from Scratch",
                "Spatial Calibration",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-data font-mono rounded bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Footer ── */}
      <footer className="border-t border-[var(--border)] pt-8 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-data font-mono text-[var(--text-tertiary)]">
        <div>
          &copy; {new Date().getFullYear()} Pratham Arora
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/work"
            className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            All projects archive
          </Link>
          <span>/</span>
          <a
            href={resumeData.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)]"
          >
            GitHub <span className="text-micro font-sans">↗</span>
          </a>
          <a
            href={resumeData.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)]"
          >
            LinkedIn <span className="text-micro font-sans">↗</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
