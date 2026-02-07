"use client"

import { BentoItem } from "@/components/bento/bento-item"
import { Sparkles, Github, ExternalLink } from "lucide-react"

export interface Project {
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

export function ProjectCard({
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
