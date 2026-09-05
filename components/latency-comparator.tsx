"use client"

import { useState, useEffect, useRef } from "react"

type FeedbackMode = "embodied" | "visual" | "verbal"

interface ModeConfig {
  number: string
  shortLabel: string
  mechanism: string
  userAttribution: string
  godspeedScore: string
}

const MODES: Record<FeedbackMode, ModeConfig> = {
  embodied: {
    number: "01",
    shortLabel: "Embodied Gestures",
    mechanism: "Head tilt, lowered pitch, sustained eye contact",
    userAttribution: "Attributed to cognitive reflection / active thought",
    godspeedScore: "Animacy M = 4.12 (SD = 0.61) · p < 0.05",
  },
  visual: {
    number: "02",
    shortLabel: "Visual Spinner",
    mechanism: "2D circular loading ring in field of view",
    userAttribution: "Attributed to software buffering / network lag",
    godspeedScore: "Animacy M = 2.45 (SD = 0.78)",
  },
  verbal: {
    number: "03",
    shortLabel: "Verbal Filler",
    mechanism: "Spoken phrase: 'Hmm, let me consider that...'",
    userAttribution: "Naturalistic initially, but caused turn-taking collisions",
    godspeedScore: "Animacy M = 3.38 (SD = 0.70)",
  },
}

export function LatencyComparator() {
  const [activeMode, setActiveMode] = useState<FeedbackMode>("embodied")
  const [isRunning, setIsRunning] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [completed, setCompleted] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const startTimeRef = useRef<number>(0)

  const TARGET_MS = 1800 // 1.8s baseline

  const startSimulation = () => {
    if (isRunning) return
    setIsRunning(true)
    setCompleted(false)
    setElapsed(0)
    startTimeRef.current = Date.now()

    if (timerRef.current) clearInterval(timerRef.current)

    timerRef.current = setInterval(() => {
      const diff = Date.now() - startTimeRef.current
      if (diff >= TARGET_MS) {
        setElapsed(TARGET_MS)
        setIsRunning(false)
        setCompleted(true)
        if (timerRef.current) clearInterval(timerRef.current)
      } else {
        setElapsed(diff)
      }
    }, 25)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const current = MODES[activeMode]
  const progressPercent = Math.min(100, Math.round((elapsed / TARGET_MS) * 100))

  return (
    <div className="border border-[var(--border)] rounded bg-[var(--bg-elevated)] p-4 sm:p-6 my-6 sm:my-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 border-b border-[var(--border)] pb-4">
        <div>
          <h3 className="font-heading font-bold text-heading-sm text-[var(--text-primary)]">
            VR Latency Feedback Comparator
          </h3>
          <p className="text-caption text-[var(--text-tertiary)] mt-0.5">
            Simulating user wait-state perception under identical 1.80s latency (N=18 study)
          </p>
        </div>
        <div className="font-mono text-data text-[var(--text-tertiary)]">
          Baseline: <span className="text-[var(--text-primary)]">1.80s</span>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        {(Object.keys(MODES) as FeedbackMode[]).map((mode) => {
          const isSelected = activeMode === mode
          return (
            <button
              key={mode}
              onClick={() => {
                setActiveMode(mode)
                setIsRunning(false)
                setCompleted(false)
                setElapsed(0)
              }}
              className={`p-3 rounded text-left transition-colors border font-mono ${
                isSelected
                  ? "border-[var(--accent)] bg-[var(--bg-primary)] text-[var(--text-primary)]"
                  : "border-[var(--border)] bg-[var(--bg-primary)]/50 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)]"
              }`}
            >
              <div className="flex items-baseline gap-2">
                <span className={isSelected ? "text-[var(--accent)] font-bold" : "text-[var(--text-tertiary)]"}>
                  {MODES[mode].number}
                </span>
                <span className="font-sans font-medium text-caption text-[var(--text-primary)]">
                  {MODES[mode].shortLabel}
                </span>
              </div>
              <div className="text-micro text-[var(--text-tertiary)] mt-1 truncate">
                {mode === "embodied" ? "Wilcoxon p < 0.05" : mode === "visual" ? "HUD Spinner" : "Verbal Bridge"}
              </div>
            </button>
          )
        })}
      </div>

      {/* Digital Diagnostic Readout Box */}
      <div className="bg-[var(--bg-primary)] border border-[var(--border)] rounded p-4 sm:p-5 space-y-5 font-mono">
        {/* Telemetry bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-data text-[var(--text-tertiary)] border-b border-[var(--border)] pb-2">
          <span className="truncate sm:overflow-visible">QUERY: &ldquo;How do planets maintain stable orbits?&rdquo;</span>
          <span className="text-[var(--accent)] font-semibold shrink-0">
            {(elapsed / 1000).toFixed(2)}s / 1.80s
          </span>
        </div>

        {/* State Display */}
        <div className="py-4 text-center space-y-2 min-h-[90px] flex flex-col justify-center">
          {!isRunning && !completed && (
            <div className="text-caption font-sans text-[var(--text-secondary)]">
              Select a condition above and run the simulated 1.8s query.
            </div>
          )}

          {isRunning && (
            <div className="space-y-1">
              <div className="text-data text-[var(--accent)] font-medium">
                [OUTPUT]: {current.mechanism}
              </div>
              <div className="text-caption font-sans text-[var(--text-secondary)] italic">
                {current.userAttribution}
              </div>
            </div>
          )}

          {completed && (
            <div className="space-y-1">
              <div className="text-data text-[var(--accent)]">
                [SYNTHESIZED]: 1.80s elapsed
              </div>
              <div className="text-caption font-sans text-[var(--text-primary)]">
                &ldquo;Planets maintain stable orbits due to the precise balance between forward velocity and gravitational pull.&rdquo;
              </div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="w-full bg-[var(--border)] h-1 rounded overflow-hidden">
            <div
              className="bg-[var(--accent)] h-full transition-all duration-75 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-1 text-micro text-[var(--text-tertiary)]">
            <span>Audio Ingestion &rarr; Gemini 2.5 Flash</span>
            <span>Cloud TTS Synthesis</span>
          </div>
        </div>
      </div>

      {/* Trigger Button & Readouts */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        <button
          onClick={startSimulation}
          disabled={isRunning}
          className={`px-4 py-2.5 rounded text-caption font-mono font-medium transition-colors text-center ${
            isRunning
              ? "bg-[var(--border)] text-[var(--text-tertiary)] cursor-not-allowed"
              : "bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent)] hover:text-[var(--bg-primary)] font-semibold"
          }`}
        >
          {isRunning ? "Running 1.8s Simulation..." : "Run Simulated Query"}
        </button>

        <div className="font-mono text-data text-[var(--text-tertiary)]">
          Measurement: <span className="text-[var(--accent)]">{current.godspeedScore}</span>
        </div>
      </div>

      {/* Crawlable Empirical Result */}
      <div className="border-t border-[var(--border)] pt-4 text-caption text-[var(--text-secondary)] leading-relaxed">
        <strong className="text-[var(--text-primary)]">Empirical Result:</strong> In the within-subjects trial (N=18), embodied non-verbal cues scored significantly higher on animacy and immersion than visual HUD indicators (Wilcoxon signed-rank, p &lt; 0.05). Communicating wait states through physical motion causes users to interpret latency as cognitive reflection rather than system stall.
      </div>
    </div>
  )
}
