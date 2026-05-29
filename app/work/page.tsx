import resumeData from "@/resume-data.json"
import { WorkClient, type Project } from "./work-client"

export const metadata = {
  title: "Work",
  description:
    "Complete archive of Pratham Arora's technical projects — VR LLM agents, RAG pipelines, semantic segmentation, full-stack apps, and more. ML research to production systems.",
}

export default function WorkPage() {
  const projects = resumeData.projects as Project[]
  return <WorkClient projects={projects} />
}
