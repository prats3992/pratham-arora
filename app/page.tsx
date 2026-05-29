import rawData from "@/resume-data.json"
import Link from "next/link"
import { MetricCard } from "@/components/metric-card"

interface ResumeProject {
  id: string
  title: string
  description: string
  longDescription?: string[]
  tags: string[]
  status: string
  date: string
  githubUrl: string
  liveUrl?: string
  featured?: boolean
  category: string
  metrics?: Record<string, string>
  paperBadge?: string
  inProgress?: boolean
}

interface ExperienceLink {
  label: string
  url: string
}

interface ResumeExperience {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  achievements: string[]
  metrics?: Record<string, string>
  links?: ExperienceLink[]
}

interface ResumeResearch {
  title: string
  supervisor: string
  organization: string
  startDate: string
  endDate: string
  achievements: string[]
  links?: ExperienceLink[]
}

interface ResumeLeadership {
  title: string
  organization: string
  startDate: string
  endDate: string
  achievements: string[]
  links?: ExperienceLink[]
}

const resumeData = {
  ...rawData,
  projects: rawData.projects as unknown as ResumeProject[],
  industryExperience: rawData.industryExperience as unknown as ResumeExperience[],
  researchExperience: rawData.researchExperience as unknown as ResumeResearch[],
  leadership: rawData.leadership as unknown as ResumeLeadership[],
}

export default function Home() {
  const featuredProjects = resumeData.projects.filter((p) => p.featured)

  return (
    <div className="space-y-24">
      {/* ── Identity ── */}
      <section className="pt-8 md:pt-16">
        <h1 className="font-heading font-bold text-[2.5rem] md:text-[3.25rem] leading-[1.1] tracking-tight text-[var(--text-primary)] mb-4">
          {resumeData.personalInfo.name}
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-3">
          Final-year CS&nbsp;&amp;&nbsp;AI at{" "}
          <span className="text-[var(--text-primary)]">Plaksha University</span>
          . I build production ML systems — RAG pipelines, LLM agents, applied
          NLP. Researching where frontier VLMs fail at physical-world reasoning.
        </p>
        <p className="text-sm text-[var(--accent)] font-mono mb-6">
          Available for full-time roles.
          
        </p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-[var(--text-tertiary)]">
          <span>{resumeData.personalInfo.location}</span>
          <span className="hidden sm:inline">·</span>
          <a
            href={`mailto:${resumeData.personalInfo.email}`}
            className="hover:text-[var(--text-primary)] transition-colors duration-150"
          >
            {resumeData.personalInfo.email}
          </a>
          <span className="hidden sm:inline">·</span>
          <a
            href={resumeData.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors duration-150"
          >
            LinkedIn &#8599;
          </a>
          <span className="hidden sm:inline">·</span>
          <a
            href={resumeData.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors duration-150"
          >
            GitHub &#8599;
          </a>
        </div>
      </section>

      {/* ── Experience ── */}
      <section>
        <SectionLabel>Experience</SectionLabel>
        <div className="space-y-8">
          {resumeData.industryExperience.map((exp, i) => (
            <div key={i} className="group">
              {/* Plain-English one-liner before the bullets */}
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                <h3 className="font-heading font-bold text-[var(--text-primary)]">
                  {exp.title}
                  <span className="font-sans font-normal text-[var(--text-secondary)]">
                    {" "}
                    — {exp.company}
                  </span>
                </h3>
                <span className="font-mono text-2xs text-[var(--text-tertiary)] shrink-0">
                  {formatDateRange(exp.startDate, exp.endDate)}
                </span>
              </div>

              {/* Key metrics as scannable badges — for Cotality */}
              {exp.metrics && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
                  {Object.entries(exp.metrics).map(([key, val]) => (
                    <MetricCard
                      key={key}
                      label={formatMetricLabel(key)}
                      value={val}
                    />
                  ))}
                </div>
              )}

              {exp.links && exp.links.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.links.map((link) => (
                    <a
                      key={`${link.label}-${link.url}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-2xs font-mono rounded border border-[var(--border)] text-[var(--text-tertiary)] hover:text-[var(--accent)] hover:border-[var(--text-tertiary)] transition-colors duration-150"
                    >
                      {link.label}
                      <span aria-hidden="true">&#8599;</span>
                    </a>
                  ))}
                </div>
              )}

              <ul className="space-y-1.5">
                {exp.achievements.map((a, j) => (
                  <li
                    key={j}
                    className="text-sm text-[var(--text-secondary)] leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-px before:bg-[var(--text-tertiary)]"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section>
        <div className="flex items-baseline justify-between mb-8">
          <SectionLabel noMargin>Projects</SectionLabel>
          <Link
            href="/work"
            className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-150"
          >
            View all &#8599;
          </Link>
        </div>
        <div className="space-y-6">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* ── Research ── */}
      <section>
        <SectionLabel>Research</SectionLabel>
        {resumeData.researchExperience.map((exp, i) => (
          <div key={i} className={i > 0 ? "mt-8" : ""}>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
              <h3 className="font-heading font-bold text-[var(--text-primary)]">
                {exp.title}
                <span className="font-sans font-normal text-[var(--text-secondary)]">
                  {" "}
                  — {exp.organization}
                </span>
              </h3>
              <span className="font-mono text-2xs text-[var(--text-tertiary)] shrink-0">
                {formatDateRange(exp.startDate, exp.endDate)}
              </span>
            </div>
            <p className="text-2xs text-[var(--text-tertiary)] mb-2">
              {exp.supervisor}
            </p>
            {exp.links && exp.links.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {exp.links.map((link) => (
                  <a
                    key={`${link.label}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-2xs font-mono rounded border border-[var(--border)] text-[var(--text-tertiary)] hover:text-[var(--accent)] hover:border-[var(--text-tertiary)] transition-colors duration-150"
                  >
                    {link.label}
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                ))}
              </div>
            )}
            <ul className="space-y-1">
              {exp.achievements.map((a, j) => (
                <li
                  key={j}
                  className="text-sm text-[var(--text-secondary)] leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-px before:bg-[var(--text-tertiary)]"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* ── Skills ── */}
      <section>
        <SectionLabel>Skills</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SkillGroup label="Languages" items={resumeData.skills.languages} />
          <SkillGroup label="AI / ML" items={resumeData.skills.aiMl} />
          <SkillGroup label="Web & Backend" items={resumeData.skills.webBackend} />
          <SkillGroup label="Cloud & Tools" items={resumeData.skills.cloudTools} />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[var(--border)] pt-8 pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-2xs text-[var(--text-tertiary)]">
        <span>&copy; {new Date().getFullYear()} Pratham Arora</span>
        <div className="flex items-center gap-4">
          <a
            href={resumeData.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors duration-150"
          >
            GitHub
          </a>
          <a
            href={resumeData.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--text-primary)] transition-colors duration-150"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${resumeData.personalInfo.email}`}
            className="hover:text-[var(--text-primary)] transition-colors duration-150"
          >
            Email
          </a>
        </div>
      </footer>
    </div>
  )
}

/* ─── Sub-components ─── */

function SectionLabel({
  children,
  noMargin,
}: {
  children: React.ReactNode
  noMargin?: boolean
}) {
  return (
    <h2
      className={`font-mono text-xs font-medium tracking-[0.08em] uppercase text-[var(--text-tertiary)] ${
        noMargin ? "" : "mb-8"
      }`}
    >
      {children}
    </h2>
  )
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h3 className="text-2xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-3">
        {label}
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {items.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-2xs font-mono text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border)] rounded"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

interface ProjectCardProps {
  project: ResumeProject
}

function ProjectCard({ project }: ProjectCardProps) {
  const year = new Date(project.date).getFullYear()

  return (
    <div className="group border border-[var(--border)] rounded-md p-5 bg-[var(--bg-elevated)] hover:border-[var(--accent)]/30 transition-colors duration-150">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="font-heading font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-150">
              {project.title}
            </h3>
            <span className="font-mono text-2xs px-1.5 py-0.5 rounded bg-[var(--accent-muted)] text-[var(--accent)]">
              {project.category}
            </span>
            {project.inProgress && (
              <span className="font-mono text-2xs px-1.5 py-0.5 rounded border border-amber-500/30 bg-amber-500/10 text-amber-400">
                In Progress
              </span>
            )}
          </div>

          {/* Paper badge for VR LLM project */}
          {project.paperBadge && (
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-[var(--accent)]/20 bg-[var(--accent-muted)] mb-2">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--accent)] shrink-0"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span className="text-2xs font-mono text-[var(--accent)]">
                {project.paperBadge}
              </span>
            </div>
          )}

          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
            {project.description}
          </p>
        </div>
        <span className="font-mono text-2xs text-[var(--text-tertiary)] shrink-0">
          {year}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mb-3">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 text-2xs font-mono text-[var(--text-tertiary)] border border-[var(--border)] rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      {project.metrics && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
          {Object.entries(project.metrics).map(([key, val]) => (
            <div key={key} className="flex items-baseline gap-2">
              <span className="font-mono text-sm font-medium text-[var(--accent)]">
                {val}
              </span>
              <span className="text-2xs text-[var(--text-tertiary)]">
                {formatMetricLabel(key)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xs text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-150"
          >
            View source &#8599;
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xs text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors duration-150"
          >
            Live demo &#8599;
          </a>
        )}
      </div>
    </div>
  )
}

function formatMetricLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim()
}

function formatDateRange(startDate: string, endDate?: string): string {
  return endDate && endDate.trim() ? `${startDate} – ${endDate}` : startDate
}
