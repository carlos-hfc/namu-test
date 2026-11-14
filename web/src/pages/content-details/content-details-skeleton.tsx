import { Skeleton } from "@/components/skeleton"

export function ContentDetailsSkeleton() {
  return (
    <div className="grid gap-6">
      <Skeleton className="h-4 w-40" />

      <Skeleton className="h-80 max-lg:-mx-4" />

      <div className="border-b border-ring pb-6 space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-72" />
        <Skeleton className="h-4 w-60" />
      </div>

      <div className="flex max-lg:flex-col gap-6">
        <div className="space-y-1 flex-1">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-1/2 h-4" />
        </div>

        <Skeleton className="h-64 lg:w-1/3" />
      </div>
    </div>
  )
}
