import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google"
import { SiteNav } from "@/components/site-nav"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Pratham Arora",
    template: "%s — Pratham Arora",
  },
  description:
    "Final-year CS & AI student at Plaksha University. I build production ML systems — RAG pipelines, LLM agents, applied NLP. Researching where frontier VLMs fail at physical-world reasoning. Available for full-time roles.",
  keywords: [
    "Pratham Arora",
    "AI Engineer",
    "ML Engineer",
    "Software Engineer",
    "RAG Pipeline",
    "LLM Agent",
    "Applied NLP",
    "VLM Research",
    "Plaksha University",
    "Full Stack Developer",
    "FastAPI",
    "Next.js",
  ],
  authors: [{ name: "Pratham Arora", url: "https://pratham-arora.vercel.app" }],
  creator: "Pratham Arora",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pratham-arora.vercel.app/",
    title: "Pratham Arora — AI & Software Engineer",
    description:
      "Final-year CS & AI student at Plaksha. Builds production ML systems — RAG pipelines, LLM agents, applied NLP. 85% cost reduction at Cotality. Paper under review at MIT's Presence journal. Available 2026.",
    siteName: "Pratham Arora",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratham Arora — AI & Software Engineer",
    description:
      "Final-year CS & AI student at Plaksha. Builds production ML systems — RAG pipelines, LLM agents, applied NLP. 85% cost reduction at Cotality. Paper under review at MIT's Presence journal. Available 2026.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <body className="font-sans antialiased">
        <SiteNav />
        <main className="max-w-content mx-auto px-6 md:px-12 pt-24 pb-20">
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
