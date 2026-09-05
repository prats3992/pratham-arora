interface MetricCardProps {
  label: string
  value: string
  context?: string
}

export function MetricCard({ label, value, context }: MetricCardProps) {
  return (
    <div className="border border-[var(--border)] rounded p-4 bg-[var(--bg-elevated)]">
      <p className="font-mono font-bold text-heading-sm text-[var(--accent)] leading-none mb-1.5">
        {value}
      </p>
      <p className="text-caption font-medium text-[var(--text-primary)] leading-tight">
        {label}
      </p>
      {context && (
        <p className="text-data text-[var(--text-tertiary)] mt-1">{context}</p>
      )}
    </div>
  )
}
