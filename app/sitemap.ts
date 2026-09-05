import type { MetadataRoute } from "next"
import { investigations } from "@/content/investigations"
import { technicalNotes } from "@/content/notes"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pratham-arora.vercel.app"

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/investigations`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  const investigationRoutes: MetadataRoute.Sitemap = investigations.map((inv) => ({
    url: `${baseUrl}/investigations/${inv.slug}`,
    lastModified: new Date(inv.date),
    changeFrequency: "monthly",
    priority: 0.85,
  }))

  const noteRoutes: MetadataRoute.Sitemap = technicalNotes.map((note) => ({
    url: `${baseUrl}/notes/${note.slug}`,
    lastModified: new Date(note.date),
    changeFrequency: "monthly",
    priority: 0.75,
  }))

  return [...staticRoutes, ...investigationRoutes, ...noteRoutes]
}
