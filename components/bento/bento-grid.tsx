"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useState, createContext, useContext } from "react"

// Create Context
type BentoContextType = {
  selectedId: string | null
  setSelectedId: (id: string | null) => void
}

export const BentoContext = createContext<BentoContextType>({
  selectedId: null,
  setSelectedId: () => {},
})

export const useBento = () => useContext(BentoContext)

interface BentoGridProps {
  children: React.ReactNode
  className?: string
}

export const BentoGrid = ({ children, className }: BentoGridProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  return (
    <BentoContext.Provider value={{ selectedId, setSelectedId }}>
      <motion.div
        initial="initial"
        animate="animate"
        variants={{
          initial: { opacity: 0 },
          animate: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className={cn("grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto p-4 auto-rows-[minmax(180px,auto)]", className)}
      >
        {children}
      </motion.div>
      
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </BentoContext.Provider>
  )
}
