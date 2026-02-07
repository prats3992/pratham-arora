"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft, Code, Coffee, Gamepad2, Heart, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-32 md:pb-20 pt-10 px-4 selection:bg-lime-400 selection:text-slate-900">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="hidden md:inline-flex items-center text-lime-400 hover:text-lime-300 transition-colors mb-12 group text-sm font-bold uppercase tracking-wider"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Return to Grid
        </Link>

        {/* Header Section */}
        <header className="mb-20">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-6">
            Meet the Maker
          </h1>
          <p className="text-xl text-slate-400 font-light max-w-2xl leading-relaxed">
            The story behind the code. A journey through logic, creativity, and the relentless pursuit of building something that matters.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid gap-8">
          
          {/* Journey Section */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <h2 className="text-2xl font-serif font-bold text-slate-100 mb-6 flex items-center gap-3">
                <Zap className="text-lime-400" />
                The Journey
            </h2>
            <div className="prose prose-invert prose-lg text-slate-400 leading-relaxed max-w-none">
              <p className="mb-4">
                Hi there! I am Pratham, a passionate software engineer with a wide range of interests and hobbies. In my free time, you can find me reading a good book, playing basketball, or working on a new coding project. 
              </p>
              <p>
                 I am always looking for new challenges and opportunities to learn and grow. I also love teaching coding to beginners and helping them discover the joys of programming. My mission is to bridge the gap between complex AI systems and intuitive human experiences.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Skills Section */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
              <h2 className="text-xl font-serif font-bold text-slate-100 mb-6 flex items-center gap-3">
                  <Code className="text-pink-500" />
                  Technical Arsena
              </h2>
              <div className="space-y-6">
                <SkillCategory
                  title="Languages"
                  skills={["JavaScript", "TypeScript", "Python", "C++", "C#", "SQL"]}
                />
                <SkillCategory
                  title="Frameworks"
                  skills={["Next.js", "React", "Tailwind", "Node.js", "FastAPI"]}
                />
                 <SkillCategory
                  title="Tools"
                  skills={["Git", "Docker", "Firebase", "Linux", "Figma"]}
                />
              </div>
            </div>

            {/* Interest Section */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-serif font-bold text-slate-100 mb-6 flex items-center gap-3">
                    <Heart className="text-red-500" />
                    Passions
                </h2>
                <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <Coffee className="w-6 h-6 text-amber-500 mt-1" />
                        <div>
                            <h3 className="font-bold text-slate-200">Mentorship</h3>
                            <p className="text-sm text-slate-500">Helping others debug their code & careers.</p>
                        </div>
                    </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Current Status</p>
                <div className="flex items-center gap-2 text-lime-400 font-bold">
                    <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
                    Open to Opportunities
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function SkillCategory({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-2.5 py-1 text-[11px] rounded bg-white/5 text-slate-300 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
