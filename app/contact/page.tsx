"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft, Mail, Github, Linkedin, Send, CheckCircle, XCircle } from "lucide-react" // Added CheckCircle and XCircle
import { useState } from "react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert" // Import ShadCN Alert components

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null) // Added for feedback

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null) // Reset status

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData.message);
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus("error")
    }

    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#1a6e73] font-display">Join Forces</h1>
            <p className="text-xl text-[#5e4b56] font-body">
              Ready to embark on a collaborative adventure? Let's connect and create something amazing together!
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-in slide-in-from-left duration-700 delay-300">
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#e0d9c5] hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-2xl font-bold mb-6 text-[#1a6e73] font-display">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-[#5e4b56] font-semibold mb-2 font-body">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-[#e0d9c5] rounded-lg focus:border-[#1a6e73] focus:outline-none transition-colors duration-300 font-body"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[#5e4b56] font-semibold mb-2 font-body">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-[#e0d9c5] rounded-lg focus:border-[#1a6e73] focus:outline-none transition-colors duration-300 font-body"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-[#5e4b56] font-semibold mb-2 font-body">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-[#e0d9c5] rounded-lg focus:border-[#1a6e73] focus:outline-none transition-colors duration-300 font-body"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-[#5e4b56] font-semibold mb-2 font-body">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-[#e0d9c5] rounded-lg focus:border-[#1a6e73] focus:outline-none transition-colors duration-300 font-body resize-none"
                      placeholder="Tell me about your project or opportunity..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#1a6e73] text-white py-3 px-6 rounded-lg hover:bg-[#c17f16] transition-colors duration-300 flex items-center justify-center gap-2 font-body font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                  {submitStatus === "success" && (
                    <Alert variant="default" className="mt-4 border-green-500 text-green-700">
                      <div className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <div className="flex-grow">
                          <AlertTitle className="font-bold">Success!</AlertTitle>
                          <AlertDescription>
                            Your message has been sent. I\\'ll get back to you soon!
                          </AlertDescription>
                        </div>
                      </div>
                    </Alert>
                  )}
                  {submitStatus === "error" && (
                    <Alert variant="destructive" className="mt-4">
                      <div className="flex items-start">
                        <XCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                        <div className="flex-grow">
                          <AlertTitle className="font-bold">Error</AlertTitle>
                          <AlertDescription>
                            Failed to send message. Please try again later or contact me directly.
                          </AlertDescription>
                        </div>
                      </div>
                    </Alert>
                  )}
                </form>
              </div>
            </div>

            <div className="animate-in slide-in-from-right duration-700 delay-400">
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#e0d9c5] hover:shadow-xl transition-shadow duration-300 mb-8">
                <h2 className="text-2xl font-bold mb-6 text-[#1a6e73] font-display">Other Ways to Connect</h2>
                <div className="space-y-4">
                  <ContactMethod
                    icon={<Mail className="h-5 w-5" />}
                    label="Email"
                    value="pratham.arora@plaksha.edu.in"
                    href="mailto:pratham.arora@plaksha.edu.in"
                  />
                  <ContactMethod
                    icon={<Github className="h-5 w-5" />}
                    label="GitHub"
                    value="@prats3992"
                    href="https://github.com/prats3992"
                  />
                  <ContactMethod
                    icon={<Linkedin className="h-5 w-5" />}
                    label="LinkedIn"
                    value="Pratham Arora"
                    href="https://www.linkedin.com/in/pratham3992arora/"
                  />
                  {/* <ContactMethod
                    icon={<MapPin className="h-5 w-5" />}
                    label="Location"
                    value="San Francisco, CA"
                    href="#"
                  /> */}
                </div>
              </div>

              <div className="bg-[#1a6e73] text-white rounded-xl p-8">
                <h3 className="text-xl font-bold mb-4 font-display">Looking For</h3>
                <ul className="space-y-2 font-body">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#c17f16] rounded-full mr-3"></span>
                    Internship opportunities
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#c17f16] rounded-full mr-3"></span>
                    Freelance projects
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#c17f16] rounded-full mr-3"></span>
                    Open source collaborations
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-[#c17f16] rounded-full mr-3"></span>
                    Mentorship opportunities
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ContactMethod({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
}) {
  return (
    <a
      href={href}
      className="flex items-center p-4 rounded-lg border border-[#e0d9c5] hover:border-[#1a6e73] hover:bg-[#f5f3ee] transition-all duration-300 group"
    >
      <div className="text-[#1a6e73] group-hover:text-[#c17f16] transition-colors duration-300 mr-4">{icon}</div>
      <div>
        <div className="text-sm text-[#5e4b56] font-body">{label}</div>
        <div className="font-semibold text-[#1a6e73] group-hover:text-[#c17f16] transition-colors duration-300 font-body">
          {value}
        </div>
      </div>
    </a>
  )
}
