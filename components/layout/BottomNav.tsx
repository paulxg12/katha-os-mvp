"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils/cn"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

interface BottomNavProps {
  items: NavItem[]
  className?: string
}

export function BottomNav({ items, className }: BottomNavProps) {
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-parchment-card/95 backdrop-blur-md border-t border-parchment-border px-3 pb-safe z-50 shadow-organic-lg",
        className
      )}
    >
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {items.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/vendor" && pathname.startsWith(item.href))
          const isAddBtn = item.label === "Add"

          if (isAddBtn) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center justify-center -mt-6 group"
              >
                <div className="w-13 h-13 rounded-full bg-gradient-to-br from-ochre to-ochre-dark text-white flex items-center justify-center shadow-organic border-4 border-parchment group-hover:scale-105 active:scale-95 transition-all">
                  <svg className="w-6 h-6 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-ochre mt-0.5">
                  {item.label}
                </span>
              </Link>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-2xl transition-all duration-200",
                isActive
                  ? "text-ochre font-bold bg-ochre-fixed/50"
                  : "text-charcoal-muted hover:text-charcoal hover:bg-parchment-border/40"
              )}
            >
              <div className="w-5 h-5 flex items-center justify-center">{item.icon}</div>
              <span className="text-[10px] font-semibold tracking-tight">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
