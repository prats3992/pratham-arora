"use client"

import { cn } from "@/lib/utils"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import type React from "react"
import { useBento } from "./bento-grid"
import { X } from "lucide-react"

interface BentoItemProps {
  children?: React.ReactNode
  className?: string
  colSpan?: 1 | 2 | 3 | 4
  rowSpan?: 1 | 2 | 3 | 4
  id?: string
}

export const BentoItem = ({
  children,
  className,
  colSpan = 1,
  rowSpan = 1,
  id,
}: BentoItemProps) => {
  const { selectedId, setSelectedId } = useBento()
  const isSelected = id && selectedId === id
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const mouseXStr = useMotionTemplate`${mouseX}px`
  const mouseYStr = useMotionTemplate`${mouseY}px`
  
  const background = useMotionTemplate`radial-gradient(
    650px circle at ${mouseXStr} ${mouseYStr},
    rgba(163, 230, 53, 0.15),
    transparent 80%
  )`

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    if (isSelected) return
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  // Map numbers to Tailwind classes for grid-column
  const colSpanClass = {
    1: "col-span-1 md:col-span-1",
    2: "col-span-2 md:col-span-2",
    3: "col-span-2 md:col-span-3",
    4: "col-span-2 md:col-span-4",
  }[colSpan]

  const rowSpanClass = {
    1: "row-span-1 md:row-span-1",
    2: "row-span-1 md:row-span-2", // Reset row span on mobile to avoid gaps
    3: "row-span-2 md:row-span-3",
    4: "row-span-2 md:row-span-4",
  }[rowSpan]

  return (
    <div className={cn(colSpanClass, rowSpanClass, isSelected ? "z-50" : "z-auto", "relative")}>
      <motion.div
        layoutId={id}
        layout={true}
        data-expanded={isSelected}
        onClick={() => id && !isSelected && setSelectedId(id)}
        initial="initial"
        animate="animate"
        variants={{
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
            "group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md transition-shadow",
            isSelected ? 
            "fixed inset-4 md:inset-20 z-50 flex flex-col bg-slate-900/95 border-white/20 shadow-2xl overflow-y-auto" : 
            "h-full p-6 hover:bg-white/10 hover:shadow-xl cursor-pointer",
            className
        )}
        onMouseMove={handleMouseMove}
      >
        {/* Close Button */}
        {isSelected && (
            <motion.button 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 z-50"
            >
                <X className="w-6 h-6" />
            </motion.button>
        )}

        {/* Glow Effect */}
        {!isSelected && (
            <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
                background
            }}
            />
        )}
        
        <div className={cn("relative z-10 w-full", isSelected ? "p-8" : "h-full")}>
            {children}
        </div>
      </motion.div>
    </div>
  )
}
