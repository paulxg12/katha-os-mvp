import { cn } from "@/lib/utils/cn"

interface AvatarProps {
  src?: string | null
  name: string
  size?: "sm" | "md" | "lg" | "xl" | "2xl"
  className?: string
  showBadge?: boolean
}

const sizeClasses = {
  sm: "w-9 h-9 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-16 h-16 text-lg",
  xl: "w-20 h-20 text-xl",
  "2xl": "w-24 h-24 text-2xl",
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function Avatar({ src, name, size = "md", className, showBadge = false }: AvatarProps) {
  return (
    <div className="relative inline-block flex-shrink-0">
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn(
            "rounded-full object-cover border-2 border-parchment-border shadow-sm",
            sizeClasses[size],
            className
          )}
        />
      ) : (
        <div
          className={cn(
            "rounded-full flex items-center justify-center font-bold tracking-tight text-white bg-gradient-to-br from-ochre via-ochre-container to-ochre-dark border-2 border-parchment-border shadow-organic",
            sizeClasses[size],
            className
          )}
        >
          {getInitials(name)}
        </div>
      )}
      {showBadge && (
        <span
          className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] text-white font-bold"
          title="Verified Master Artisan"
        >
          ✓
        </span>
      )}
    </div>
  )
}
