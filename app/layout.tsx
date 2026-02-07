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
  title: {
    default: "Pratham Arora | AI Engineer & Full Stack Developer",
    template: "%s | Pratham Arora"
  },
  description: "Portfolio of Pratham Arora, a Computer Science student at Plaksha University specializing in AI, Machine Learning, and Full Stack Development. Building experiential web applications and intelligent systems.",
  keywords: [
    "Pratham Arora", 
    "Portfolio", 
    "Software Engineer", 
    "AI Engineer", 
    "Web Developer", 
    "React", 
    "Next.js", 
    "Machine Learning", 
    "Plaksha University",
    "Frontend Developer",
    "Full Stack Developer"
  ],
  authors: [{ name: "Pratham Arora", url: "https://pratham-arora.vercel.app" }],
  creator: "Pratham Arora",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pratham-arora.vercel.app/",
    title: "Pratham Arora | AI Engineer & Full Stack Developer",
    description: "Kinetic digital experiences at the intersection of Design and Artificial Intelligence.",
    siteName: "Pratham Arora Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pratham Arora Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pratham Arora | AI Engineer & Full Stack Developer",
    description: "Kinetic digital experiences at the intersection of Design and Artificial Intelligence.",
    images: ["/og-image.png"],
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
    icon: "/favicon.ico",
  },
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
