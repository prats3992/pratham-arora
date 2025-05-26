"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft, Download, Calendar, MapPin, Mail, Phone, ExternalLink } from "lucide-react"

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-[#f5f3ee] animate-in fade-in duration-700">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-[#1a6e73] hover:text-[#c17f16] transition-colors duration-300 mb-4 md:mb-0 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Adventure Hub
          </Link>

          <button className="flex items-center gap-2 bg-[#1a6e73] text-white px-6 py-3 rounded-lg hover:bg-[#c17f16] transition-colors duration-300 font-body font-semibold">
            <Download className="h-5 w-5" />
            Download PDF
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12 animate-in slide-in-from-bottom duration-700 delay-200">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#1a6e73] font-display">Alex Developer</h1>
            <p className="text-xl text-[#5e4b56] font-body mb-6">Computer Science Student & Full-Stack Developer</p>
            <div className="flex flex-wrap justify-center gap-4 text-[#5e4b56] font-body">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                alex.developer@email.com
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                (555) 123-4567
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                San Francisco, CA
              </div>
            </div>
          </header>

          <div className="space-y-12">
            <ResumeSection title="Education" delay="delay-300">
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#e0d9c5] hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-[#1a6e73] font-display">
                      Bachelor of Science in Computer Science
                    </h3>
                    <p className="text-[#c17f16] font-semibold font-body">Tech University</p>
                    <p className="text-[#5e4b56] font-body">GPA: 3.8/4.0 • Dean's List</p>
                  </div>
                  <div className="text-[#5e4b56] font-body mt-2 md:mt-0">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Expected May 2025
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-[#5e4b56] font-body">
                    <strong>Relevant Coursework:</strong> Data Structures & Algorithms, Database Systems, Software
                    Engineering, Machine Learning, Web Development
                  </p>
                  <p className="text-[#5e4b56] font-body">
                    <strong>Activities:</strong> Computer Science Club President, Hackathon Organizer, Peer Tutor
                  </p>
                </div>
              </div>
            </ResumeSection>

            <ResumeSection title="Experience" delay="delay-400">
              <div className="space-y-6">
                <ExperienceItem
                  title="Software Development Intern"
                  company="TechCorp Solutions"
                  location="San Francisco, CA"
                  period="June 2024 - August 2024"
                  achievements={[
                    "Developed and deployed 3 full-stack web applications using React and Node.js",
                    "Improved application performance by 40% through code optimization and caching strategies",
                    "Collaborated with senior developers on agile development team of 8 members",
                    "Implemented automated testing suite, reducing bug reports by 25%",
                  ]}
                />

                <ExperienceItem
                  title="Freelance Web Developer"
                  company="Self-Employed"
                  location="Remote"
                  period="January 2024 - Present"
                  achievements={[
                    "Built custom websites for 5+ small businesses, increasing their online presence",
                    "Specialized in responsive design and modern JavaScript frameworks",
                    "Managed client relationships and project timelines independently",
                    "Achieved 100% client satisfaction rate with on-time project delivery",
                  ]}
                />

                <ExperienceItem
                  title="Teaching Assistant - Intro to Programming"
                  company="Tech University"
                  location="San Francisco, CA"
                  period="September 2023 - December 2023"
                  achievements={[
                    "Assisted 150+ students with Python programming concepts and debugging",
                    "Led weekly lab sessions and office hours for struggling students",
                    "Graded assignments and provided constructive feedback",
                    "Improved student pass rate by 15% through personalized tutoring approach",
                  ]}
                />
              </div>
            </ResumeSection>

            <ResumeSection title="Technical Skills" delay="delay-500">
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#e0d9c5] hover:shadow-xl transition-shadow duration-300">
                <div className="grid md:grid-cols-2 gap-6">
                  <SkillGroup
                    title="Programming Languages"
                    skills={["JavaScript/TypeScript", "Python", "Java", "C++", "SQL", "HTML/CSS"]}
                  />
                  <SkillGroup
                    title="Frameworks & Libraries"
                    skills={["React", "Next.js", "Node.js", "Express", "Vue.js", "Django"]}
                  />
                  <SkillGroup
                    title="Databases & Tools"
                    skills={["MongoDB", "PostgreSQL", "Git", "Docker", "AWS", "Firebase"]}
                  />
                  <SkillGroup
                    title="Concepts & Methodologies"
                    skills={["Agile Development", "RESTful APIs", "Responsive Design", "Testing", "CI/CD"]}
                  />
                </div>
              </div>
            </ResumeSection>

            <ResumeSection title="Projects" delay="delay-600">
              <div className="space-y-4">
                <ProjectItem
                  title="AI Pathfinding Visualizer"
                  description="Interactive web app demonstrating pathfinding algorithms with real-time visualization"
                  technologies={["React", "TypeScript", "Canvas API"]}
                  link="https://pathfinding-demo.com"
                />
                <ProjectItem
                  title="Campus Event Discovery Platform"
                  description="Full-stack application for students to discover and organize campus events"
                  technologies={["Next.js", "PostgreSQL", "Prisma"]}
                  link="https://campus-events.com"
                />
                <ProjectItem
                  title="Sustainable Smart Home API"
                  description="Backend system for monitoring home energy usage with ML predictions"
                  technologies={["Node.js", "MongoDB", "Machine Learning"]}
                />
              </div>
            </ResumeSection>

            <ResumeSection title="Achievements & Certifications" delay="delay-700">
              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-[#e0d9c5] hover:shadow-xl transition-shadow duration-300">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-[#1a6e73] mb-2 font-body">Awards & Recognition</h4>
                    <ul className="space-y-1 text-[#5e4b56] font-body">
                      <li>• 1st Place - University Hackathon 2024</li>
                      <li>• Dean's List - Fall 2023, Spring 2024</li>
                      <li>• Outstanding Student Leader Award</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a6e73] mb-2 font-body">Certifications</h4>
                    <ul className="space-y-1 text-[#5e4b56] font-body">
                      <li>• AWS Cloud Practitioner</li>
                      <li>• Google Analytics Certified</li>
                      <li>• MongoDB Developer Associate</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ResumeSection>
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
