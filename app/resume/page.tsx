import resumeData from "@/resume-data.json"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume",
}

export default function ResumePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-16">
      {/* Header */}
      <section className="pt-8 md:pt-16">
        <h1 className="font-heading font-bold text-[2rem] md:text-[2.5rem] tracking-tight text-[var(--text-primary)] mb-2">
          Resume
        </h1>
        <p className="text-[var(--text-secondary)] mb-6">
          {resumeData.education[0].degree} · {resumeData.education[0].institution}
        </p>
        <div className="flex flex-wrap gap-3">
          <DownloadLink href="/temp_CV.pdf" label="Download CV" primary />
          <DownloadLink href="/sde.pdf" label="SDE Resume" />
          <DownloadLink href="/aiml.pdf" label="AI/ML Resume" />
        </div>
      </section>

      {/* Contact */}
      <section>
        <SectionHead>Contact</SectionHead>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <ContactItem
            label="Email"
            value={resumeData.personalInfo.email}
            href={`mailto:${resumeData.personalInfo.email}`}
          />
          <ContactItem
            label="GitHub"
            value="prats3992"
            href={resumeData.personalInfo.github}
            external
          />
          <ContactItem
            label="LinkedIn"
            value="pratham3992arora"
            href={resumeData.personalInfo.linkedin}
            external
          />
        </div>
      </section>

      {/* Education */}
      <section>
        <SectionHead>Education</SectionHead>
        {resumeData.education.map((edu, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <div>
              <h3 className="font-heading font-bold text-[var(--text-primary)]">
                {edu.institution}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">{edu.degree}</p>
            </div>
            <div className="text-right">
              <span className="font-mono text-sm font-medium text-[var(--accent)]">
                CGPA: {edu.cgpa}
              </span>
              <p className="font-mono text-2xs text-[var(--text-tertiary)]">
                {edu.startDate} – {edu.endDate}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section>
        <SectionHead>Skills</SectionHead>
        <div className="space-y-4">
          <SkillRow label="Languages" items={resumeData.skills.languages} />
          <SkillRow label="AI / ML" items={resumeData.skills.aiMl} />
          <SkillRow label="Web & Backend" items={resumeData.skills.webBackend} />
          <SkillRow label="Cloud & Tools" items={resumeData.skills.cloudTools} />
        </div>
      </section>

      {/* Research Experience */}
      <section>
        <SectionHead>Research Experience</SectionHead>
        {resumeData.researchExperience.map((exp, i) => (
          <ExperienceBlock
            key={i}
            title={exp.title}
            subtitle={`${exp.supervisor} · ${exp.organization}`}
            date={`${exp.startDate} – ${exp.endDate}`}
            achievements={exp.achievements}
          />
        ))}
      </section>

      {/* Industry Experience */}
      <section>
        <SectionHead>Industry Experience</SectionHead>
        <div className="space-y-8">
          {resumeData.industryExperience.map((exp, i) => (
            <ExperienceBlock
              key={i}
              title={exp.title}
              subtitle={`${exp.company} · ${exp.location}`}
              date={`${exp.startDate} – ${exp.endDate}`}
              achievements={exp.achievements}
            />
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section>
        <SectionHead>Leadership</SectionHead>
        <div className="space-y-8">
          {resumeData.leadership.map((item, i) => (
            <ExperienceBlock
              key={i}
              title={item.title}
              subtitle={item.organization}
              date={`${item.startDate} – ${item.endDate}`}
              achievements={item.achievements}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

/* ─── Sub-components ─── */

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-xs font-medium tracking-[0.08em] uppercase text-[var(--text-tertiary)] mb-6 pb-2 border-b border-[var(--border)]">
      {children}
    </h2>
  )
}

function DownloadLink({
  href,
  label,
  primary,
}: {
  href: string
  label: string
  primary?: boolean
}) {
  return (
    <a
      href={href}
      download
      className={`inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors duration-150 ${
        primary
          ? "bg-[var(--accent)] text-[var(--bg-primary)] hover:opacity-90"
          : "border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-tertiary)]"
      }`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" y1="15" x2="12" y2="3" />
      </svg>
      {label}
    </a>
  )
}

function ContactItem({
  label,
  value,
  href,
  external,
}: {
  label: string
  value: string
  href: string
  external?: boolean
}) {
  return (
    <div>
      <p className="text-2xs text-[var(--text-tertiary)] uppercase tracking-wider mb-1">
        {label}
      </p>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-sm text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-150"
      >
        {value}
        {external && <span className="ml-0.5 text-2xs">&#8599;</span>}
      </a>
    </div>
  )
}

function SkillRow({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
      <span className="text-2xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider w-28 shrink-0 pt-1">
        {label}
      </span>
      <div className="flex flex-wrap gap-1.5">
        {items.map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 text-2xs font-mono text-[var(--text-secondary)] bg-[var(--bg-elevated)] border border-[var(--border)] rounded"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

function ExperienceBlock({
  title,
  subtitle,
  date,
  achievements,
}: {
  title: string
  subtitle: string
  date: string
  achievements: string[]
}) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
        <div>
          <h3 className="font-heading font-bold text-[var(--text-primary)]">
            {title}
          </h3>
          <p className="text-sm text-[var(--text-secondary)]">{subtitle}</p>
        </div>
        <span className="font-mono text-2xs text-[var(--text-tertiary)] shrink-0">
          {date}
        </span>
      </div>
      <ul className="space-y-1.5">
        {achievements.map((a, j) => (
          <li
            key={j}
            className="text-sm text-[var(--text-secondary)] leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-px before:bg-[var(--text-tertiary)]"
          >
            {a}
          </li>
        ))}
      </ul>
    </div>
  )
}
