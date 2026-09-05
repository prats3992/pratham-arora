import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { technicalNotes } from "@/content/notes"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return technicalNotes.map((note) => ({
    slug: note.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const note = technicalNotes.find((n) => n.slug === slug)
  if (!note) return { title: "Note Not Found" }

  return {
    title: note.title,
    description: note.summary,
    openGraph: {
      title: `${note.title} - Pratham Arora`,
      description: note.summary,
      type: "article",
      url: `https://pratham-arora.vercel.app/notes/${note.slug}`,
    },
  }
}

export default async function NoteDetailPage({ params }: Props) {
  const { slug } = await params
  const note = technicalNotes.find((n) => n.slug === slug)
  if (!note) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: note.title,
    description: note.summary,
    author: {
      "@type": "Person",
      name: "Pratham Arora",
      url: "https://pratham-arora.vercel.app",
    },
    datePublished: note.date,
    keywords: note.tags.join(", "),
  }

  return (
    <article className="space-y-10 max-w-2xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="pt-6">
        <Link
          href="/notes"
          className="font-mono text-caption text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
        >
          &larr; Back to all notes
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4 border-b border-[var(--border)] pb-6">
        <div className="flex flex-wrap items-center gap-3 font-mono text-data text-[var(--text-tertiary)]">
          <span className="font-sans font-medium text-caption text-[var(--text-primary)]">
            {note.category}
          </span>
          <span>·</span>
          <span>{new Date(note.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
          <span>·</span>
          <span>{note.readingTime}</span>
        </div>

        <h1 className="font-heading font-bold text-heading-md md:text-heading-lg text-[var(--text-primary)] leading-tight tracking-tight">
          {note.title}
        </h1>

        <p className="text-base text-[var(--text-secondary)] italic border-l border-[var(--border)] pl-4 py-0.5">
          {note.summary}
        </p>
      </header>

      {/* Body paragraphs */}
      <div className="space-y-6 text-base text-[var(--text-secondary)] leading-relaxed">
        {note.content.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>

      {/* Footer & Tags */}
      <footer className="border-t border-[var(--border)] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-data font-mono rounded border border-[var(--border)] text-[var(--text-tertiary)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          href="/notes"
          className="font-mono text-caption text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
        >
          &larr; View all notes
        </Link>
      </footer>
    </article>
  )
}
