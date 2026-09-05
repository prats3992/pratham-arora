"use client"

import { useState } from "react"
import Link from "next/link"
import { MetricCard } from "@/components/metric-card"

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string[]
  tags: string[]
  status: string
  date: string
  githubUrl: string
  liveUrl?: string
  featured?: boolean
  category?: string
  metrics?: Record<string, string>
}

interface WorkClientProps {
  projects: Project[]
}

export function WorkClient({ projects }: WorkClientProps) {
  const [filter, setFilter] = useState<string>("All")

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ]

  const sorted = [...projects].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const filtered =
    filter === "All" ? sorted : sorted.filter((p) => p.category === filter)

  return (
    <div className="space-y-12">
      <section className="pt-8 md:pt-16 space-y-3">
        <h1 className="font-heading font-bold text-heading-lg md:text-heading-xl tracking-tight text-[var(--text-primary)]">
          Work
        </h1>
        <p className="text-body-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
          A flat, complete archive of technical builds and research engineering implementations.
        </p>
        <div className="pt-1">
          <Link
            href="/investigations"
            className="text-caption font-mono text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            Looking for inquiry-driven research writeups? See Investigations
          </Link>
        </div>
      </section>

      {/* Filters */}
      {categories.length > 2 && (
        <div className="flex overflow-x-auto sm:flex-wrap items-center gap-2 border-b border-[var(--border)] pb-3 sm:pb-4 font-mono text-data scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as string)}
              className={`px-3 py-1 rounded whitespace-nowrap shrink-0 transition-colors ${
                filter === cat
                  ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--accent)]"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)] border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Project list - Rendered natively in HTML via <details>/<summary> for 100% crawlability */}
      <div className="space-y-1">
        {filtered.map((project) => {
          const year = new Date(project.date).getFullYear()

          return (
            <details
              key={project.id}
              className="border-b border-[var(--border)] last:border-b-0 group"
            >
              {/* Clickable Header Row */}
              <summary className="w-full text-left py-3.5 sm:py-4 flex items-center gap-3 sm:gap-4 group cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
                <span className="font-mono text-data text-[var(--text-tertiary)] w-10 sm:w-12 shrink-0">
                  {year}
                </span>
                <span className="font-heading font-bold text-base text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-150 flex-1 min-w-0 truncate">
                  {project.title}
                </span>
                {project.category && (
                  <span className="hidden sm:inline font-mono text-data px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-tertiary)] border border-[var(--border)] shrink-0">
                    {project.category}
                  </span>
                )}
                <div className="hidden md:flex items-center gap-1 shrink-0 max-w-[200px] overflow-hidden">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-data text-[var(--text-tertiary)] truncate"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-[var(--text-tertiary)] text-caption shrink-0 transition-transform duration-200 group-open:rotate-45 font-mono">
                  +
                </span>
              </summary>

              {/* Detail Content (ALWAYS present in DOM / SSR HTML) */}
              <div className="pb-6 pl-4 sm:pl-14 md:pl-16 pr-2 sm:pr-4 space-y-4">
                <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                  {project.description}
                </p>

                {project.longDescription && project.longDescription.length > 0 && (
                  <ul className="space-y-1.5 mt-1">
                    {project.longDescription.map((line, i) => (
                      <li
                        key={i}
                        className="text-base text-[var(--text-secondary)] leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-px before:bg-[var(--text-tertiary)]"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                )}

                {project.metrics && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
                    {Object.entries(project.metrics).map(([key, val]) => (
                      <MetricCard
                        key={key}
                        label={formatMetricLabel(key)}
                        value={val}
                      />
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-data font-mono text-[var(--text-tertiary)] border border-[var(--border)] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-1 text-caption font-mono">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      Source <span className="text-micro font-sans">↗</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      Live Demo <span className="text-micro font-sans">↗</span>
                    </a>
                  )}
                </div>
              </div>
            </details>
          )
        })}

        {filtered.length === 0 && (
          <p className="text-[var(--text-tertiary)] text-caption py-12 text-center">
            No projects found.
          </p>
        )}
      </div>
    </div>
  )
}

function formatMetricLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}
