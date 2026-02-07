"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft, Download, Mail, Github, Linkedin, Briefcase, GraduationCap } from "lucide-react"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-32 md:pb-20 pt-10 px-4 selection:bg-lime-400 selection:text-slate-900">
      <div className="container mx-auto max-w-5xl">
         {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <Link
                href="/"
                className="hidden md:inline-flex items-center text-lime-400 hover:text-lime-300 transition-colors mb-4 md:mb-0 group text-sm font-bold uppercase tracking-wider"
            >
                <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Return to Grid
            </Link>
          <div className="flex flex-col gap-4 w-full md:w-auto">
              <a
                href="/temp_CV.pdf"
                download="Pratham_Arora_CV.pdf"
                className="flex items-center justify-center gap-2 bg-lime-400 text-slate-900 px-6 py-2.5 rounded-lg hover:bg-lime-300 transition-colors font-bold text-sm shadow-[0_0_20px_rgba(163,230,53,0.3)] hover:shadow-[0_0_30px_rgba(163,230,53,0.5)] w-full md:w-auto"
              >
                <Download className="h-4 w-4" />
                Generic CV
              </a>
              <div className="flex gap-4 w-full md:w-auto">
                 <a
                    href="/sde.pdf"
                    download="Pratham_Arora_SDE_Resume.pdf"
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-800 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-lg hover:bg-slate-700 transition-colors font-bold text-sm hover:text-white"
                  >
                    <Download className="h-4 w-4" />
                    SDE 
                  </a>
                  <a
                    href="/aiml.pdf"
                    download="Pratham_Arora_AIML_Resume.pdf"
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-800 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-lg hover:bg-slate-700 transition-colors font-bold text-sm hover:text-white"
                  >
                    <Download className="h-4 w-4" />
                    AI/ML
                  </a>
              </div>
          </div>
        </div>

        <div className="space-y-12">
           {/* Header Info */}
          <header className="text-center md:text-left border-b border-white/10 pb-12">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4">
                Pratham Arora
            </h1>
            <p className="text-xl text-slate-400 font-light mb-8">Computer Science & AI Student • Creative Technologist</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-slate-400">
              <a href="mailto:pratham3992@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-lime-400" />
                pratham3992@gmail.com
              </a>
              <a href="https://github.com/prats3992" target="_blank" className="flex items-center gap-2 hover:text-white transition-colors">
                <Github className="h-4 w-4 text-lime-400" />
                github.com/prats3992
              </a>
              <a href="https://linkedin.com/in/pratham3992arora" target="_blank" className="flex items-center gap-2 hover:text-white transition-colors">
                <Linkedin className="h-4 w-4 text-lime-400" />
                linkedin.com/in/pratham3992arora
              </a>
            </div>
          </header>

           {/* Experience Section */}
           <section>
            <h2 className="text-2xl font-serif font-bold text-white mb-8 flex items-center gap-3">
                <Briefcase className="text-pink-500" />
                Experience
            </h2>
            <div className="space-y-8">
                {/* Experience Item 1 */}
                <div className="group relative pl-8 border-l border-white/10 ml-3">
                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-600 group-hover:bg-lime-400 group-hover:border-lime-400 transition-colors" />
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-slate-200">AI Intern</h3>
                        <span className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">June 2025 - July 2025</span>
                    </div>
                    <div className="text-lime-400 font-medium mb-2">Cotality • Kolkata</div>
                    <ul className="list-disc list-inside text-slate-400 space-y-2 text-sm leading-relaxed marker:text-slate-600">
                        <li>Architected a scalable FastAPI backend to automate code documentation.</li>
                        <li>Designed optimized NoSQL document schemas in Azure Cosmos DB.</li>
                        <li>Designed RESTful API endpoints for generative AI systems.</li>
                    </ul>
                </div>

                {/* Experience Item 2 */}
                <div className="group relative pl-8 border-l border-white/10 ml-3">
                    <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-600 group-hover:bg-lime-400 group-hover:border-lime-400 transition-colors" />
                     <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-slate-200">SDE Intern</h3>
                        <span className="text-xs font-mono text-slate-500 bg-white/5 px-2 py-1 rounded">June 2024 - July 2024</span>
                    </div>
                    <div className="text-lime-400 font-medium mb-2">Orangewood Labs • Noida</div>
                    <ul className="list-disc list-inside text-slate-400 space-y-2 text-sm leading-relaxed marker:text-slate-600">
                        <li>Refactored monolithic RoboGPT codebase into modular architecture.</li>
                        <li>Integrated Computer Vision stack with control loops for robotic arms.</li>
                    </ul>
                </div>
            </div>
           </section>

           {/* Education Section */}
           <section>
            <h2 className="text-2xl font-serif font-bold text-white mb-8 flex items-center gap-3">
                <GraduationCap className="text-cyan-400" />
                Education
            </h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-200">Plaksha University</h3>
                        <p className="text-slate-400 text-sm">B.Tech in Computer Science & Artificial Intelligence</p>
                    </div>
                    <div className="text-right mt-2 md:mt-0">
                        <span className="text-lime-400 font-bold block">CGPA: 8.20</span>
                        <span className="text-xs text-slate-500 font-mono">2022 - 2026</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {["Data Structures", "Machine Learning", "Database Systems", "Web Dev"].map((course) => (
                        <span key={course} className="px-2 py-1 text-[10px] rounded bg-white/5 text-slate-400 border border-white/5">
                            {course}
                        </span>
                    ))}
                </div>
            </div>
           </section>
        </div>
      </div>
    </div>
  )
}
