"use client"

import { useState } from "react"
import { MetricCard } from "@/components/metric-card"

interface Project {
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
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>("All")

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ]

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter)

  return (
    <div className="space-y-12">
      <section className="pt-8 md:pt-16">
        <h1 className="font-heading font-bold text-[2rem] md:text-[2.5rem] tracking-tight text-[var(--text-primary)] mb-2">
          Work
        </h1>
        <p className="text-[var(--text-secondary)] max-w-xl">
          A complete archive of technical projects — from ML research to
          production systems.
        </p>
      </section>

      {/* Filters */}
      {categories.length > 2 && (
        <div className="flex items-center gap-2 border-b border-[var(--border)] pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as string)}
              className={`px-3 py-1 rounded text-2xs font-mono transition-colors duration-150 ${
                filter === cat
                  ? "bg-[var(--accent-muted)] text-[var(--accent)] border border-[var(--accent)]/20"
                  : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)] border border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Project list */}
      <div className="space-y-1">
        {filtered.map((project) => {
          const isExpanded = expandedId === project.id
          const year = new Date(project.date).getFullYear()

          return (
            <div
              key={project.id}
              className="border-b border-[var(--border)] last:border-b-0"
            >
              {/* Row */}
              <button
                onClick={() =>
                  setExpandedId(isExpanded ? null : project.id)
                }
                className="w-full text-left py-4 flex items-center gap-4 group"
              >
                <span className="font-mono text-2xs text-[var(--text-tertiary)] w-10 shrink-0">
                  {year}
                </span>
                <span className="font-heading font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-150 flex-1 min-w-0 truncate">
                  {project.title}
                </span>
                {project.category && (
                  <span className="hidden sm:inline font-mono text-2xs px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-tertiary)] border border-[var(--border)] shrink-0">
                    {project.category}
                  </span>
                )}
                <div className="hidden md:flex items-center gap-1 shrink-0 max-w-[200px] overflow-hidden">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-2xs text-[var(--text-tertiary)] truncate"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  className={`text-[var(--text-tertiary)] text-sm shrink-0 transition-transform duration-200 ${
                    isExpanded ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="pb-6 pl-14 pr-4 space-y-4">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    {project.description}
                  </p>

                  {project.longDescription &&
                    project.longDescription.length > 0 && (
                      <ul className="space-y-1.5 mt-1">
                        {project.longDescription.map((line, i) => (
                          <li
                            key={i}
                            className="text-sm text-[var(--text-secondary)] leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-px before:bg-[var(--text-tertiary)]"
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    )}

                  {project.metrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                        className="px-2 py-0.5 text-2xs font-mono text-[var(--text-tertiary)] border border-[var(--border)] rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xs text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-150"
                      >
                        Source &#8599;
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-2xs text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-150"
                      >
                        Live &#8599;
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {filtered.length === 0 && (
          <p className="text-[var(--text-tertiary)] text-sm py-12 text-center">
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
