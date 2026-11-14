import { LucideSearchX } from "lucide-react"

interface EmptyContentProps {
  hasActiveFilters?: boolean
}

export function EmptyContent({ hasActiveFilters }: EmptyContentProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 border border-dashed border-muted-foreground/40 rounded-2xl space-y-3">
      <LucideSearchX className="size-10 text-muted-foreground" />

      <div className="space-y-1">
        <h3 className="font-bold text-lg">Nenhum conteúdo encontrado</h3>
        <p className="text-sm text-muted-foreground">
          {hasActiveFilters
            ? "Não encontramos resultados para os filtros aplicados."
            : "Ainda não há conteúdos disponíveis no momento."}
        </p>
      </div>
    </div>
  )
}
