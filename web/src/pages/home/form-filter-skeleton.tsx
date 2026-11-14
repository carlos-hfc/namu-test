import { Skeleton } from "@/components/skeleton"

export function FormFilterSkeleton() {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-3">
      <Skeleton className="h-10 w-full lg:w-80 rounded-full" />
      <Skeleton className="h-10 w-full lg:w-64" />

      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-full lg:w-18" />
        <Skeleton className="h-10 w-full lg:w-24" />
      </div>
    </div>
  )
}
