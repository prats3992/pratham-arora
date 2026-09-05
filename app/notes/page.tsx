import type { Metadata } from "next"
import Link from "next/link"
import { technicalNotes } from "@/content/notes"

export const metadata: Metadata = {
  title: "Technical Notes",
  description:
    "Short, dated technical logs on systems engineering, VLM evaluation, vector indexing, and mathematical foundations by Pratham Arora.",
}

export default function NotesPage() {
  return (
    <div className="space-y-12 max-w-3xl mx-auto">
      {/* Header */}
      <section className="pt-8 md:pt-16 space-y-3">
        <h1 className="font-heading font-bold text-heading-lg md:text-heading-xl text-[var(--text-primary)] leading-tight tracking-tight">
          Technical Notes
        </h1>
        <p className="text-body-lg text-[var(--text-secondary)] leading-relaxed">
          Dated logs documenting engineering decisions, failure patterns discovered during benchmarking, and active self-study.
        </p>
      </section>

      {/* Notes Stream: Rule-divided rather than card boxes */}
      <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {technicalNotes.map((note) => (
          <article
            key={note.slug}
            className="py-8 space-y-3 group transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-data text-[var(--text-tertiary)]">
              <span className="font-sans font-medium text-caption text-[var(--text-primary)]">
                {note.category}
              </span>
              <div className="flex items-center gap-2">
                <span>{new Date(note.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                <span>·</span>
                <span>{note.readingTime}</span>
              </div>
            </div>

            <h2 className="font-heading font-bold text-heading-sm text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
              <Link href={`/notes/${note.slug}`}>{note.title}</Link>
            </h2>

            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              {note.summary}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
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
                href={`/notes/${note.slug}`}
                className="font-mono text-caption text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors font-medium"
              >
                Read note
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
