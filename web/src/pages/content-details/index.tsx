import { LucideChevronLeft, LucideHeart } from "lucide-react"
import { Link } from "react-router"

export function ContentDetails() {
  return (
    <div className="grid gap-6">
      <Link
        to="/"
        className="text-primary font-medium text-sm flex items-center gap-2"
      >
        <LucideChevronLeft className="size-4" />

        <p>Voltar aos conteúdos</p>
      </Link>

      <figure className="relative max-h-120 max-lg:-mx-4">
        <img
          src="https://placehold.co/600x400"
          alt=""
          className="w-full lg:size-full lg:object-cover"
        />

        <button
          aria-label="Favoritar"
          className="absolute bottom-4 right-4 size-10 rounded-full z-1 border border-primary hover:bg-secondary/40 cursor-pointer flex items-center justify-center"
        >
          <LucideHeart className="text-primary stroke-1 size-6" />
        </button>
      </figure>

      <div className="border-b border-ring pb-6 space-y-3">
        <span className="text-primary text-sm">categoria</span>
        <h1 className="text-4xl font-bold">Título</h1>
        <p className="text-sm text-muted-foreground">Publicado em</p>
      </div>

      <div className="flex max-lg:flex-col gap-6">
        <p className="pb-6 lg:pb-0 border-b lg:border-none border-ring flex-1">
          Descrição
        </p>

        <aside className="rounded-lg border border-ring p-4 space-y-5 lg:w-1/3">
          <h2 className="font-bold uppercase text-xl">Informações</h2>

          <div className="space-y-3">
            <div>
              <h3 className="uppercase font-semibold">Tipo</h3>
              <p>Áudio</p>
            </div>

            <div>
              <h3 className="uppercase font-semibold">Instrutor</h3>
              <p>Carlos Faustino</p>
            </div>

            <div>
              <h3 className="uppercase font-semibold">Duração</h3>
              <p>1h</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
