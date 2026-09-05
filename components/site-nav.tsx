"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { label: "Investigations", href: "/investigations" },
  { label: "Notes", href: "/notes" },
  { label: "About", href: "/about" },
]

const externalLinks = [
  { label: "GitHub", href: "https://github.com/prats3992" },
  { label: "Email", href: "mailto:pratham3992@gmail.com" },
]

export function SiteNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Automatically close mobile menu when navigating to another route
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false)
    }
    if (mobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [mobileMenuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)]/90 backdrop-blur-md">
      <nav className="max-w-content mx-auto px-4 sm:px-6 md:px-12 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading font-bold text-base text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-150"
          onClick={() => setMobileMenuOpen(false)}
        >
          Pratham Arora
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-caption font-medium transition-colors duration-150",
                pathname === item.href
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
            >
              {item.label}
            </Link>
          ))}
          <span className="w-px h-3.5 bg-[var(--border)]" />
          {externalLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="text-caption font-medium text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-150"
            >
              {item.label}
              {!item.href.startsWith("mailto") && (
                <span className="inline-block ml-0.5 text-micro align-top">↗</span>
              )}
            </a>
          ))}
          <span className="w-px h-3.5 bg-[var(--border)]" />
          <ThemeToggle />
        </div>

        {/* Mobile Nav Trigger & Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="w-8 h-8 rounded border border-[var(--border)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-tertiary)] bg-[var(--bg-elevated)]/60 transition-colors"
          >
            {mobileMenuOpen ? (
              /* Close Icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              /* Hamburger Icon */
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Collapsible Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="md:hidden border-t border-[var(--border)] bg-[var(--bg-primary)]/98 backdrop-blur-md px-4 py-4 space-y-4 animate-page-enter"
        >
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "px-3 py-2.5 rounded text-base font-medium transition-colors flex items-center justify-between",
                    isActive
                      ? "bg-[var(--bg-elevated)] text-[var(--accent)] font-semibold"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]/50"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="border-t border-[var(--border)] pt-3 flex items-center gap-4 px-3 font-mono text-caption">
            {externalLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.href.startsWith("mailto") ? undefined : "_blank"}
                rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors py-1 flex items-center gap-1"
              >
                <span>{item.label}</span>
                {!item.href.startsWith("mailto") && (
                  <span className="text-micro">↗</span>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
