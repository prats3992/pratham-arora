"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, User, Briefcase, FileText, Mail } from "lucide-react"

export function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "About", href: "/about", icon: User },
    { name: "Work", href: "/projects", icon: Briefcase },
    { name: "CV", href: "/resume", icon: FileText },
    { name: "Contact", href: "/contact", icon: Mail },
  ]

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden animate-in slide-in-from-bottom duration-500">
      <nav className="bg-slate-900/90 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl flex items-center justify-between px-6 py-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center gap-1 transition-all ${
                isActive ? "text-lime-400 scale-110" : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "fill-lime-400/20" : ""}`} />
              <span className="text-[10px] font-medium tracking-wide">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
