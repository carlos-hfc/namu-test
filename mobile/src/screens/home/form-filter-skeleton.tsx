import { View } from "react-native"

import { Skeleton } from "@/components/skeleton"

export function FormFilterSkeleton() {
  return (
    <View className="gap-3">
      <Skeleton className="w-full h-10 bg-zinc-700" />

      <Skeleton className="w-full h-10 bg-zinc-700" />

      <View className="flex-row items-center justify-center gap-2">
        <Skeleton className="flex-1 h-10 bg-zinc-700" />
        <Skeleton className="flex-1 h-10 bg-zinc-700" />
      </View>
    </View>
  )
}
