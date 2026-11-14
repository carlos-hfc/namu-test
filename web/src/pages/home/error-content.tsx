import { LucideAlertCircle } from "lucide-react"

interface ErrorContentProps {
  refetch(): Promise<any>
}

export function ErrorContent({ refetch }: ErrorContentProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 border border-dashed border-muted-foreground/40 rounded-2xl space-y-3">
      <LucideAlertCircle className="size-10 text-destructive" />

      <div className="space-y-1">
        <h3 className="font-bold text-lg">
          Não foi possível carregar os conteúdos
        </h3>
        <p className="text-sm text-muted-foreground">
          Ocorreu uma falha na comunicação com o servidor. Tente novamente.
        </p>
      </div>

      <button
        type="button"
        onClick={refetch}
        className="bg-primary border border-transparent outline-none rounded-full px-4 h-10 font-bold focus-visible:ring-2 focus-visible:ring-primary/30 text-sm text-background cursor-pointer"
      >
        Tentar novamente
      </button>
    </div>
  )
}
