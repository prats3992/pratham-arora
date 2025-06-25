"use client"

import Link from "next/link"
import { ChevronRight, Github, Linkedin, Mail, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue } from "firebase/database"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  status: string
  date: string
  githubUrl: string
  liveUrl?: string
  featured?: boolean
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([])

  useEffect(() => {
    const projectsRef = ref(database, "projects")
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const projectsList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
        // Get featured projects, limit to 2 for home page
        const featured = projectsList
          .filter(p => p.featured)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 2)
        setFeaturedProjects(featured)
      }
    })

    return () => unsubscribe()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f3ee]">
      <header className="py-6 px-4 md:px-6 border-b border-[#e0d9c5] sticky top-0 bg-[#f5f3ee] z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-[#1a6e73] transition-colors hover:text-[#c17f16]">
            Pratham Arora
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/about" className="text-[#5e4b56] hover:text-[#c17f16] transition-colors duration-300">
              About
            </Link>
            <Link href="/projects" className="text-[#5e4b56] hover:text-[#c17f16] transition-colors duration-300">
              Projects
            </Link>
            <Link href="/contact" className="text-[#5e4b56] hover:text-[#c17f16] transition-colors duration-300">
              Contact
            </Link>
            <Link href="/resume" className="text-[#5e4b56] hover:text-[#c17f16] transition-colors duration-300">
              Resume
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#1a6e73] hover:text-[#c17f16] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-[#e0d9c5] pt-4 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col space-y-3">
              <Link
                href="/about"
                className="text-[#5e4b56] hover:text-[#c17f16] transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/projects"
                className="text-[#5e4b56] hover:text-[#c17f16] transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/contact"
                className="text-[#5e4b56] hover:text-[#c17f16] transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/resume"
                className="text-[#5e4b56] hover:text-[#c17f16] transition-colors duration-300 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Resume
              </Link>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1 container mx-auto px-4 md:px-6 py-12">
        <section className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#1a6e73] font-display">
            Choose Your Adventure in Tech
          </h1>
          <p className="text-xl md:text-2xl text-[#5e4b56] mb-8 font-body">
            Welcome to my interactive portfolio! I'm a CS student passionate about building the future through code.
            Where would you like to begin your journey?
          </p>
        </section>

        <section className="max-w-4xl mx-auto mb-20 bg-white rounded-xl shadow-lg p-8 border-2 border-[#e0d9c5]">
          <div className="prose max-w-none mb-8 text-[#5e4b56] font-body">
            <p className="text-lg">
              You stand at a crossroads in the vast landscape of technology. Your choices will reveal different aspects
              of my journey, skills, and projects.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <AdventureChoice
              title="Explore Technical Projects"
              description="Venture into the realm of code and see the applications I've built"
              href="/projects"
              color="bg-[#1a6e73]"
              className="md:col-span-2"
            />
            <AdventureChoice
              title="Meet the Developer"
              description="Learn about the person behind the portfolio"
              href="/about"
              color="bg-[#5e4b56]"
            />
            <AdventureChoice
              title="Join Forces"
              description="Explore opportunities for collaboration and employment"
              href="/contact"
              color="bg-[#c17f16]"
            />
          </div>
        </section>

        <section className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6 text-[#1a6e73] font-display">Featured Quest Completions</h2>
          {featuredProjects.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project, index) => (
                <FeaturedProject
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  tags={project.tags.slice(0, 3)} // Show only first 3 tags
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#e0d9c5]">
              <p className="text-[#5e4b56] font-body">
                Featured projects will appear here once you upload your project data to Firebase.
              </p>
              <Link 
                href="/projects" 
                className="inline-flex items-center mt-4 text-[#1a6e73] hover:text-[#c17f16] transition-colors duration-300"
              >
                View All Projects <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-[#1a6e73] text-white py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2 font-display">Pratham Arora</h3>
              <p className="text-[#e0d9c5] font-body">Crafting digital adventures since 2020</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://github.com/prats3992" className="text-white hover:text-[#c17f16] transition-colors">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/pratham3992arora/" className="text-white hover:text-[#c17f16] transition-colors">
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="mailto:pratham.arora@plaksha.edu.in" className="text-white hover:text-[#c17f16] transition-colors">
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-[#e0d9c5] text-center text-[#e0d9c5] font-body">
            <p>
              Built with passion and curiosity by Pratham Arora.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function AdventureChoice({
  title,
  description,
  href,
  color,
  className,
}: {
  title: string
  description: string
  href: string
  color: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`${color} text-white p-6 rounded-lg hover:opacity-90 transition-all transform hover:scale-[1.02] flex flex-col ${
        className || ""
      }`}
    >
      <h3 className="text-xl font-bold mb-2 font-display">{title}</h3>
      <p className="mb-4 font-body">{description}</p>
      <div className="mt-auto flex items-center justify-end">
        <span className="mr-2 text-sm">Begin this path</span>
        <ChevronRight className="h-5 w-5" />
      </div>
    </Link>
  )
}

function FeaturedProject({
  title,
  description,
  tags,
}: {
  title: string
  description: string
  tags: string[]
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-[#e0d9c5] text-left">
      <h3 className="text-xl font-bold mb-2 text-[#1a6e73] font-display">{title}</h3>
      <p className="text-[#5e4b56] mb-4 font-body">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-[#f5f3ee] text-[#5e4b56] px-3 py-1 rounded-full text-sm font-body">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
