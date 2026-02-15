"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { label: "Work", href: "/work" },
  { label: "Resume", href: "/resume" },
]

const externalLinks = [
  { label: "GitHub", href: "https://github.com/prats3992" },
  { label: "Email", href: "mailto:pratham3992@gmail.com" },
]

export function SiteNav() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)]/90 backdrop-blur-sm">
      <nav className="max-w-content mx-auto px-6 md:px-12 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading font-bold text-[15px] text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-150"
        >
          Pratham Arora
        </Link>

        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[13px] font-medium transition-colors duration-150",
                pathname === item.href
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              {item.label}
            </Link>
          ))}
          <span className="w-px h-4 bg-[var(--border)]" />
          {externalLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="text-[13px] font-medium text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-150"
            >
              {item.label}
              {!item.href.startsWith("mailto") && (
                <span className="inline-block ml-0.5 text-[10px] align-top">&#8599;</span>
              )}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
