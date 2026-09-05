"use client"

import { useState } from "react"

interface ErrorSample {
  id: string
  objectName: string
  task: string
  model: string
  groundTruth: string
  modelPrediction: string
  errorCategory: "Misidentification" | "Miscalibration" | "Pixel Shortcut" | "Perceptual Collapse"
  modelReasoning: string
  rootCauseAnalysis: string
  blurCondition: "Clear" | "Tier-1 Blur" | "Tier-2 Blur"
}

const SAMPLES: ErrorSample[] = [
  {
    id: "steel-weight",
    objectName: "Machined Steel Paperweight",
    task: "Weight Estimation",
    model: "GPT-5.4",
    groundTruth: "650 g (Digital Scale)",
    modelPrediction: "45 g",
    errorCategory: "Misidentification",
    blurCondition: "Clear",
    modelReasoning:
      "“The object is an injection-molded grey plastic cylinder with a hollow core, typical of office desk organizers. Estimated mass is approximately 45 grams.”",
    rootCauseAnalysis:
      "Total material misidentification. Model mistook solid machined tool steel for hollow consumer plastic due to matte finish, triggering a 14x under-estimation.",
  },
  {
    id: "brass-cylinder",
    objectName: "Solid Brass Calibration Rod",
    task: "Weight Estimation",
    model: "Gemini 3.1 Pro",
    groundTruth: "320 g (Digital Scale)",
    modelPrediction: "790 g",
    errorCategory: "Miscalibration",
    blurCondition: "Clear",
    modelReasoning:
      "“Correctly identified as a polished yellow brass cylindrical rod. Brass has a density of ~8.5 g/cm³. Estimating length at ~12cm and radius 1.5cm yields a volume of ~85 cm³, indicating a mass of ~790g.”",
    rootCauseAnalysis:
      "Material and geometry correctly identified, but spatial volume was ungrounded (estimated 12cm length vs. true 6.8cm caliper measurement), inflating mass by 2.47x.",
  },
  {
    id: "water-bottle",
    objectName: "Aluminium Water Bottle",
    task: "Height Estimation",
    model: "Gemini-Robotics-ER",
    groundTruth: "21.5 cm (Digital Caliper)",
    modelPrediction: "36.0 cm",
    errorCategory: "Pixel Shortcut",
    blurCondition: "Clear",
    modelReasoning:
      "“The aluminium container occupies approximately 78% of the vertical sensor frame. Based on typical indoor focal length, this indicates a large industrial thermos measuring ~36 cm.”",
    rootCauseAnalysis:
      "Pixel-coverage cheating: Model derived physical dimension directly from bounding-box percentage of the image height rather than perspective geometry. Moving the camera closer increased the predicted height by 67%.",
  },
  {
    id: "ceramic-mug-blur",
    objectName: "Ceramic Coffee Mug",
    task: "Weight Estimation",
    model: "Claude Opus 4.7",
    groundTruth: "340 g (Digital Scale)",
    modelPrediction: "1,250 g",
    errorCategory: "Perceptual Collapse",
    blurCondition: "Tier-2 Blur",
    modelReasoning:
      "“Under image degradation, the dark cylindrical silhouette appears solid, heavy, and metallic, consistent with a cast-iron kettlebell base or counterweight.”",
    rootCauseAnalysis:
      "Optical blur stripped specular edge highlights on the glazed rim, triggering a catastrophic classification shift from ceramic tableware to solid iron industrial equipment.",
  },
]

export function VlmErrorBrowser() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [activeSampleId, setActiveSampleId] = useState<string>(SAMPLES[0].id)

  const categories = ["All", "Misidentification", "Miscalibration", "Pixel Shortcut", "Perceptual Collapse"]

  const filtered =
    selectedCategory === "All"
      ? SAMPLES
      : SAMPLES.filter((s) => s.errorCategory === selectedCategory)

  const current = SAMPLES.find((s) => s.id === activeSampleId) || filtered[0] || SAMPLES[0]

  return (
    <div className="border border-[var(--border)] rounded bg-[var(--bg-elevated)] p-4 sm:p-6 my-6 sm:my-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-[var(--border)] pb-4">
        <div>
          <h3 className="font-heading font-bold text-heading-sm text-[var(--text-primary)]">
            VLM Failure Mode Browser
          </h3>
          <p className="text-caption text-[var(--text-tertiary)] mt-0.5">
            Empirical diagnostic samples from 459 benchmark images
          </p>
        </div>
        <div className="font-mono text-data text-[var(--text-tertiary)]">
          Ground Truth: <span className="text-[var(--text-primary)]">Scales &amp; Calipers</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto sm:flex-wrap gap-1.5 sm:gap-2 border-b border-[var(--border)] pb-3 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat)
              const firstMatching = cat === "All" ? SAMPLES[0] : SAMPLES.find((s) => s.errorCategory === cat)
              if (firstMatching) setActiveSampleId(firstMatching.id)
            }}
            className={`px-2.5 py-1 rounded text-data font-mono whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? "bg-[var(--bg-primary)] border border-[var(--accent)] text-[var(--text-primary)]"
                : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sample Selector Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
        {filtered.map((sample) => {
          const isSelected = activeSampleId === sample.id
          return (
            <button
              key={sample.id}
              onClick={() => setActiveSampleId(sample.id)}
              className={`p-3 rounded text-left transition-colors border ${
                isSelected
                  ? "border-[var(--accent)] bg-[var(--bg-primary)] text-[var(--text-primary)]"
                  : "border-[var(--border)] bg-[var(--bg-primary)]/50 text-[var(--text-secondary)] hover:border-[var(--text-tertiary)]"
              }`}
            >
              <div className="font-mono text-micro text-[var(--text-tertiary)]">
                {sample.model}
              </div>
              <div className="font-medium text-caption truncate mt-0.5">
                {sample.objectName}
              </div>
              <div className="text-micro font-mono text-[var(--text-tertiary)] mt-1">
                {sample.errorCategory}
              </div>
            </button>
          )
        })}
      </div>

      {/* Diagnostic Readout Panel */}
      {current && (
        <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded p-4 sm:p-5 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border)] pb-3 font-mono text-data">
            <div>
              <div className="font-sans font-bold text-base text-[var(--text-primary)]">
                {current.objectName}
              </div>
              <div className="text-[var(--text-tertiary)] mt-0.5">
                Model: {current.model} · Condition: {current.blurCondition}
              </div>
            </div>
            <span className="text-[var(--text-secondary)] font-medium">
              [{current.errorCategory}]
            </span>
          </div>

          {/* Value Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 rounded bg-[var(--bg-elevated)] border border-[var(--border)]">
              <div className="text-caption font-medium text-[var(--text-secondary)] mb-0.5 font-sans">
                Ground Truth (Verified Instrument)
              </div>
              <div className="font-mono text-base font-bold text-[var(--accent)]">
                {current.groundTruth}
              </div>
            </div>

            <div className="p-3 rounded bg-[var(--bg-elevated)] border border-[var(--border)]">
              <div className="text-caption font-medium text-[var(--text-secondary)] mb-0.5 font-sans">
                Model Output Prediction
              </div>
              <div className="font-mono text-base font-bold text-[var(--text-primary)]">
                {current.modelPrediction}
              </div>
            </div>
          </div>

          {/* Model Reasoning Trace */}
          <div className="space-y-1.5">
            <div className="text-caption font-medium text-[var(--text-secondary)] font-sans">
              Extracted Chain-of-Thought Reasoning
            </div>
            <div className="font-mono text-caption text-[var(--text-secondary)] italic border-l border-[var(--border)] pl-3 py-1">
              {current.modelReasoning}
            </div>
          </div>

          {/* Diagnostic Takeaway */}
          <div className="space-y-1">
            <div className="text-caption font-medium text-[var(--text-secondary)] font-sans">
              Diagnostic Takeaway
            </div>
            <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
              {current.rootCauseAnalysis}
            </p>
          </div>
        </div>
      )}

      {/* Crawlable Finding */}
      <div className="border-t border-[var(--border)] pt-4 text-caption text-[var(--text-secondary)] leading-relaxed">
        <strong className="text-[var(--text-primary)]">Core Observation:</strong> Models like GPT-5.4 fail by misidentifying material composition entirely (confusing dense metal with plastic), while Gemini variants correctly identify materials but overestimate scale by 1.8x–2.5x due to uncalibrated volume estimation. On height tasks, models systematically rely on 2D bounding-box pixel percentages rather than true 3D perspective geometry.
      </div>
    </div>
  )
}
