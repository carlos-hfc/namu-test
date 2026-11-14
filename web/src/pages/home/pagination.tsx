import { LucideChevronLeft, LucideChevronRight } from "lucide-react"

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange(page: number): Promise<void> | void
}

export function Pagination({
  onPageChange,
  page,
  totalPages,
}: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="Paginação"
      className="mx-auto flex w-full justify-center"
    >
      <div className="flex items-center gap-2">
        <button
          disabled={page === 1}
          className="border border-transparent transition-all flex items-center justify-center rounded-lg select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/80 cursor-pointer size-6 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Página anterior"
          onClick={() => onPageChange(page - 1)}
        >
          <LucideChevronLeft className="size-4" />
        </button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            aria-current={page === i + 1 ? "page" : undefined}
            className="border border-transparent transition-all flex items-center justify-center rounded-lg select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/80 text-sm cursor-pointer size-6 tabular-nums aria-[current=page]:bg-primary aria-[current=page]:text-background"
            aria-label={`Página ${i + 1}`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === totalPages}
          className="border border-transparent transition-all flex items-center justify-center rounded-lg select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/80 cursor-pointer size-6 disabled:opacity-50 disabled:pointer-events-none"
          aria-label="Próxima página"
          onClick={() => onPageChange(page + 1)}
        >
          <LucideChevronRight className="size-4" />
        </button>
      </div>
    </nav>
  )
}
