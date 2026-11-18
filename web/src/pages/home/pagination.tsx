import { LucideChevronLeft, LucideChevronRight } from "lucide-react"

import { Button } from "@/components/button"

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
        <Button
          variant="ghost"
          disabled={page === 1}
          className="rounded-lg size-6 p-0"
          aria-label="Página anterior"
          onClick={() => onPageChange(page - 1)}
        >
          <LucideChevronLeft className="size-4" />
        </Button>
        {Array.from({ length: totalPages }).map((_, i) => (
          <Button
            key={i}
            variant="ghost"
            aria-current={page === i + 1 ? "page" : undefined}
            className="rounded-lg size-6 p-0 font-normal tabular-nums aria-[current=page]:bg-primary aria-[current=page]:text-background"
            aria-label={`Página ${i + 1}`}
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          variant="ghost"
          disabled={page === totalPages}
          className="rounded-lg size-6 p-0"

          aria-label="Próxima página"
          onClick={() => onPageChange(page + 1)}
        >
          <LucideChevronRight className="size-4" />
        </Button>
      </div>
    </nav>
  )
}
