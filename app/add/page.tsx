"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue, push, remove, update } from "firebase/database"
import Link from "next/link"
import { ArrowLeft, Plus, Edit, Trash2, Eye, Calendar } from "lucide-react"

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
        }))
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
    if (confirm("Are you sure you want to delete this project?")) {
      const projectRef = ref(database, `projects/${projectId}`)
      remove(projectRef)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f3ee] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a6e73]"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f3ee] animate-in fade-in duration-700">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-[#1a6e73] hover:text-[#c17f16] transition-colors duration-300 group"
          >
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to Projects
          </Link>

          <div className="flex gap-3">
            <Link
              href="/projects"
              className="flex items-center gap-2 bg-[#5e4b56] text-white px-4 py-2 rounded-lg hover:bg-[#1a6e73] transition-colors duration-300 font-body"
            >
              <Eye className="h-4 w-4" />
              View Public Page
            </Link>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 bg-[#c17f16] text-white px-4 py-2 rounded-lg hover:bg-[#1a6e73] transition-colors duration-300 font-body"
            >
              <Plus className="h-4 w-4" />
              Add New Project
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12 animate-in slide-in-from-bottom duration-700 delay-200">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-[#1a6e73] font-display">Project Management</h1>
            <p className="text-xl text-[#5e4b56] font-body">
              Manage your portfolio projects - add, edit, and organize your digital adventures
            </p>
          </header>

          {projects.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#e0d9c5] inline-block">
                <h3 className="text-xl font-bold mb-4 text-[#1a6e73] font-display">No Projects Yet</h3>
                <p className="text-[#5e4b56] mb-6 font-body">
                  Start building your portfolio by adding your first project!
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="bg-[#c17f16] text-white px-6 py-3 rounded-lg hover:bg-[#1a6e73] transition-colors duration-300 font-body"
                >
                  Add Your First Project
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6 mb-12">
              {projects.map((project, index) => (
                <AdminProjectCard
                  key={project.id}
                  project={project}
                  delay={`delay-${300 + index * 100}`}
                  onEdit={() => setEditingProject(project)}
                  onDelete={() => handleDeleteProject(project.id)}
                />
              ))}
            </div>
          )}

          <div className="text-center animate-in slide-in-from-bottom duration-700 delay-800">
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-[#e0d9c5] inline-block">
              <h2 className="text-2xl font-bold mb-4 text-[#1a6e73] font-display">Portfolio Statistics</h2>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold text-[#c17f16] font-display">{projects.length}</div>
                  <div className="text-[#5e4b56] font-body">Total Projects</div>
                </div>
                <div className="hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold text-[#c17f16] font-display">
                    {projects.filter((p) => p.featured).length}
                  </div>
                  <div className="text-[#5e4b56] font-body">Featured Projects</div>
                </div>
                <div className="hover:scale-105 transition-transform duration-300">
                  <div className="text-3xl font-bold text-[#c17f16] font-display">
                    {[...new Set(projects.flatMap((p) => p.tags))].length}
                  </div>
                  <div className="text-[#5e4b56] font-body">Technologies Used</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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
  delay,
  onEdit,
  onDelete,
}: {
  project: Project
  delay: string
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-6 border-2 border-[#e0d9c5] hover:shadow-xl transition-all duration-300 animate-in slide-in-from-bottom duration-700 ${delay}`}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1 mb-4 lg:mb-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
            <h3 className="text-xl font-bold text-[#1a6e73] font-display">{project.title}</h3>
            <div className="flex gap-2">
              <span className="bg-[#c17f16] text-white px-3 py-1 rounded-full text-sm font-body">{project.status}</span>
              {project.featured && (
                <span className="bg-[#1a6e73] text-white px-3 py-1 rounded-full text-sm font-body">Featured</span>
              )}
            </div>
          </div>
          <div className="flex items-center text-[#5e4b56] mb-3 font-body">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(project.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <p className="text-[#5e4b56] mb-4 font-body line-clamp-2">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 4).map((tag, index) => (
              <span key={index} className="bg-[#f5f3ee] text-[#5e4b56] px-2 py-1 rounded text-sm font-body">
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-[#5e4b56] text-sm font-body">+{project.tags.length - 4} more</span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 bg-[#1a6e73] text-white px-4 py-2 rounded-lg hover:bg-[#c17f16] transition-colors duration-300 font-body"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 font-body"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
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
    status: project?.status || "Solo Quest",
    date: project?.date || new Date().toISOString().split("T")[0],
    githubUrl: project?.githubUrl || "",
    liveUrl: project?.liveUrl || "",
    featured: project?.featured || false,
  })

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-[#1a6e73] font-display">
          {project ? "Edit Project" : "Add New Project"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#5e4b56] font-semibold mb-2 font-body">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-2 border-2 border-[#e0d9c5] rounded-lg focus:border-[#1a6e73] focus:outline-none transition-colors duration-300 font-body"
              required
            />
          </div>

          <div>
            <label className="block text-[#5e4b56] font-semibold mb-2 font-body">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 border-2 border-[#e0d9c5] rounded-lg focus:border-[#1a6e73] focus:outline-none transition-colors duration-300 font-body resize-none"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#5e4b56] font-semibold mb-2 font-body">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-2 border-2 border-[#e0d9c5] rounded-lg focus:border-[#1a6e73] focus:outline-none transition-colors duration-300 font-body"
              >
                <option>Solo Quest</option>
                <option>Collaborative Quest</option>
                <option>Major Quest</option>
                <option>Featured Quest</option>
                <option>Utility Quest</option>
              </select>
            </div>

            <div>
              <label className="block text-[#5e4b56] font-semibold mb-2 font-body">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-2 border-2 border-[#e0d9c5] rounded-lg focus:border-[#1a6e73] focus:outline-none transition-colors duration-300 font-body"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#5e4b56] font-semibold mb-2 font-body">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
              placeholder="React, TypeScript, Node.js"
              className="w-full px-4 py-2 border-2 border-[#e0d9c5] rounded-lg focus:border-[#1a6e73] focus:outline-none transition-colors duration-300 font-body"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#5e4b56] font-semibold mb-2 font-body">GitHub URL</label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
                className="w-full px-4 py-2 border-2 border-[#e0d9c5] rounded-lg focus:border-[#1a6e73] focus:outline-none transition-colors duration-300 font-body"
                required
              />
            </div>

            <div>
              <label className="block text-[#5e4b56] font-semibold mb-2 font-body">Live URL (optional)</label>
              <input
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData((prev) => ({ ...prev, liveUrl: e.target.value }))}
                className="w-full px-4 py-2 border-2 border-[#e0d9c5] rounded-lg focus:border-[#1a6e73] focus:outline-none transition-colors duration-300 font-body"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
              className="mr-2"
            />
            <label htmlFor="featured" className="text-[#5e4b56] font-body">
              Featured Project
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 bg-[#1a6e73] text-white py-3 rounded-lg hover:bg-[#c17f16] transition-colors duration-300 font-body font-semibold"
            >
              {project ? "Update Project" : "Add Project"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#5e4b56] text-white py-3 rounded-lg hover:bg-[#e0d9c5] hover:text-[#5e4b56] transition-colors duration-300 font-body font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
