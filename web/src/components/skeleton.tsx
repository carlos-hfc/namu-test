import type { ComponentProps } from "react"

import { cn } from "@/utils/cn"

type SkeletonProps = ComponentProps<"div">

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-zinc-300", className)}
      {...props}
    />
  )
}
