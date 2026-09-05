"use client"

import { useState } from "react"
import Link from "next/link"
import { timelineMilestones } from "@/content/timeline"

export function FrictionTimeline() {
  const [selectedId, setSelectedId] = useState<string>(timelineMilestones[0].id)

  const activeMilestone =
    timelineMilestones.find((m) => m.id === selectedId) || timelineMilestones[0]

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="space-y-2">
        <h2 className="font-heading font-bold text-heading-md md:text-heading-lg text-[var(--text-primary)]">
          Friction Noticed, Tool Built
        </h2>
        <p className="text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          Before working on frontier models, my work always started with direct friction:
          an interface failing court-side, a manual slide bottleneck, or an elective schedule collision.
          Now that AI sits inside what I build, I study what that presence does to user trust and skill.
        </p>
      </div>

      {/* Milestone Scale / Selector */}
      <div className="flex overflow-x-auto pb-3 sm:pb-4 sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-2 border-b border-[var(--border)]">
        {timelineMilestones.map((item, idx) => {
          const isSelected = item.id === selectedId
          return (
            <button
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`p-3 rounded text-left transition-colors relative min-w-[140px] sm:min-w-0 shrink-0 sm:shrink ${
                isSelected
                  ? "bg-[var(--bg-elevated)] border-b-2 border-b-[var(--accent)] text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/50"
              }`}
            >
              <div className="flex items-center justify-between font-mono text-data mb-1">
                <span className={isSelected ? "text-[var(--accent)] font-medium" : "text-[var(--text-tertiary)]"}>
                  {item.year}
                </span>
                <span className="text-[var(--text-tertiary)]">
                  0{idx + 1}
                </span>
              </div>
              <div className="font-sans font-medium text-caption line-clamp-2 leading-snug">
                {item.title}
              </div>
            </button>
          )
        })}
      </div>

      {/* Active Milestone Detail */}
      <div className="border border-[var(--border)] rounded p-4 sm:p-6 md:p-8 bg-[var(--bg-elevated)] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-[var(--border)] pb-4">
          <div>
            <div className="font-mono text-data text-[var(--text-tertiary)]">
              {activeMilestone.year} · {activeMilestone.domain}
            </div>
            <h3 className="font-heading font-bold text-heading-sm md:text-heading-md text-[var(--text-primary)] mt-1">
              {activeMilestone.title}
            </h3>
            <p className="text-caption text-[var(--text-tertiary)] mt-0.5">
              {activeMilestone.context}
            </p>
          </div>
          {activeMilestone.link && (
            <Link
              href={activeMilestone.link}
              className="inline-flex items-center text-caption font-medium text-[var(--accent)] hover:underline shrink-0"
            >
              {activeMilestone.linkText ? activeMilestone.linkText.replace(/\s*→\s*$/, "") : "Read Investigation"}
            </Link>
          )}
        </div>

        {/* 3 Sub-sections: Rule-divided cleanly on both mobile and desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y divide-[var(--border)] md:divide-y-0 md:divide-x md:divide-[var(--border)]">
          {/* Friction Noticed */}
          <div className="space-y-2 pb-4 md:pb-0 md:pr-6">
            <h4 className="text-caption font-medium text-[var(--text-primary)]">
              Friction Noticed
            </h4>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              {activeMilestone.friction}
            </p>
          </div>

          {/* Tool Built */}
          <div className="space-y-2 py-4 md:py-0 md:px-6">
            <h4 className="text-caption font-medium text-[var(--text-primary)]">
              Tool Built
            </h4>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              {activeMilestone.toolBuilt}
            </p>
          </div>

          {/* What Was Learned */}
          <div className="space-y-2 pt-4 md:pt-0 md:pl-6">
            <h4 className="text-caption font-medium text-[var(--text-primary)]">
              What Was Learned
            </h4>
            <p className="text-base text-[var(--text-secondary)] leading-relaxed">
              {activeMilestone.takeaway}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[var(--border)]">
          {activeMilestone.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-data font-mono text-[var(--text-tertiary)] border border-[var(--border)] rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Semantic Crawlable Fallback (Always Present) */}
      <div className="sr-only">
        <h3>Complete Friction Timeline Record</h3>
        {timelineMilestones.map((m) => (
          <article key={m.id}>
            <h4>{m.title} ({m.year})</h4>
            <p><strong>Friction:</strong> {m.friction}</p>
            <p><strong>Tool Built:</strong> {m.toolBuilt}</p>
            <p><strong>Takeaway:</strong> {m.takeaway}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
