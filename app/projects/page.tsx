"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar } from "lucide-react"
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const projectsRef = ref(database, "projects")
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const projectsList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }))
        setProjects(projectsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
      } else {
        // Set default projects if none exist
        setProjects(defaultProjects)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const defaultProjects: Project[] = [
    {
      id: "1",
      title: "AI Pathfinding Visualizer",
      description:
        "An interactive web application that demonstrates various pathfinding algorithms including A*, Dijkstra's, and BFS. Features real-time visualization, customizable grid obstacles, and performance metrics comparison.",
      tags: ["React", "TypeScript", "Canvas API", "Algorithms"],
      status: "Featured Quest",
      date: "2024-12-01",
      githubUrl: "https://github.com",
      liveUrl: "https://pathfinding-demo.com",
      featured: true,
    },
    {
      id: "2",
      title: "Sustainable Smart Home API",
      description:
        "A comprehensive backend system for monitoring and optimizing home energy usage. Includes IoT device integration, real-time data processing, and machine learning predictions for energy efficiency.",
      tags: ["Node.js", "Express", "MongoDB", "IoT", "Machine Learning"],
      status: "Major Quest",
      date: "2024-11-15",
      githubUrl: "https://github.com",
      featured: true,
    },
    {
      id: "3",
      title: "Campus Event Discovery Platform",
      description:
        "A full-stack web application helping students discover and organize campus events. Features user authentication, event creation, RSVP system, and real-time notifications.",
      tags: ["Next.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
      status: "Collaborative Quest",
      date: "2024-10-20",
      githubUrl: "https://github.com",
      liveUrl: "https://campus-events.com",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f3ee] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a6e73]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f3ee] animate-in fade-in duration-700">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <Link
          href="/"
          className="inline-flex items-center text-[#1a6e73] hover:text-[#c17f16] transition-colors duration-300 mb-8 group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Adventure Hub
        </Link>

        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-16 animate-in slide-in-from-bottom duration-700 delay-200">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#1a6e73] font-display">Quest Completions</h1>
            <p className="text-xl text-[#5e4b56] font-body">
              A collection of digital adventures I've embarked upon and conquered
            </p>
          </header>

          <div className="grid gap-8 mb-12">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} delay={`delay-${300 + index * 100}`} />
            ))}
          </div>

          <div className="text-center animate-in slide-in-from-bottom duration-700 delay-800">
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#e0d9c5] inline-block">
              <h2 className="text-2xl font-bold mb-4 text-[#1a6e73] font-display">Quest Statistics</h2>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold text-[#c17f16] font-display">{projects.length}+</div>
                  <div className="text-[#5e4b56] font-body">Projects Completed</div>
                </div>
                <div className="hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold text-[#c17f16] font-display">
                    {[...new Set(projects.flatMap((p) => p.tags))].length}
                  </div>
                  <div className="text-[#5e4b56] font-body">Technologies Used</div>
                </div>
                <div className="hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold text-[#c17f16] font-display">2</div>
                  <div className="text-[#5e4b56] font-body">Years of Adventure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  delay,
}: {
  project: Project
  delay: string
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 md:p-8 border-2 border-[#e0d9c5] hover:shadow-xl hover:scale-[1.01] transition-all duration-300 animate-in slide-in-from-bottom duration-700 ${delay}`}
    >
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
        <div className="flex-1 mb-4 lg:mb-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
            <h3 className="text-xl md:text-2xl font-bold text-[#1a6e73] font-display">{project.title}</h3>
            <span className="bg-[#c17f16] text-white px-3 py-1 rounded-full text-sm font-body w-fit">
              {project.status}
            </span>
          </div>
          <div className="flex items-center text-[#5e4b56] mb-4 font-body">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(project.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-[#5e4b56] mb-6 font-body leading-relaxed">{project.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-[#f5f3ee] text-[#5e4b56] px-3 py-1 rounded-full text-sm font-body hover:bg-[#e0d9c5] transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action Buttons - Improved Mobile Layout */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={project.githubUrl}
          className="flex items-center justify-center gap-2 bg-[#1a6e73] text-white px-4 py-3 rounded-lg hover:bg-[#c17f16] transition-colors duration-300 font-body font-medium"
        >
          <Github className="h-4 w-4" />
          View Code
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            className="flex items-center justify-center gap-2 bg-[#c17f16] text-white px-4 py-3 rounded-lg hover:bg-[#5e4b56] transition-colors duration-300 font-body font-medium"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        )}
      </div>
    </div>
  )
}
