import type { Metadata } from "next"
import resumeData from "@/resume-data.json"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
  description:
    "Pratham Arora - researcher and engineer exploring human-AI interaction under pressure, VLM physical reasoning failure modes, and developer tools.",
}

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pratham Arora",
    url: "https://pratham-arora.vercel.app",
    jobTitle: "Computer Science & AI Researcher / Engineer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Plaksha University",
    },
    sameAs: [
      "https://github.com/prats3992",
      "https://www.linkedin.com/in/pratham3992arora",
    ],
  }

  return (
    <div className="space-y-16 max-w-3xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Intro / Thesis */}
      <section className="pt-8 md:pt-16 space-y-6">
        <div className="space-y-2">
          <h1 className="font-heading font-bold text-heading-lg md:text-heading-xl text-[var(--text-primary)] leading-tight tracking-tight">
            Pratham Arora
          </h1>
          <p className="text-caption text-[var(--text-secondary)]">
            B.Tech in Computer Science &amp; AI, Plaksha University (Graduated July 2026)
          </p>
        </div>

        <div className="space-y-4 text-base md:text-body-lg text-[var(--text-secondary)] leading-relaxed">
          <p>
            I keep building small, self-tested tools to remove friction from tasks I do myself - and now that AI sits inside almost everything I build or am evaluated with, I want to study what that presence does to a person&apos;s actual skill and their trust in it.
          </p>
          <p>
            Before working with generative models, my projects were rooted in physical and logistical friction: building a court-side basketball scoring app to survive fast-break transitions, automating athlete auction slides in the browser to spare student organizers hours of tedious formatting, and building an elective clash-checker adopted across our graduating class.
          </p>
          <p>
            In my research, I carry that same instinct toward models and interfaces. At Plaksha&apos;s Human-Technology Interaction Lab, I studied how feedback channels govern user perception of latency in conversational VR. In vision-language research, I collected an instrument-verified 459-image benchmark to characterize how frontier models fail at physical-world estimation - uncovering a fundamental misidentification vs. miscalibration dichotomy and pixel-shortcut cheating.
          </p>
        </div>
      </section>

      {/* Current Questions: Rule-divided rather than cards */}
      <section className="space-y-6 border-t border-[var(--border)] pt-10">
        <div>
          <h2 className="font-heading font-bold text-heading-sm md:text-heading-md text-[var(--text-primary)]">
            Questions I&apos;m Chewing On
          </h2>
        </div>

        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          <div className="py-6 space-y-2">
            <div className="flex items-baseline gap-2.5">
              <span className="font-mono text-data text-[var(--accent)] font-medium">01</span>
              <h3 className="font-sans font-medium text-base text-[var(--text-primary)]">
                Human-AI Interaction Under Wait &amp; Trust Pressure
              </h3>
            </div>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed pl-4 sm:pl-6">
              When an AI agent takes 10–30 seconds to &ldquo;think&rdquo; or execute a multi-step workflow, what intermediate signals preserve human cognitive momentum? Does the embodied feedback effect we proved in VR translate to non-embodied agentic coding and reasoning interfaces?
            </p>
          </div>

          <div className="py-6 space-y-2">
            <div className="flex items-baseline gap-2.5">
              <span className="font-mono text-data text-[var(--accent)] font-medium">02</span>
              <h3 className="font-sans font-medium text-base text-[var(--text-primary)]">
                Diagnosing and Distilling Physical Calibration in Models
              </h3>
            </div>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed pl-4 sm:pl-6">
              Frontier models generate fluent reasoning while secretly leaning on superficial heuristics (like bounding-box pixel counts) to estimate physical scale. Can we systematically distill grounded spatial verification into compact, open-weight models?
            </p>
          </div>

          <div className="py-6 space-y-2">
            <div className="flex items-baseline gap-2.5">
              <span className="font-mono text-data text-[var(--accent)] font-medium">03</span>
              <h3 className="font-sans font-medium text-base text-[var(--text-primary)]">
                Syntactic Invariants in Automated Code Intelligence
              </h3>
            </div>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed pl-4 sm:pl-6">
              What is the optimal syntactic boundary for caching and verification in code-generating agents? At Cotality, function AST digests reduced embedding overhead by 85%; how far can graph-based syntactic invariants go toward preventing hallucinated dependencies?
            </p>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="space-y-6 border-t border-[var(--border)] pt-10">
        <div>
          <h2 className="font-heading font-bold text-heading-sm md:text-heading-md text-[var(--text-primary)]">
            Papers &amp; Preprints
          </h2>
        </div>

        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)] text-base">
          <div className="py-5 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="font-bold text-[var(--text-primary)]">
                Wait for It: A Component-Level Analysis of Latency Feedback Mechanisms for LLM Agents in VR
              </h3>
              <span className="font-mono text-data text-[var(--accent)] shrink-0">Under review, MIT Presence (2026)</span>
            </div>
            <p className="text-caption text-[var(--text-tertiary)] font-mono">
              <strong>P. Arora</strong>, A. Lodha, S. Siddharth
            </p>
            <div className="pt-1">
              <Link
                href="/investigations/vr-latency-study"
                className="font-mono text-caption text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                Read investigation
              </Link>
            </div>
          </div>

          <div className="py-5 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <h3 className="font-bold text-[var(--text-primary)]">
                QUIVER: Benchmarking and Enhancing Physical Reasoning Abilities of Vision-Language Models
              </h3>
              <span className="font-mono text-data text-[var(--text-tertiary)] shrink-0">Submitted to AAAI 2027</span>
            </div>
            <p className="text-caption text-[var(--text-tertiary)] font-mono">
              V. Lalwani, A. Shafiq, <strong>P. Arora</strong>, M. K. Gurumurthy, P. Pansari
            </p>
            <div className="pt-1">
              <Link
                href="/investigations/vlm-physical-reasoning"
                className="font-mono text-caption text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                Read investigation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Condensed Track Record */}
      <section className="space-y-6 border-t border-[var(--border)] pt-10">
        <div>
          <h2 className="font-heading font-bold text-heading-sm md:text-heading-md text-[var(--text-primary)]">
            Experience &amp; Leadership
          </h2>
        </div>

        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)] text-base">
          <div className="py-3.5 space-y-0.5">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <span className="font-medium text-[var(--text-primary)]">
                AI &amp; Automation Architect <span className="text-[var(--text-secondary)]"> - Practus Advisors</span>
              </span>
              <span className="font-mono text-data text-[var(--text-tertiary)] shrink-0">Jul 2026 – Present</span>
            </div>
            <p className="text-caption text-[var(--text-tertiary)]">
              Automating growth office reporting workflows and contributing to firm ERP finance data migrations.
            </p>
          </div>

          <div className="py-3.5 space-y-0.5">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <span className="font-medium text-[var(--text-primary)]">
                AI Engineering Intern <span className="text-[var(--text-secondary)]"> - Cotality</span>
              </span>
              <span className="font-mono text-data text-[var(--text-tertiary)] shrink-0">Jun 2025 – Jul 2025</span>
            </div>
            <p className="text-caption text-[var(--text-tertiary)]">
              Architected FastAPI polyglot documentation engine, built AST-hash dedup cutting embedding costs by 85%, and migrated from FAISS to Azure Cosmos DB with IVF vector search.
            </p>
          </div>

          <div className="py-3.5 space-y-0.5">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <span className="font-medium text-[var(--text-primary)]">
                Freelance Web Developer <span className="text-[var(--text-secondary)]"> - PQRS Research (Dr. Niket Tandon)</span>
              </span>
              <span className="font-mono text-data text-[var(--text-tertiary)] shrink-0">May 2026 – Present</span>
            </div>
            <p className="text-caption text-[var(--text-tertiary)]">
              Redesigning platform in Next.js with dual intake systems for mentors and research mentees.
            </p>
          </div>

          <div className="py-3.5 space-y-0.5">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <span className="font-medium text-[var(--text-primary)]">
                Head of Technology <span className="text-[var(--text-secondary)]"> - Athleda Sports Society</span>
              </span>
              <span className="font-mono text-data text-[var(--text-tertiary)] shrink-0">Apr 2025 – Feb 2026</span>
            </div>
            <p className="text-caption text-[var(--text-tertiary)]">
              Built and deployed sports platforms serving 500+ students, shipped real-time match scoring, and built the zero-server auction slides generator.
            </p>
          </div>

          <div className="py-3.5 space-y-0.5">
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <span className="font-medium text-[var(--text-primary)]">
                Cohort Representative <span className="text-[var(--text-secondary)]"> - Plaksha University (CSAI&apos;22)</span>
              </span>
              <span className="font-mono text-data text-[var(--text-tertiary)] shrink-0">Oct 2024 – Jul 2026</span>
            </div>
            <p className="text-caption text-[var(--text-tertiary)]">
              Built the initial Sem-7 timetable clash-checker and expanded it into the campus-wide scheduling portal.
            </p>
          </div>
        </div>
      </section>

      {/* Academic Curriculum Vitae */}
      <section className="space-y-4 border-t border-[var(--border)] pt-10">
        <div>
          <h2 className="font-heading font-bold text-heading-sm text-[var(--text-primary)]">
            Academic Curriculum Vitae
          </h2>
          <p className="text-caption text-[var(--text-secondary)] mt-1">
            Comprehensive academic CV covering research, publications, software systems, and coursework:
          </p>
        </div>

        <div className="pt-2">
          <a
            href="/CV.tex"
            download
            className="p-4 rounded border border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[var(--accent)]/50 transition-colors group flex items-center justify-between max-w-md"
          >
            <div>
              <div className="font-medium text-caption text-[var(--text-primary)] group-hover:text-[var(--accent)]">
                Curriculum Vitae (CV)
              </div>
              <div className="text-data text-[var(--text-tertiary)] mt-0.5 font-mono">
                LaTeX Source · Academic &amp; Research Track
              </div>
            </div>
            <span className="font-mono text-data text-[var(--accent)]">↓ .tex</span>
          </a>
        </div>
      </section>

      {/* Contact Bar */}
      <section className="border-t border-[var(--border)] pt-8 flex flex-wrap items-center justify-between gap-4 text-data font-mono text-[var(--text-tertiary)]">
        <div>
          Email:{" "}
          <a
            href={`mailto:${resumeData.personalInfo.email}`}
            className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
          >
            {resumeData.personalInfo.email}
          </a>
        </div>
        <div className="flex gap-4">
          <a
            href={resumeData.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            GitHub <span className="text-micro font-sans">↗</span>
          </a>
          <a
            href={resumeData.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors"
          >
            LinkedIn <span className="text-micro font-sans">↗</span>
          </a>
        </div>
      </section>
    </div>
  )
}
