"use client"

import Link from "next/link"
import { ArrowLeft, ExternalLink, Github, Calendar, Loader2, Sparkles, ArrowUpRight } from "lucide-react"
import { useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue } from "firebase/database"
import { BentoGrid } from "@/components/bento/bento-grid"
import { BentoItem } from "@/components/bento/bento-item"

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
            <BentoItem colSpan={4} className="col-span-2 bg-gradient-to-r from-indigo-900/20 to-purple-900/20 !border-indigo-500/20 flex flex-nowrap items-center justify-between gap-8 p-8 min-h-[150px]">
                <div className="hidden md:block">
                     <h1 className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                        All Projects
                    </h1>
                     <p className="text-slate-400 mt-2">A complete archive of digital explorations.</p>
                </div>
                <div className="flex gap-8 mx-auto md:mx-0">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-lime-400 font-serif">{projects.length}</div>
                        <div className="text-xs uppercase tracking-widest text-slate-500">Total</div>
                    </div>
                     <div className="text-center">
                        <div className="text-3xl font-bold text-pink-500 font-serif">{projects.filter(p => p.featured).length}</div>
                        <div className="text-xs uppercase tracking-widest text-slate-500">Featured</div>
                    </div>
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

function ProjectCard({
  project,
}: {
  project: Project
}) {
  return (
    <BentoItem
      colSpan={project.featured ? 2 : 1}
      id={project.id}
      className={`flex flex-col justify-between group h-full ${project.featured ? 'bg-slate-900/80 border-lime-500/30' : ''}`}
    >
      <div>
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${project.featured ? 'bg-lime-400 text-slate-900' : 'bg-slate-800 text-slate-400'}`}>
                    {project.status.replace(" Quest", "")}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(project.date).getFullYear()}
                </span>
            </div>
            {project.featured && <Sparkles className="w-4 h-4 text-lime-400 animate-pulse" />}
        </div>

        <h3 className="text-xl font-serif font-bold text-slate-100 mb-2 group-hover:text-lime-400 transition-colors">
            {project.title}
        </h3>
        
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3 group-data-[expanded=true]:line-clamp-none mb-4">
            {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.slice(0, 4).map((tag) => (
            <span
                key={tag}
                className="px-2 py-0.5 text-[10px] rounded bg-white/5 text-slate-400 border border-white/5"
            >
                {tag}
            </span>
            ))}
        </div>
      </div>

      <div className="flex gap-2 relative z-20">
        <a
          href={project.githubUrl}
          target="_blank"
          className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white py-2 rounded-lg text-xs font-bold transition-all border border-white/5"
        >
          <Github className="w-3 h-3" />
          Code
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            className="flex-1 flex items-center justify-center gap-2 bg-lime-400/10 hover:bg-lime-400/20 text-lime-400 hover:text-lime-300 py-2 rounded-lg text-xs font-bold transition-all border border-lime-400/20"
          >
            <ExternalLink className="w-3 h-3" />
            Live
          </a>
        )}
      </div>
    </BentoItem>
  )
}
