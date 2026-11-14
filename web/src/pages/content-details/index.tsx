import {
  contentTypeLabel,
  convertContentDuration,
  useContent,
  useToggleFavorite,
} from "@namu-test/shared"
import { LucideChevronLeft, LucideHeart } from "lucide-react"
import { Link, useParams } from "react-router"
import z from "zod"

import noImage from "@/assets/no-image.webp"
import { cn } from "@/utils/cn"

import { ContentDetailsSkeleton } from "./content-details-skeleton"

export function ContentDetails() {
  const { contentId } = useParams<{ contentId: string }>()

  const id = z.coerce.number().parse(contentId)

  const { data: content, isLoading: isLoadingContent } = useContent({
    contentId: id,
  })

  const { mutate, isPending } = useToggleFavorite()

  function toggleFavorite() {
    mutate({
      contentId: id,
      isCurrentlyFavorited: content?.isFavorite ?? false,
    })
  }

  if (isLoadingContent) return <ContentDetailsSkeleton />

  if (!content) return null

  return (
    <div className="grid gap-6">
      <Link
        to="/"
        className="text-primary font-medium text-sm flex items-center gap-2"
      >
        <LucideChevronLeft className="size-4" />
        Voltar aos conteúdos
      </Link>

      <figure className="relative max-h-120 max-lg:-mx-4">
        <img
          src={content.thumbnailUrl ?? noImage}
          alt={content.title}
          className="w-full lg:size-full lg:object-cover"
        />

        <button
          disabled={isPending}
          aria-label={
            content.isFavorite
              ? "Remover conteúdos dos favoritos"
              : "Salvar conteúdo aos favoritos"
          }
          className={cn(
            "absolute bottom-4 right-4 size-10 rounded-full z-1 transition-colors cursor-pointer flex items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:pointer-events-none",
            content.isFavorite
              ? "bg-primary hover:bg-primary/80"
              : "hover:bg-primary/10",
          )}
          onClick={toggleFavorite}
        >
          <LucideHeart
            className={cn(
              "stroke-1 size-6",
              content.isFavorite
                ? "fill-background text-background"
                : "text-primary",
            )}
          />
        </button>
      </figure>

      <div className="border-b border-ring pb-6 space-y-3">
        <span className="text-primary text-sm">{content.category}</span>
        <h1 className="text-4xl font-bold">{content.title}</h1>
        <p className="text-sm text-muted-foreground">
          Publicado em{" "}
          {new Date(content.publishedAt).toLocaleString("pt-br", {
            dateStyle: "medium",
          })}
        </p>
      </div>

      <div className="flex max-lg:flex-col gap-6">
        <p className="pb-6 lg:pb-0 border-b lg:border-none border-ring flex-1">
          {content.description}
        </p>

        <aside className="rounded-lg border border-ring p-4 space-y-5 lg:w-1/3">
          <h2 className="font-bold uppercase text-xl">Informações</h2>

          <div className="space-y-3">
            <div>
              <h3 className="uppercase font-semibold">Tipo</h3>
              <p className="capitalize">{contentTypeLabel[content.type]}</p>
            </div>

            <div>
              <h3 className="uppercase font-semibold">Instrutor</h3>
              <p>{content.instructor}</p>
            </div>

            <div>
              <h3 className="uppercase font-semibold">Duração</h3>
              <p>{convertContentDuration(content.durationSeconds)}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
