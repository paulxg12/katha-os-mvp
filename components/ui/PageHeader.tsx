import { cn } from "@/lib/utils/cn"

interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  className?: string
}

export function PageHeader({ title, subtitle, action, className }: PageHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between py-2", className)}>
      <div>
        <h1 className="text-2xl font-serif font-bold text-charcoal tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-charcoal-muted mt-0.5 font-sans">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
