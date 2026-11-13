import type { ComponentProps } from "react"

import { cn } from "@/utils/cn"

interface BadgeProps extends ComponentProps<"button"> {
  isSelected?: boolean
}

export function Badge({ isSelected, className, ...props }: BadgeProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center justify-center rounded-full px-4 h-8 cursor-pointer border tracking-tight text-sm transition-all outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/30",
        className,
        isSelected
          ? "border-transparent bg-primary text-primary-foreground hover:bg-primary/80"
          : "border-muted-foreground bg-secondary text-secondary-foreground hover:bg-foreground/5",
      )}
      {...props}
    />
  )
}
