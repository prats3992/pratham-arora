"use client"

import type React from "react"

import Link from "next/link"
import { ArrowLeft, Mail, Github, Linkedin, Send, CheckCircle, XCircle } from "lucide-react"
import { useState } from "react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

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
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-32 md:pb-20 pt-10 px-4 selection:bg-lime-400 selection:text-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <Link
            href="/"
            className="hidden md:inline-flex items-center text-lime-400 hover:text-lime-300 transition-colors mb-12 group text-sm font-bold uppercase tracking-wider"
        >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Return to Grid
        </Link>
        <div className="max-w-2xl mx-auto">
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">
              Initialize Transmission
            </h1>
            <p className="text-slate-400">
              Have a project in mind or just want to explore the cosmos of code together? End-to-end encryption enabled.
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-md">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Identity
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-3 text-slate-200 outline-none focus:border-lime-400 transition-colors"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Frequency
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-3 text-slate-200 outline-none focus:border-lime-400 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-3 text-slate-200 outline-none focus:border-lime-400 transition-colors"
                placeholder="Collaboration Request / Hello World"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Transmission Data
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full bg-slate-900/50 border border-white/10 rounded-lg p-3 text-slate-200 outline-none focus:border-lime-400 transition-colors resize-none"
                placeholder="Type your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-lime-400 hover:bg-lime-300 text-slate-900 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                "Transmitting..."
              ) : (
                <>
                  Send Message <Send className="h-4 w-4" />
                </>
              )}
            </button>

            {submitStatus === "success" && (
                <Alert className="bg-lime-400/10 border-lime-400/20 text-lime-400">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>
                    Transmission received. I will respond to your frequency shortly.
                  </AlertDescription>
                </Alert>
            )}

            {submitStatus === "error" && (
                <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 text-red-500">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Transmission failed. Please check your signal and try again.
                  </AlertDescription>
                </Alert>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
