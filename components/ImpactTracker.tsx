"use client"

import { useEffect, useState } from "react"
import { Globe, Heart } from "lucide-react"

function useAnimatedCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * target)

      setCount(current)

      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [target, duration])

  return count
}

export function ImpactTracker() {
  const storiesHeard = useAnimatedCounter(42, 2200)

  return (
    <section className="animate-fade-in-up">
      <div
        className="
          relative overflow-hidden rounded-3xl
          bg-gradient-to-br from-emerald-950 via-black to-teal-950
          border border-emerald-900/40
          p-8 text-center
        "
      >
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.15),transparent_60%)]" />

        <div className="relative">
          {/* Icon */}
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <Globe className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          {/* Counter */}
          <p className="text-6xl sm:text-7xl font-black text-white tracking-tight leading-none">
            {storiesHeard}
          </p>

          {/* Label */}
          <p className="text-lg sm:text-xl text-emerald-300/80 mt-3 font-medium text-balance">
            Your stories have been heard this week
          </p>

          {/* Subtext */}
          <div className="flex items-center justify-center gap-2 mt-5 text-sm text-zinc-500">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Craft traditions preserved through your voice</span>
          </div>
        </div>
      </div>
    </section>
  )
}
