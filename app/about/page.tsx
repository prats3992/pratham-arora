"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft, Code, Coffee, Gamepad2, BookHeart, Cake } from "lucide-react"

export default function AboutPage() {
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

        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16 animate-in slide-in-from-bottom duration-700 delay-200">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#1a6e73] font-display">Meet the Adventurer</h1>
            <p className="text-xl text-[#5e4b56] font-body">
              The story behind the code and the person crafting digital experiences
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="animate-in slide-in-from-left duration-700 delay-300">
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#e0d9c5] hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold mb-4 text-[#1a6e73] font-display">My Journey</h2>
                <div className="prose text-[#5e4b56] font-body">
                  <p className="mb-4">
                    Hi there! I am Pratham, a passionate software engineer with a wide range of interests and hobbies. In my free time, you can find me reading a good book, playing basketball, or working on a new coding project. I am always looking for new challenges and opportunities to learn and grow. I also love teaching coding to beginners and helping them discover the joys of programming.
                  </p>
                  {/* <p className="mb-4">
                  
                  </p> */}
                </div>
              </div>
            </div>

            <div className="animate-in slide-in-from-right duration-700 delay-400">
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#e0d9c5] hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold mb-4 text-[#1a6e73] font-display">Skills & Interests</h2>
                <div className="space-y-4">
                  <SkillCategory
                    icon={<Code className="h-5 w-5" />}
                    title="Programming Languages"
                    skills={["JavaScript/TypeScript", "Python", "C", "C++", "Bash"]}
                  />
                  <SkillCategory
                    icon={<Coffee className="h-5 w-5" />}
                    title="Technologies & Frameworks"
                    skills={["React/Next.js", "Tailwind CSS", "Firebase", ]}
                  />
                  <SkillCategory
                    icon={<Gamepad2 className="h-5 w-5" />}
                    title="Interests"
                    skills={["AI/Machine Learning", "Web Development", "UI/UX Design"]}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="animate-in slide-in-from-bottom duration-700 delay-500">
            <div className="bg-[#1a6e73] text-white rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4 font-display">Fun Facts About Me</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="hover:scale-105 transition-transform duration-300">
                  <BookHeart className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-body">I love teaching coding to beginners</p>
                </div>
                <div className="hover:scale-105 transition-transform duration-300">
                  <Cake className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-body">Big foodie—dessert before the meal is my style!</p>
                </div>
                <div className="hover:scale-105 transition-transform duration-300">
                  <Gamepad2 className="h-8 w-8 mx-auto mb-2" />
                    <p className="font-body">I'm best at RPGs—other genres, not so much!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillCategory({ icon, title, skills }: { icon: React.ReactNode; title: string; skills: string[] }) {
  return (
    <div className="group">
      <div className="flex items-center mb-2 text-[#1a6e73] group-hover:text-[#c17f16] transition-colors duration-300">
        {icon}
        <h3 className="font-semibold ml-2 font-body">{title}</h3>
      </div>
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
