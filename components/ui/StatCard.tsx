import { cn } from "@/lib/utils/cn"

interface StatCardProps {
  label: string
  value: string | number
  subtext?: string
  icon?: React.ReactNode
  trend?: { value: number; isPositive: boolean }
  variant?: "parchment" | "ochre" | "indigo"
  className?: string
}

export function StatCard({ label, value, subtext, icon, trend, variant = "parchment", className }: StatCardProps) {
  if (variant === "ochre") {
    return (
      <div
        className={cn(
          "bg-gradient-to-br from-ochre to-ochre-dark text-white rounded-3xl p-5 border border-ochre-container shadow-organic relative overflow-hidden",
          className
        )}
      >
        <div className="flex items-start justify-between relative z-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-ochre-light">{label}</p>
            <p className="text-2xl font-bold font-serif mt-1">{value}</p>
            {subtext && <p className="text-xs text-white/80 mt-1">{subtext}</p>}
          </div>
          {icon && (
            <div className="w-10 h-10 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center text-white">
              {icon}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "bg-parchment-card rounded-3xl p-5 border border-parchment-border shadow-organic transition-all hover:border-ochre/30 hover:shadow-organic-lg",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-charcoal-muted">{label}</p>
          <p className="text-2xl font-bold font-serif text-charcoal mt-1">{value}</p>
          {subtext && <p className="text-xs text-charcoal-muted mt-1">{subtext}</p>}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-2xl bg-parchment-border/50 flex items-center justify-center text-ochre">
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1.5">
          <span
            className={cn(
              "text-xs font-bold px-2 py-0.5 rounded-full",
              trend.isPositive ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
            )}
          >
            {trend.isPositive ? "↑" : "↓"} {trend.value}%
          </span>
          <span className="text-[11px] text-charcoal-muted">vs last month</span>
        </div>
      )}
    </div>
  )
}
