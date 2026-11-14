import { Skeleton } from "@/components/skeleton"

export function ContentGridSkeleton() {
  return Array.from({ length: 6 }).map((_, i) => (
    <div
      key={i}
      className="rounded-xl overflow-hidden transition-all grid hover:shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/80"
    >
      <div className="h-52 lg:h-44">
        <Skeleton className="size-full" />
      </div>

      <div className="px-3 lg:px-4 py-2 lg:py-3 space-y-2">
        <Skeleton className="w-18 h-3" />
        <Skeleton className="w-24 h-5" />
        <div className="space-y-1">
          <Skeleton className="w-full h-4" />
          <Skeleton className="w-1/2 h-4" />
        </div>
        <Skeleton className="w-48 h-4" />
      </div>
    </div>
  ))
}
