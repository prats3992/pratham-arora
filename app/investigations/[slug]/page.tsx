import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { investigations } from "@/content/investigations"
import { InvestigationStage } from "@/components/investigation-stage"
import { LatencyComparator } from "@/components/latency-comparator"
import { VlmErrorBrowser } from "@/components/vlm-error-browser"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return investigations.map((inv) => ({
    slug: inv.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const inv = investigations.find((i) => i.slug === slug)
  if (!inv) return { title: "Investigation Not Found" }

  return {
    title: inv.title,
    description: inv.subtitle,
    openGraph: {
      title: `${inv.title} - Pratham Arora`,
      description: inv.subtitle,
      type: "article",
      url: `https://pratham-arora.vercel.app/investigations/${inv.slug}`,
    },
  }
}

export default async function InvestigationDetailPage({ params }: Props) {
  const { slug } = await params
  const inv = investigations.find((i) => i.slug === slug)
  if (!inv) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: inv.title,
    description: inv.subtitle,
    author: {
      "@type": "Person",
      name: "Pratham Arora",
      url: "https://pratham-arora.vercel.app",
    },
    datePublished: inv.date,
    keywords: inv.tags.join(", "),
  }

  return (
    <article className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back link */}
      <div className="pt-6">
        <Link
          href="/investigations"
          className="font-mono text-caption text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
        >
          &larr; Back to all investigations
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4 border-b border-[var(--border)] pb-8 max-w-4xl">
        <div className="flex flex-wrap items-center gap-3 font-mono text-data text-[var(--text-tertiary)]">
          <span>{inv.category}</span>
          {inv.paperBadge && (
            <>
              <span>·</span>
              <span className="text-[var(--text-secondary)]">{inv.paperBadge}</span>
            </>
          )}
          <span>·</span>
          <span>
            {new Date(inv.date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <h1 className="font-heading font-bold text-heading-md md:text-heading-lg lg:text-heading-xl text-[var(--text-primary)] leading-tight tracking-tight">
          {inv.title}
        </h1>

        <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed">
          {inv.subtitle}
        </p>
      </header>

      {/* Interactive Tool Widget (Full Width within reading flow) */}
      {inv.interactiveType === "latency-comparator" && (
        <section aria-label="Interactive latency testbed">
          <LatencyComparator />
        </section>
      )}

      {inv.interactiveType === "vlm-error-browser" && (
        <section aria-label="VLM error analysis testbed">
          <VlmErrorBrowser />
        </section>
      )}

      {/* Main Two-Column Layout: Narrative (~65ch) + Side Margin Annotation Rail */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 pt-2">
        {/* Left Column: Sequential Stages (~65ch) */}
        <div className="max-w-reading flex-1 space-y-10">
          <InvestigationStage label="Question">
            <p>{inv.question}</p>
          </InvestigationStage>

          <InvestigationStage label="Approach">
            <p>{inv.approach}</p>
          </InvestigationStage>

          <InvestigationStage label="Experiment">
            <p>{inv.experiment}</p>
          </InvestigationStage>

          <InvestigationStage label="Observation" accent>
            <p className="text-[var(--text-primary)]">{inv.observation}</p>
          </InvestigationStage>

          <InvestigationStage label="Interpretation">
            <p>{inv.interpretation}</p>
          </InvestigationStage>

          <InvestigationStage label="Limitation">
            <p>{inv.limitation}</p>
          </InvestigationStage>

          <InvestigationStage label="Next Question">
            <p className="text-[var(--text-primary)] font-medium">{inv.nextQuestion}</p>
          </InvestigationStage>

          {/* Academic Citation Block */}
          {inv.paperCitation && (
            <div className="border border-[var(--border)] rounded p-5 bg-[var(--bg-elevated)] space-y-2 mt-8">
              <div className="text-caption font-medium text-[var(--text-secondary)]">
                Paper Citation &amp; Authorship
              </div>
              <p className="text-caption font-mono text-[var(--text-secondary)] leading-relaxed">
                {inv.paperCitation}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Margin-Annotation Rail (Desktop Sticky, Mobile/Tablet Grid) */}
        <aside className="lg:w-60 xl:w-64 shrink-0 font-mono text-data border-t lg:border-t-0 lg:border-l border-[var(--border)] pt-8 lg:pt-0 lg:pl-8 w-full lg:sticky lg:top-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8">
            {/* Measured Data Callouts */}
            {inv.metrics && (
              <div className="space-y-4">
              <div className="text-caption font-medium text-[var(--text-primary)] font-sans border-b border-[var(--border)] pb-2">
                Measurements
              </div>
              <dl className="space-y-3">
                {Object.entries(inv.metrics).map(([k, val]) => (
                  <div key={k} className="space-y-0.5">
                    <dt className="text-data text-[var(--text-tertiary)]">
                      {k.replace(/([A-Z])/g, " $1")}
                    </dt>
                    <dd className="text-base font-bold text-[var(--accent)]">
                      {val}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Telemetry / Context Metadata */}
          <div className="space-y-3 pt-2">
            <div className="text-caption font-medium text-[var(--text-primary)] font-sans border-b border-[var(--border)] pb-2">
              Parameters
            </div>
            <div className="space-y-2 text-data text-[var(--text-tertiary)]">
              <div>
                <span className="block text-[var(--text-secondary)]">Domain:</span>
                {inv.category}
              </div>
              <div>
                <span className="block text-[var(--text-secondary)]">Status:</span>
                {inv.status}
              </div>
              <div>
                <span className="block text-[var(--text-secondary)]">Date:</span>
                {new Date(inv.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2 pt-2">
            <div className="text-caption font-medium text-[var(--text-primary)] font-sans border-b border-[var(--border)] pb-2">
              Keywords
            </div>
            <div className="flex flex-wrap gap-1">
              {inv.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-1.5 py-0.5 text-data border border-[var(--border)] rounded text-[var(--text-tertiary)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </aside>
      </div>

      {/* Footer Nav */}
      <footer className="border-t border-[var(--border)] pt-8 flex items-center justify-between">
        <Link
          href="/investigations"
          className="font-mono text-caption text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
        >
          &larr; View all investigations
        </Link>
      </footer>
    </article>
  )
}
