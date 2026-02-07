"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, Loader2, Sparkles, ArrowUpRight } from "lucide-react"
import { useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue } from "firebase/database"
import { BentoGrid } from "@/components/bento/bento-grid"
import { BentoItem } from "@/components/bento/bento-item"
import { ProjectCard } from "@/components/project-card"

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
  const [visibleCount, setVisibleCount] = useState(6)

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
        setProjects([])
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])
  
  const handleShowMore = () => {
      setVisibleCount(prev => prev + 6)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-lime-400 animate-spin mx-auto mb-4" />
          <p className="text-slate-400 font-sans animate-pulse">Initializing Grid Protocol...</p>
        </div>
      </div>
    )
  }

  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
        <Link
            href="/"
            className="inline-flex items-center text-lime-400 hover:text-lime-300 transition-colors mb-8 group"
        >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Return to Grid
        </Link>
        <div className="flex flex-col items-center justify-center h-[60vh] text-center border border-white/10 bg-white/5 rounded-3xl backdrop-blur-sm">
            <Sparkles className="w-12 h-12 text-slate-500 mb-4" />
            <h1 className="text-3xl font-serif font-bold text-slate-200 mb-2">No Quests Found</h1>
            <p className="text-slate-400 max-w-md">The archives appear to be empty. Connect to the database to sync project data.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-32 md:pb-20 pt-10 px-4 selection:bg-lime-400 selection:text-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 px-4">
             <Link
                href="/"
                className="hidden md:inline-flex items-center text-lime-400 hover:text-lime-300 transition-colors group text-sm font-bold uppercase tracking-wider"
            >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Return to Grid
            </Link>
            <h1 className="text-3xl md:text-2xl font-serif font-bold text-white w-full text-center md:w-auto">Projects</h1>
        </div>

        <BentoGrid className="grid-cols-2 md:grid-cols-4 auto-rows-[minmax(250px,auto)]">
            {/* Header / Stats Tile */}
            <BentoItem colSpan={4} className="col-span-2 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 !border-indigo-500/20 flex flex-nowrap items-center justify-center p-8 min-h-[150px]">
                <div className="text-center md:text-left w-full">
                     <h1 className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                        All Projects
                    </h1>
                     <p className="text-slate-400 mt-2">A complete archive of digital explorations.</p>
                </div>
            </BentoItem>

            {projects.slice(0, visibleCount).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            
            {visibleCount < projects.length && (
                 <BentoItem colSpan={4} className="col-span-2 flex items-center justify-center p-8 border-dashed border-slate-700 bg-transparent hover:bg-slate-900/50 cursor-pointer">
                    <button 
                        onClick={handleShowMore}
                        className="text-lg font-bold text-lime-400 uppercase tracking-widest hover:scale-110 transition-transform flex items-center gap-2"
                    >
                        Load More Projects <ArrowUpRight className="w-5 h-5" />
                    </button>
                </BentoItem>
            )}
        </BentoGrid>
      </div>
    </div>
  )
}

