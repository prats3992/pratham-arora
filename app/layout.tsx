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
    template: "%s - Pratham Arora",
  },
  description:
    "Pratham Arora - researcher and engineer studying human-AI interaction under pressure, failure mode characterization in vision-language models, and self-tested tools.",
  keywords: [
    "Pratham Arora",
    "Human-AI Interaction",
    "Vision-Language Models",
    "Physical Reasoning",
    "LLM Agents",
    "Virtual Reality",
    "VLM Benchmarking",
    "Plaksha University",
    "RAG Architecture",
    "FastAPI",
    "Next.js",
  ],
  authors: [{ name: "Pratham Arora", url: "https://pratham-arora.vercel.app" }],
  creator: "Pratham Arora",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pratham-arora.vercel.app/",
    title: "Pratham Arora - Research Notebook & Portfolio",
    description:
      "Studying human-AI interaction under wait and trust pressure, failure mode characterization in vision-language models, and self-tested tools.",
    siteName: "Pratham Arora",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratham Arora - Research Notebook & Portfolio",
    description:
      "Studying human-AI interaction under wait and trust pressure, failure mode characterization in vision-language models, and self-tested tools.",
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
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const globalJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Pratham Arora",
    url: "https://pratham-arora.vercel.app",
    jobTitle: "Computer Science & AI Researcher",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Plaksha University",
    },
    sameAs: [
      "https://github.com/prats3992",
      "https://www.linkedin.com/in/pratham3992arora",
    ],
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");}else if(t==="light"){document.documentElement.classList.remove("dark");}else{document.documentElement.classList.add("dark");}}catch(_){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <SiteNav />
        <main className="max-w-content mx-auto px-4 sm:px-6 md:px-12 pt-20 sm:pt-24 pb-20">
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
