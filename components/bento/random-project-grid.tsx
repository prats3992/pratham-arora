"use client"

import { useEffect, useState } from "react"
import { BentoItem } from "./bento-item"
import { Github, ArrowUpRight } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  title: string
  description: string
  date: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
}

interface ItemSize {
  colSpan: 1 | 2
  rowSpan: 1 | 2
}

export function RandomProjectGrid({ projects }: { projects: Project[] }) {
  const [sizes, setSizes] = useState<ItemSize[]>([])
  const [mounted, setMounted] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const initialCount = isMobile ? 4 : projects.length
  
  const visibleProjects = showAll ? projects : projects.slice(0, initialCount)

  useEffect(() => {
    // Generate random sizes on client mount
    /*
      Probabilities:
      1x1: 60%
      2x1: 20%
      1x2: 10%
      2x2: 10%
    */
    const newSizes = projects.map(() => {
      const rand = Math.random()
      if (rand > 0.9) return { colSpan: 2, rowSpan: 2 } as ItemSize
      if (rand > 0.8) return { colSpan: 1, rowSpan: 2 } as ItemSize
      if (rand > 0.6) return { colSpan: 2, rowSpan: 1 } as ItemSize
      return { colSpan: 1, rowSpan: 1 } as ItemSize
    })
    setSizes(newSizes)
    setMounted(true)
  }, [projects])

  if (!mounted) {
    // Render static grid initially to prevent layout shift or empty space
    // Using simple 1x1 for all
    return (
      <>
        {projects.slice(0, 4).map((project) => (
          <ProjectTile key={project.id} project={project} colSpan={1} rowSpan={1} />
        ))}
      </>
    )
  }

  return (
    <>
      {visibleProjects.map((project, i) => (
        <ProjectTile 
            key={project.id} 
            project={project} 
            colSpan={sizes[i]?.colSpan || 1} 
            rowSpan={sizes[i]?.rowSpan || 1} 
        />
      ))}
      {!showAll && projects.length > initialCount && (
          <BentoItem colSpan={2} className="flex items-center justify-center p-4 min-h-[100px] border-dashed border-slate-700 bg-transparent hover:bg-slate-900/50">
              <button 
                onClick={() => setShowAll(true)}
                className="text-sm font-bold text-lime-400 uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2"
            >
                Show More <ArrowUpRight className="w-4 h-4" />
            </button>
          </BentoItem>
      )}
    </>
  )
}

function ProjectTile({ 
    project, 
    colSpan, 
    rowSpan 
}: { 
    project: Project, 
    colSpan: 1 | 2, 
    rowSpan: 1 | 2 
}) {
  return (
    <BentoItem 
        id={project.id} 
        colSpan={colSpan} 
        rowSpan={rowSpan}
        className="flex flex-col justify-between group h-full"
    >
      <div>
         <div className="flex justify-between items-start mb-2">
           <span className="text-[10px] uppercase text-slate-500">{project.date}</span>
           {project.githubUrl ? (
               <Github className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
           ): (
               <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-lime-500 transition-colors" />
           )}
         </div>
        <h3 className={`font-bold font-serif text-slate-200 mb-2 group-hover:text-lime-400 transition-colors ${colSpan === 2 ? 'text-2xl' : 'text-lg'}`}>
          {project.title}
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 group-data-[expanded=true]:line-clamp-none">
          {project.description}
        </p>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-1">
        {project.tags.slice(0, colSpan === 2 ? 6 : 3).map((tag) => (
          <span
            key={tag}
            className="px-1.5 py-0.5 text-[10px] rounded bg-white/5 text-slate-500 border border-white/5"
          >
            {tag}
          </span>
        ))}
      </div>
       {/* Hover Link Overlay */}
       {project.githubUrl && (
          <Link href={project.githubUrl} target="_blank" className="absolute inset-0 z-10" />
       )}
    </BentoItem>
  )
}
