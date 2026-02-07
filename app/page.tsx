import { BentoGrid } from "@/components/bento/bento-grid"
import { BentoItem } from "@/components/bento/bento-item"
import { RandomProjectGrid } from "@/components/bento/random-project-grid"
import resumeData from "@/resume-data.json"
import { Github, Linkedin, Mail, MapPin, ArrowUpRight, Code2 } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const featuredProject = resumeData.projects.find((p) => p.featured) || resumeData.projects[0]
  const otherProjects = resumeData.projects.filter((p) => p.id !== featuredProject.id)

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-32 md:pb-20 pt-10 px-4 selection:bg-lime-400 selection:text-slate-900">
      <BentoGrid className="grid-flow-dense">
        {/* Identity Tile (2x2) */}
        <BentoItem
          colSpan={2}
          rowSpan={2}
          className="relative flex flex-col justify-between p-8 bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/20"
        >
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-white/20 bg-slate-800">
                {/* Avatar Placeholder */}
                <div className="flex h-full w-full items-center justify-center bg-indigo-500 text-2xl font-bold text-white">
                  PA
                </div>
              </div>
              <div className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-medium text-lime-400 border border-lime-400/20">
                Open to Work
              </div>
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-2">
                {resumeData.personalInfo.name}
              </h1>
              <p className="text-lg text-slate-400 font-light">
                {resumeData.personalInfo.title}
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-400/80 leading-relaxed max-w-md mt-8 mb-4">
            I craft kinetic digital experiences using modern web technologies. 
            Currently building at the intersection of AI, Design, and Engineering.
          </p>
          
           {/* Navigation Links - Hidden on Mobile since we have the navbar */}
           <div className="hidden md:flex gap-4 relative z-30">
               <Link href="/about" className="text-xs font-bold uppercase tracking-wider text-lime-400 hover:text-lime-300 transition-colors flex items-center gap-1">
                 Bio <ArrowUpRight className="w-3 h-3" />
               </Link>
               <Link href="/projects" className="text-xs font-bold uppercase tracking-wider text-lime-400 hover:text-lime-300 transition-colors flex items-center gap-1">
                 Projects <ArrowUpRight className="w-3 h-3" />
               </Link>
               <Link href="/resume" className="text-xs font-bold uppercase tracking-wider text-lime-400 hover:text-lime-300 transition-colors flex items-center gap-1">
                 Resume <ArrowUpRight className="w-3 h-3" />
               </Link>
          </div>
        </BentoItem>

        {/* Featured Project (2x1) */}
        <BentoItem
          colSpan={2}
          id={featuredProject.id}
          className="group/project relative min-h-[220px] flex flex-col justify-end p-6 overflow-hidden bg-slate-900"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent z-10" />
           {/* Abstract Background for Project */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover/project:scale-105 transition-transform duration-700 ease-out" />

          <div className="relative z-20">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-lime-400 mb-1 block">FEATURED QUEST</span>
                <Link href={featuredProject.githubUrl} target="_blank" className="text-slate-400 hover:text-white transition-colors">
                    <ArrowUpRight className="w-5 h-5" />
                </Link>
            </div>
            <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover/project:text-lime-300 transition-colors">
              {featuredProject.title}
            </h3>
            <p className="text-sm text-slate-300/80 line-clamp-2 group-data-[expanded=true]:line-clamp-none mb-4 max-w-lg">
              {featuredProject.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {featuredProject.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-slate-300 backdrop-blur-sm border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </BentoItem>

        {/* Map / Location (1x1) */}
        <BentoItem className="flex flex-col items-center justify-center gap-2 bg-emerald-950/20 border-emerald-500/10 hover:border-emerald-500/30">
          <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-400">
            <MapPin className="h-6 w-6" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-bold text-emerald-100">Punjab</h3>
            <p className="text-xs text-emerald-500/80 uppercase tracking-widest">Plaksha Univ.</p>
          </div>
        </BentoItem>

        {/* Socials (1x1) */}
        <BentoItem className="bg-slate-900/40 p-0 flex items-center justify-center">
             <div className="grid grid-cols-2 grid-rows-2 w-full h-full">
                <Link href={resumeData.personalInfo.github} target="_blank" className="flex items-center justify-center hover:bg-white/5 transition-colors group">
                    <Github className="w-6 h-6 text-slate-400 group-hover:text-white" />
                </Link>
                <Link href={resumeData.personalInfo.linkedin} target="_blank" className="flex items-center justify-center hover:bg-[#0077b5]/10 transition-colors group">
                    <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-[#0077b5]" />
                </Link>
                <Link href={`mailto:${resumeData.personalInfo.email}`} className="flex items-center justify-center hover:bg-orange-500/10 transition-colors group">
                    <Mail className="w-6 h-6 text-slate-400 group-hover:text-orange-400" />
                </Link>
                <Link href="/contact" className="flex items-center justify-center hover:bg-lime-500/10 transition-colors group">
                    <ArrowUpRight className="w-6 h-6 text-slate-400 group-hover:text-lime-400" />
                </Link>
             </div>
        </BentoItem>

         {/* Tech Stack (1x1) */}
         <BentoItem className="flex flex-col p-5 bg-slate-900/30">
            <div className="flex items-center gap-2 mb-4 text-slate-400">
                <Code2 className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">Stack</span>
            </div>
            <div className="flex flex-wrap content-start gap-1.5 h-full overflow-hidden mask-linear-gradient">
                {resumeData.skills.programmingLanguages.concat(resumeData.skills.frameworks).slice(0, 10).map((skill) => (
                    <span key={skill} className="px-2 py-1 text-[10px] bg-white/5 border border-white/5 rounded text-slate-300">
                        {skill}
                    </span>
                 ))}
            </div>
         </BentoItem>

        {/* Other Projects - Randomized Grid */}
        <RandomProjectGrid projects={otherProjects} />
      </BentoGrid>
    </main>
  )
}
