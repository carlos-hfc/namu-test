import { LucideSearch } from "lucide-react"

import { Badge } from "./badge"

export function Home() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h1 className="font-bold text-3xl">Conteúdos</h1>
        <p>
          Conteúdos de bem-estar (meditações, aulas de yoga, artigos de nutrição
          e muito mais)
        </p>
      </div>

      <form className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div>
          <label
            htmlFor="search"
            className="sr-only"
          >
            Busque pelo conteúdo
          </label>

          <div className="group flex items-center flex-row gap-2 h-10 border border-muted-foreground rounded-full px-4 text-sm transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
            <LucideSearch className="size-4 text-muted-foreground group-focus-within:text-primary" />

            <input
              id="search"
              type="text"
              className="flex-1 outline-none"
              placeholder="Busque por um título"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none touch-pan-x min-h-10">
          {Array.from({ length: 7 }).map((_, i) => (
            <Badge
              key={i}
              isSelected={i === 1}
            >
              teste
            </Badge>
          ))}
        </div>
      </form>
    </div>
  )
}
