import { cn } from "@/lib/utils/cn"

interface BadgeProps {
  children: React.ReactNode
  variant?: "default" | "success" | "warning" | "info" | "ochre" | "indigo" | "terracotta" | "muted"
  className?: string
}

const variantClasses = {
  default: "bg-parchment-border text-charcoal border-parchment-dark",
  success: "bg-emerald-50 text-emerald-800 border-emerald-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  info: "bg-sky-50 text-sky-800 border-sky-200",
  ochre: "bg-ochre-fixed text-ochre-dark border-ochre/20",
  indigo: "bg-indigo-fixed text-indigo-dark border-indigo-brand/20",
  terracotta: "bg-terracotta-light/40 text-terracotta border-terracotta/20",
  muted: "bg-parchment-card text-charcoal-muted border-parchment-border",
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border shadow-2xs transition-colors",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
