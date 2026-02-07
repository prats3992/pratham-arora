"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, push, remove, update } from "firebase/database"
import Link from "next/link"
import { ArrowLeft, Plus, Edit, Trash2, Eye, Calendar, X, Save, Github, Globe } from "lucide-react"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)

interface Project {
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

export default function AddProjectPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  useEffect(() => {
    const projectsRef = ref(database, "projects")
    const unsubscribe = onValue(projectsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const projectsList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        })).filter(p => !p.id.includes("resume-data")) // Basic filter if mixed
        setProjects(projectsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
      } else {
        setProjects([])
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSaveProject = (projectData: Omit<Project, "id">) => {
    if (editingProject) {
      // Update existing project
      const projectRef = ref(database, `projects/${editingProject.id}`)
      update(projectRef, projectData)
    } else {
      // Add new project
      const projectsRef = ref(database, "projects")
      push(projectsRef, projectData)
    }
    setShowAddForm(false)
    setEditingProject(null)
  }

  const handleDeleteProject = (projectId: string) => {
    if (confirm("Are you sure you want to delete this project? This action cannot be undone.")) {
      const projectRef = ref(database, `projects/${projectId}`)
      remove(projectRef)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lime-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-lime-400 selection:text-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Navigation / Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/10">
          <Link
            href="/projects"
            className="inline-flex items-center text-slate-400 hover:text-white transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Return to Archives
          </Link>

          <div className="flex gap-3">
            <Link
              href="/projects"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white transition-colors text-sm font-medium"
            >
              <Eye className="h-4 w-4" />
              View Public Page
            </Link>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-lime-400 text-slate-950 hover:bg-lime-300 transition-colors text-sm font-bold"
            >
              <Plus className="h-4 w-4" />
              Initialize New Project
            </button>
          </div>
        </div>

        {/* Title Section */}
        <header className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-white">
                Project Control Center
            </h1>
            <p className="text-slate-400">
                Manage your digital portfolio entries.
            </p>
        </header>

        {/* Project Grid */}
        <div className="grid gap-6">
            {projects.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl bg-white/5 border border-white/10 border-dashed">
                    <div className="p-4 rounded-full bg-slate-900 border border-white/10 text-slate-500 mb-4">
                        <Plus className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No Projects Found</h3>
                    <p className="text-slate-400 mb-6">Your archive is currently empty.</p>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="px-6 py-2 rounded-lg bg-lime-400 text-slate-950 hover:bg-lime-300 font-bold"
                    >
                        Create First Entry
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {projects.map((project) => (
                        <AdminProjectCard
                            key={project.id}
                            project={project}
                            onEdit={() => setEditingProject(project)}
                            onDelete={() => handleDeleteProject(project.id)}
                        />
                    ))}
                </div>
            )}
        </div>
      </div>

      {/* Modal Overlay */}
      {(showAddForm || editingProject) && (
        <ProjectModal
          project={editingProject}
          onClose={() => {
            setShowAddForm(false)
            setEditingProject(null)
          }}
          onSave={handleSaveProject}
        />
      )}
    </div>
  )
}

function AdminProjectCard({
  project,
  onEdit,
  onDelete,
}: {
  project: Project
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className="group flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-xl bg-slate-900 border border-white/5 hover:border-lime-500/30 transition-all">
      <div className="flex-1 space-y-2 mb-4 md:mb-0">
        <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-slate-100">{project.title}</h3>
            <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider ${project.status === "Terminated" ? "bg-red-500/10 text-red-500" : "bg-blue-500/10 text-blue-400"}`}>
                {project.status}
            </span>
            {project.featured && (
                <span className="px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider bg-lime-500/10 text-lime-400 border border-lime-500/20">
                    Featured
                </span>
            )}
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
             <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {new Date(project.date).toLocaleDateString()}
             </span>
             {project.githubUrl && (
                 <Link href={project.githubUrl} target="_blank" className="flex items-center gap-1 hover:text-white">
                    <Github className="h-3 w-3" /> Repo
                 </Link>
             )}
        </div>
        <p className="text-slate-400 line-clamp-1 max-w-2xl text-sm">{project.description}</p>
        <div className="flex gap-2 pt-1">
            {project.tags.slice(0, 5).map((tag, i) => (
                <span key={i} className="text-xs text-slate-600 font-mono bg-white/5 px-1.5 py-0.5 rounded">
                    {tag}
                </span>
            ))}
        </div>
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto mt-4 md:mt-0">
          <button
            onClick={onEdit}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:bg-indigo-500/20 hover:text-indigo-400 border border-transparent hover:border-indigo-500/30 transition-colors text-sm"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-slate-300 hover:bg-red-500/20 hover:text-red-400 border border-transparent hover:border-red-500/30 transition-colors text-sm"
          >
            <Trash2 className="h-4 w-4" />
            Kill
          </button>
      </div>
    </div>
  )
}

function ProjectModal({
  project,
  onClose,
  onSave,
}: {
  project: Project | null
  onClose: () => void
  onSave: (project: Omit<Project, "id">) => void
}) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    tags: project?.tags.join(", ") || "",
    status: project?.status || "In Progress",
    date: project?.date || new Date().toISOString().split("T")[0],
    githubUrl: project?.githubUrl || "",
    liveUrl: project?.liveUrl || "",
    featured: project?.featured || false,
  })

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
    })
  }

  const inputClass = "w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-2.5 text-slate-200 focus:outline-none focus:border-lime-400/50 focus:ring-1 focus:ring-lime-400/50 transition-all placeholder:text-slate-600";
  const labelClass = "block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-slate-900 border border-white/10 w-full max-w-2xl rounded-2xl shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-white">
                {project ? "Edit Protocol" : "New Entry"}
            </h2>
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                <X className="h-6 w-6" />
            </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div>
                    <label className={labelClass}>Project Title</label>
                    <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={inputClass}
                    placeholder="e.g. Aether Link"
                    />
                </div>
                <div>
                    <label className={labelClass}>Status</label>
                    <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className={inputClass}
                    >
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Terminated">Terminated</option>
                        <option value="On Hold">On Hold</option>
                    </select>
                </div>
                <div>
                    <label className={labelClass}>Date</label>
                    <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className={inputClass}
                    />
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className={labelClass}>GitHub URL</label>
                    <div className="relative">
                        <Github className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <input
                        type="url"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        className={`${inputClass} pl-10`}
                        placeholder="https://github.com/..."
                        />
                    </div>
                </div>
                <div>
                    <label className={labelClass}>Live URL</label>
                    <div className="relative">
                        <Globe className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                        <input
                        type="url"
                        value={formData.liveUrl}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                        className={`${inputClass} pl-10`}
                        placeholder="https://..."
                        />
                    </div>
                </div>
                <div className="flex items-center pt-8">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.featured ? 'bg-lime-400 border-lime-400 text-black' : 'border-slate-600 bg-transparent'}`}>
                             {formData.featured && <Plus className="h-3 w-3" />}
                        </div>
                        <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="hidden"
                        />
                        <span className="text-sm font-bold text-slate-300 group-hover:text-white">Mark as Featured</span>
                    </label>
                </div>
            </div>
          </div>

          <div>
            <label className={labelClass}>Tech Stack (Comma Separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className={inputClass}
              placeholder="Next.js, Firebase, Tailwind..."
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`${inputClass} min-h-[120px] resize-none`}
              placeholder="Brief briefing of the mission..."
            />
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-white/5">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg text-slate-400 hover:text-white transition-colors text-sm font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-lime-400 text-slate-950 hover:bg-lime-300 transition-colors text-sm font-bold flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              Save Entries
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
