import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { Calistoga, Urbanist } from "next/font/google"
import { MobileNav } from "@/components/mobile-nav"

const calistoga = Calistoga({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-calistoga",
})

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
})

export const metadata: Metadata = {
  title: "Pratham Arora | Kinetic Mosaic",
  description: "Creative Technologist & Frontend Engineer Portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${calistoga.variable} ${urbanist.variable}`}>
      <body className="font-sans antialiased bg-slate-950 text-slate-100 selection:bg-lime-400 selection:text-slate-900">
        <div className="bg-noise" />
        <ThemeProvider attribute="class" defaultTheme="dark" forceTheme="dark" disableTransitionOnChange>
          {children}
          <MobileNav />
        </ThemeProvider>
      </body>
    </html>
  )
}
