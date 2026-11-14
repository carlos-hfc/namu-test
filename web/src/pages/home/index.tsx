import { useContents } from "@namu-test/shared"
import { LucideSearch } from "lucide-react"
import { useSearchParams } from "react-router"
import { z } from "zod"

import { Badge } from "./badge"
import { ContentCard } from "./content-card"
import { ContentGridSkeleton } from "./content-grid-skeleton"
import { Pagination } from "./pagination"

export function Home() {
  const [searchParams] = useSearchParams()

  const page = z.coerce.number().parse(searchParams.get("page") ?? 1)

  const { data: contents, isLoading: isLoadingContents } = useContents({ page })

  return (
    <div className="space-y-6">
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

      <section className="space-y-3">
        <div className="flex justify-between items-end border-b border-input">
          <h2 className="font-bold text-xl">Conteúdos</h2>
          <p className="text-sm">2 conteúdos</p>
        </div>

        <div className="grid gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoadingContents && <ContentGridSkeleton />}

          {contents?.data.map((content, i) => (
            <ContentCard
              key={i}
              content={content}
            />
          ))}
        </div>

        <Pagination />
      </section>
    </div>
  )
}
