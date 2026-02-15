interface MetricCardProps {
  label: string
  value: string
  context?: string
}

export function MetricCard({ label, value, context }: MetricCardProps) {
  return (
    <div className="border border-[var(--border)] rounded-md p-4 bg-[var(--bg-elevated)]">
      <p className="font-mono font-medium text-xl text-[var(--accent)] leading-none mb-1.5">
        {value}
      </p>
      <p className="text-[13px] font-medium text-[var(--text-primary)] leading-tight">
        {label}
      </p>
      {context && (
        <p className="text-2xs text-[var(--text-tertiary)] mt-1">{context}</p>
      )}
    </div>
  )
}
