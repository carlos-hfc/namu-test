import { cn } from "@namu-test/shared"
import { View, ViewProps } from "react-native"

type SkeletonProps = ViewProps

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <View
      className={cn("animate-pulse rounded-full bg-zinc-300", className)}
      {...props}
    />
  )
}
