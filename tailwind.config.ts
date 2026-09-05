import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-ibm-plex-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        surface: {
          primary: "var(--bg-primary)",
          elevated: "var(--bg-elevated)",
          hover: "var(--bg-hover)",
        },
        border: "var(--border)",
        content: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          muted: "var(--accent-muted)",
        },
      },
      maxWidth: {
        content: "70rem",
        reading: "65ch",
      },
      borderRadius: {
        DEFAULT: "4px",
        sm: "2px",
        md: "6px",
      },
      fontSize: {
        micro: ["0.6875rem", { lineHeight: "1rem" }],        // 11px - strict measurement indices
        data: ["0.75rem", { lineHeight: "1rem" }],            // 12px - dates, stats, coordinates, code
        caption: ["0.8125rem", { lineHeight: "1.2rem" }],     // 13px - secondary context
        base: ["0.9375rem", { lineHeight: "1.5rem" }],         // 15px - standard body reading size
        "body-lg": ["1.0625rem", { lineHeight: "1.65rem" }],   // 17px - lead paragraphs
        "heading-sm": ["1.3125rem", { lineHeight: "1.75rem" }],// 21px
        "heading-md": ["1.6875rem", { lineHeight: "2.1rem" }], // 27px
        "heading-lg": ["2.125rem", { lineHeight: "2.4rem" }],  // 34px
        "heading-xl": ["2.75rem", { lineHeight: "3rem" }],     // 44px
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],         // compatibility alias
      },
    },
  },
  plugins: [],
}

export default config
