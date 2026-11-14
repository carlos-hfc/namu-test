import { LucideAlertCircle } from "lucide-react"

import { GoBackLink } from "./go-back-link"

interface ErrorContentDetailsProps {
  refetch(): Promise<any>
}

export function ErrorContentDetails({ refetch }: ErrorContentDetailsProps) {
  return (
    <div className="space-y-6">
      <GoBackLink />

      <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-2xl space-y-4">
        <LucideAlertCircle className="size-12 text-destructive" />

        <div className="space-y-1">
          <h1 className="font-bold text-xl">
            Não foi possível carregar o conteúdo
          </h1>
          <p className="text-sm text-muted-foreground max-w-md">
            Ocorreu uma falha ao buscar as informações. Verifique sua conexão e
            tente novamente.
          </p>
        </div>

        <button
          type="button"
          onClick={refetch}
          className="bg-primary border border-transparent outline-none rounded-full px-4 h-10 font-bold focus-visible:ring-2 focus-visible:ring-primary/30 text-sm text-background max-lg:flex-1 cursor-pointer"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  )
}
