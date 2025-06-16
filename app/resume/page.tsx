"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft, Download, Calendar, MapPin, Mail, Phone, ExternalLink } from "lucide-react"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#f5f3ee] animate-in fade-in duration-700">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <button>
            <Link
              href="/"
              className="inline-flex items-center text-[#1a6e73] hover:text-[#c17f16] transition-colors duration-300 mb-4 md:mb-0 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Adventure Hub
            </Link>
          </button>
          <button className="flex items-center gap-2 bg-[#1a6e73] text-white px-6 py-3 rounded-lg hover:bg-[#c17f16] transition-colors duration-300 font-body font-semibold">
            <a
              href="/resume.tex"
              download="Pratham_Arora_Resume.tex"
              className="flex items-center gap-2"
            >
              <Download className="h-5 w-5" />
              Download LaTeX Source
            </a>
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12 animate-in slide-in-from-bottom duration-700 delay-200">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#1a6e73] font-display">Pratham Arora</h1>
            <p className="text-xl text-[#5e4b56] font-body mb-6">Computer Science & AI Student</p>
            <div className="flex flex-wrap justify-center gap-4 text-[#5e4b56] font-body">
              <a
                href="mailto:pratham3992@gmail.com"
                className="flex items-center gap-2 hover:text-[#c17f16] transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
                pratham3992@gmail.com
              </a>
              <a
                href="https://github.com/prats3992"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#c17f16] transition-colors duration-300"
              >
                <ExternalLink className="h-4 w-4" />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/pratham3992arora"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#c17f16] transition-colors duration-300"
              >
                <ExternalLink className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://pratham-arora.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#c17f16] transition-colors duration-300"
              >
                <ExternalLink className="h-4 w-4" />
                Website
              </a>
            </div>
          </header>

          <div className="space-y-12">
            <ResumeSection title="Education" delay="delay-300">
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#e0d9c5] hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#1a6e73] font-display">
                      B.Tech in Computer Science and AI
                    </h3>
                    <p className="text-[#c17f16] font-semibold font-body">Plaksha University</p>
                    <p className="text-[#5e4b56] font-body">CGPA: 8.02/10.0</p>
                  </div>
                  <div className="text-[#5e4b56] font-body mt-2 md:mt-0">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      August 2022 - August 2026
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[#5e4b56] font-body">
                    <strong>Relevant Coursework:</strong> Data Structures & Algorithms, Database Systems, Software
                    Engineering, Machine Learning, Web Development, Computer Vision, Linear Algebra
                  </p>
                </div>
              </div>
            </ResumeSection>

            <ResumeSection title="Experience" delay="delay-400">
              <div className="space-y-6">
                <ExperienceItem
                  title="AI Intern, LLM Pipeline Development"
                  company="Cotality"
                  location="Remote"
                  period="June 2025 - Present"
                  achievements={[
                    "Developing an LLM-based pipeline to automatically document repository codebases for internal knowledge transfer and onboarding",
                    "Building intelligent documentation system that helps internal users understand repository structure, functionality, and component locations",
                    "Creating automated API documentation generation that updates dynamically with code modifications and additions",
                    "Implementing comprehensive documentation pipeline to streamline developer onboarding and improve codebase accessibility",
                  ]}
                />

                <ExperienceItem
                  title="Freelance Web Developer"
                  company="Freelance"
                  location="Remote"
                  period="May 2025 - June 2025"
                  achievements={[
                    "Developed a professional website for a CA firm using Next.js, Tailwind CSS, and Firebase for backend services",
                    "Implemented a user-friendly content management system enabling the client to easily update website content independently",
                    "Designed responsive layouts optimized for professional service presentation and client accessibility",
                  ]}
                />

                <ExperienceItem
                  title="SDE Intern, Robotics, Computer Vision"
                  company="Orangewood Labs"
                  location="Bangalore, India"
                  period="June 2024 - July 2024"
                  achievements={[
                    "Enhanced RoboGPT by developing new functionalities for food preparation tasks, contributing to the modular design of the system",
                    "Integrated a vision stack to improve the accuracy of object pose detection, reducing error margins in robotic movements",
                    "Collaborated with the Food Robotics team to refine and implement key processes, such as coffee preparation, within the robotic workflow",
                  ]}
                />

                <ExperienceItem
                  title="Freelance Python Tutor"
                  company="Self-Employed"
                  location="Remote"
                  period="June 2023 - May 2024"
                  achievements={[
                    "Specialized in teaching Python fundamentals, helping students build a strong foundation in coding",
                    "Designed and implemented interactive lesson plans tailored to individual learning styles, enhancing student engagement",
                    "Provided personalized coaching that boosted students' confidence and proficiency in Python programming",
                  ]}
                />
              </div>
            </ResumeSection>

            <ResumeSection title="Technical Skills" delay="delay-500">
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#e0d9c5] hover:shadow-xl transition-shadow duration-300">
                <div className="grid md:grid-cols-2 gap-6">
                  <SkillGroup
                    title="Programming Languages"
                    skills={["Python", "JavaScript/TypeScript", "C/C++", "HTML/CSS", "MATLAB", "Bash", "SQL"]}
                  />
                  <SkillGroup
                    title="Frameworks & Libraries"
                    skills={["Next.js", "React", "FastAPI", "Tailwind CSS", "PyTorch"]}
                  />
                  <SkillGroup
                    title="Tools & Technologies"
                    skills={["Git/GitHub", "Linux", "VS Code", "Firebase", "Google APIs", "OpenAI API", "Gemini API"]}
                  />
                  <SkillGroup
                    title="Hardware & Other"
                    skills={["Arduino", "Raspberry Pi", "ESP32", "Computer Vision", "Machine Learning"]}
                  />
                </div>
              </div>
            </ResumeSection>

            <ResumeSection title="Featured Projects" delay="delay-600">
              <div className="space-y-4">
                <ProjectItem
                  title="Resume Builder & Interview GPT"
                  description="Comprehensive resume builder application with AI-powered resume generation using Gemini API. Features professional templates with real-time preview and Interview GPT for skill development and job analysis."
                  technologies={["Next.js", "Tailwind", "Firebase", "Gemini API"]}
                  link="https://github.com/prats3992"
                />
                <ProjectItem
                  title="C Compiler & Coding Teaching Platform"
                  description="Interactive coding platform inspired by Scratch to teach programming visually. Features AST visualization and live feedback to help learners understand code structure and execution."
                  technologies={["Next.js", "TypeScript", "AST Visualization"]}
                  link="https://github.com/prats3992"
                />
                <ProjectItem
                  title="Sports Fest Website (Eklavya '25)"
                  description="Fully responsive website for university's annual sports fest. Optimized for all screen sizes with smooth animations using framer-motion and modern design principles."
                  technologies={["Next.js", "TypeScript", "Framer Motion"]}
                  link="https://github.com/prats3992"
                />
                <ProjectItem
                  title="Basketball Scoreboard & Data Tracker"
                  description="Real-time basketball scoreboard optimized for speed and usability. Features real-time stats tracking, undo functionality, and instant performance display."
                  technologies={["Next.js", "TypeScript", "Firebase", "Real-time Systems"]}
                  link="https://github.com/prats3992"
                />
                <ProjectItem
                  title="UI Wireframe Generator"
                  description="Advanced computer vision project using GANs and LLMs. Modified SAGAN to Cross-Attention GAN and fine-tuned LLaMA model for UI generation from user prompts."
                  technologies={["Python", "PyTorch", "Meta LLaMA", "Computer Vision"]}
                  link="https://github.com/prats3992"
                />
              </div>
            </ResumeSection>

            <ResumeSection title="Leadership & Activities" delay="delay-700">
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#e0d9c5] hover:shadow-xl transition-shadow duration-300">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-[#1a6e73] mb-3 font-body">Leadership Roles</h4>
                    <ul className="space-y-2 text-[#5e4b56] font-body">
                      <li>• Head of Web Development - LEAP.AI@Plaksha (2024-2025)</li>
                      <li>• Tech Team Member - E-Cell@Plaksha (2024)</li>
                      <li>• Head of Procurement - Plaksha Baking Club (2024)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a6e73] mb-3 font-body">Activities & Interests</h4>
                    <ul className="space-y-2 text-[#5e4b56] font-body">
                      <li>• Member of University Basketball Team (2022-2025)</li>
                      <li>• Technical Blogger (2021-2023)</li>
                      <li>• Open Source Contributor</li>
                      <li>• AI/ML Research Enthusiast</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ResumeSection>

            <div className="text-center animate-in slide-in-from-bottom duration-700 delay-800 mt-12">
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#e0d9c5] inline-block">
                <h2 className="text-2xl font-bold mb-6 text-[#1a6e73] font-display">Portfolio Statistics</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div className="hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-[#c17f16] font-display">11+</div>
                    <div className="text-[#5e4b56] font-body">Projects Completed</div>
                  </div>
                  <div className="hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-[#c17f16] font-display">5+</div>
                    <div className="text-[#5e4b56] font-body">Internships & Roles</div>
                  </div>
                  <div className="hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-[#c17f16] font-display">3+</div>
                    <div className="text-[#5e4b56] font-body">Leadership Positions</div>
                  </div>
                  <div className="hover:scale-105 transition-transform duration-300">
                    <div className="text-3xl font-bold text-[#c17f16] font-display">7+</div>
                    <div className="text-[#5e4b56] font-body">Tech Stacks Mastered</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ResumeSection({ title, children, delay }: { title: string; children: React.ReactNode; delay: string }) {
  return (
    <section className={`animate-in slide-in-from-bottom duration-700 ${delay}`}>
      <h2 className="text-3xl font-bold mb-6 text-[#1a6e73] font-display border-b-2 border-[#e0d9c5] pb-2">{title}</h2>
      {children}
    </section>
  )
}

function ExperienceItem({
  title,
  company,
  location,
  period,
  achievements,
}: {
  title: string
  company: string
  location: string
  period: string
  achievements: string[]
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#e0d9c5] hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-[#1a6e73] font-display">{title}</h3>
          <p className="text-[#c17f16] font-semibold font-body">{company}</p>
          <p className="text-[#5e4b56] font-body">{location}</p>
        </div>
        <div className="text-[#5e4b56] font-body mt-2 md:mt-0">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {period}
          </div>
        </div>
      </div>
      <ul className="space-y-2">
        {achievements.map((achievement, index) => (
          <li key={index} className="text-[#5e4b56] font-body flex items-start">
            <span className="w-2 h-2 bg-[#c17f16] rounded-full mr-3 mt-2 flex-shrink-0"></span>
            {achievement}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SkillGroup({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div>
      <h4 className="font-semibold text-[#1a6e73] mb-3 font-body">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-[#f5f3ee] text-[#5e4b56] px-3 py-1 rounded-full text-sm font-body hover:bg-[#e0d9c5] transition-colors duration-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectItem({
  title,
  description,
  technologies,
  link,
}: {
  title: string
  description: string
  technologies: string[]
  link?: string
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#e0d9c5] hover:shadow-xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-3">
        <h4 className="text-lg font-bold text-[#1a6e73] font-display">{title}</h4>
        {link && (
          <a
            href={link}
            className="text-[#c17f16] hover:text-[#5e4b56] transition-colors duration-300 flex items-center gap-1 mt-2 md:mt-0 font-body"
          >
            <ExternalLink className="h-4 w-4" />
            View Project
          </a>
        )}
      </div>
      <p className="text-[#5e4b56] mb-3 font-body">{description}</p>
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
          <span key={index} className="bg-[#f5f3ee] text-[#5e4b56] px-2 py-1 rounded text-sm font-body">
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}
