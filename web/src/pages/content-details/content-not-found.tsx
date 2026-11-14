import { LucideFileX } from "lucide-react"
import { Link } from "react-router"

import { GoBackLink } from "./go-back-link"

export function ContentNotFound() {
  return (
    <div className="space-y-6">
      <GoBackLink />

      <div className="flex flex-col items-center justify-center text-center py-16 px-4 rounded-2xl space-y-4">
        <LucideFileX className="size-12 text-muted-foreground" />
        <div className="space-y-1">
          <h1 className="font-bold text-xl">Conteúdo não encontrado</h1>

          <p className="text-sm text-muted-foreground max-w-md">
            O conteúdo que você está procurando não existe ou foi removido.
          </p>
        </div>

        <Link
          to="/"
          className="flex items-center bg-primary border border-transparent outline-none rounded-full px-4 h-10 font-bold focus-visible:ring-2 focus-visible:ring-primary/30 text-sm text-background max-lg:flex-1 cursor-pointer"
        >
          Explorar conteúdos
        </Link>
      </div>
    </div>
  )
}
