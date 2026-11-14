import { LucideChevronLeft, LucideChevronRight } from "lucide-react"

export function Pagination() {
  return (
    <nav
      role="navigation"
      aria-label="Paginação"
      className="mx-auto flex w-full justify-center"
    >
      <div className="flex items-center gap-2">
        <button
          disabled
          className="border border-transparent transition-all flex items-center justify-center rounded-lg select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/80 cursor-pointer size-6 disabled:opacity-50 disabled:pointer-events-none"
        >
          <LucideChevronLeft className="size-4" />
        </button>
        <button
          aria-current="page"
          className="border border-transparent transition-all flex items-center justify-center rounded-lg select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/80 text-sm cursor-pointer size-6 tabular-nums aria-[current=page]:bg-primary aria-[current=page]:text-background"
        >
          1
        </button>
        <button className="border border-transparent transition-all flex items-center justify-center rounded-lg select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/80 text-sm cursor-pointer size-6 tabular-nums aria-[current=page]:bg-primary aria-[current=page]:text-background">
          2
        </button>
        <button className="border border-transparent transition-all flex items-center justify-center rounded-lg select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/80 text-sm cursor-pointer size-6 tabular-nums aria-[current=page]:bg-primary aria-[current=page]:text-background">
          3
        </button>
        <button className="border border-transparent transition-all flex items-center justify-center rounded-lg select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/80 cursor-pointer size-6 disabled:opacity-50 disabled:pointer-events-none">
          <LucideChevronRight className="size-4" />
        </button>
      </div>
    </nav>
  )
}
