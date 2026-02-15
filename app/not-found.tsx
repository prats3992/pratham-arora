import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <p className="font-mono text-6xl font-bold text-[var(--text-tertiary)] mb-4">
        404
      </p>
      <p className="text-[var(--text-secondary)] mb-8">
        This page does not exist.
      </p>
      <Link
        href="/"
        className="text-sm text-[var(--accent)] hover:underline transition-colors duration-150"
      >
        Return home
      </Link>
    </div>
  )
}
