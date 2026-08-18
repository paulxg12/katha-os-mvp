"use client"

import { cn } from "@/lib/utils/cn"

interface MicButtonProps {
  isListening: boolean
  onClick: () => void
  className?: string
}

export function MicButton({ isListening, onClick, className }: MicButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300",
        isListening
          ? "bg-red-500 animate-pulse scale-110"
          : "bg-blue-600 hover:bg-blue-700",
        className
      )}
    >
      <span className="text-white text-5xl">{isListening ? "STOP" : "MIC"}</span>
    </button>
  )
}
