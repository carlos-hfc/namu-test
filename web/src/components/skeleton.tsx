import { cn } from "@namu-test/shared"
import type { ComponentProps } from "react"

type SkeletonProps = ComponentProps<"div">

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-zinc-300", className)}
      {...props}
    />
  )
}
