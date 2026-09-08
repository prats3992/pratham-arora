import type { Metadata } from "next"
import Link from "next/link"
import { investigations } from "@/content/investigations"
import { InvestigationStage } from "@/components/investigation-stage"

export const metadata: Metadata = {
  title: "Investigations",
  description:
    "Inquiry-driven deep dives into human-AI interaction, model failure characterization, and production ML systems by Pratham Arora.",
}

export default function InvestigationsPage() {
  return (
    <div className="space-y-16">
      {/* Header */}
      <section className="pt-8 md:pt-16 space-y-3">
        <h1 className="font-heading font-bold text-heading-lg md:text-heading-xl text-[var(--text-primary)] leading-tight tracking-tight">
          Investigations
        </h1>
        <p className="text-body-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          Structured inquiries into how humans interact with AI under pressure, how frontier models fail at physical-world reasoning, and the architectural tradeoffs required to make systems trustworthy.
        </p>
      </section>

      {/* Investigation Cards */}
      <div className="space-y-12">
        {investigations.map((inv) => (
          <article
            key={inv.slug}
            className="border border-[var(--border)] rounded p-6 md:p-8 bg-[var(--bg-elevated)] space-y-8 transition-colors hover:border-[var(--accent)]/30"
          >
            {/* Header / Meta */}
            <div className="space-y-3 border-b border-[var(--border)] pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 text-data font-mono text-[var(--text-tertiary)]">
                <div className="flex items-center gap-3">
                  <span>{inv.category}</span>
                  {inv.paperBadge && (
                    <>
                      <span>·</span>
                      <span className="text-[var(--accent)] font-medium">{inv.paperBadge}</span>
                    </>
                  )}
                </div>
                <span>
                  {new Date(inv.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div>
                <h2 className="font-heading font-bold text-heading-sm md:text-heading-md text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
                  <Link href={`/investigations/${inv.slug}`}>{inv.title}</Link>
                </h2>
                <p className="text-base text-[var(--text-secondary)] mt-1.5 leading-relaxed max-w-3xl">
                  {inv.subtitle}
                </p>
              </div>

              {/* Metrics strip in plain mono data */}
              {inv.metrics && (
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-data font-mono">
                  {Object.entries(inv.metrics).map(([k, val]) => (
                    <div key={k} className="flex items-baseline gap-1.5">
                      <span className="text-[var(--accent)] font-medium">{val}</span>
                      <span className="text-[var(--text-tertiary)]">
                        {k.replace(/([A-Z])/g, " $1")}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Core Inquiry Stages Summary */}
            <div className="space-y-6">
              <InvestigationStage label="Question">
                <p>{inv.question}</p>
              </InvestigationStage>

              <InvestigationStage label="Observation" accent>
                <p>{inv.observation}</p>
              </InvestigationStage>

              <InvestigationStage label="Next Question">
                <p>{inv.nextQuestion}</p>
              </InvestigationStage>
            </div>

            {/* Read Deep-Dive & Tags Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
              <div className="flex flex-wrap gap-1.5">
                {inv.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-data font-mono rounded bg-[var(--bg-primary)] text-[var(--text-tertiary)] border border-[var(--border)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/investigations/${inv.slug}`}
                className="text-caption font-mono font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors shrink-0"
              >
                Read full inquiry and methodology
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Recruiter / Flat List Link */}
      <section className="border-t border-[var(--border)] pt-8 pb-4 flex flex-col sm:flex-row items-baseline justify-between gap-4 text-caption text-[var(--text-tertiary)]">
        <p>
          Prefer a standard chronological catalog of software and research engineering builds?
        </p>
        <Link
          href="/work"
          className="font-mono text-caption text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors shrink-0"
        >
          See the flat project archive
        </Link>
      </section>
    </div>
  )
}
