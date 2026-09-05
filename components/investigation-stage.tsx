import React from "react"

interface InvestigationStageProps {
  label: "Question" | "Approach" | "Experiment" | "Observation" | "Interpretation" | "Limitation" | "Next Question"
  children: React.ReactNode
  accent?: boolean
}

const STAGE_NUMBERS: Record<string, string> = {
  Question: "01",
  Approach: "02",
  Experiment: "03",
  Observation: "04",
  Interpretation: "05",
  Limitation: "06",
  "Next Question": "07",
}

export function InvestigationStage({
  label,
  children,
  accent,
}: InvestigationStageProps) {
  const num = STAGE_NUMBERS[label] || "--"

  return (
    <div
      className={`border-l pl-5 md:pl-6 py-1 space-y-2 transition-colors ${
        accent
          ? "border-l-[var(--accent)] bg-[var(--accent-muted)]/30 p-4 -ml-4 rounded-r"
          : "border-l-[var(--border)]"
      }`}
    >
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-data text-[var(--text-tertiary)] font-medium">
          {num}
        </span>
        <span className="text-caption font-medium text-[var(--text-primary)]">
          {label}
        </span>
      </div>
      <div className="text-base text-[var(--text-secondary)] leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  )
}
