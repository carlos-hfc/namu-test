import {
  cn,
  contentTypeLabel,
  convertContentDuration,
  publishedDate,
  useContent,
  useToggleFavorite,
} from "@namu-test/shared"
import { LucideHeart } from "lucide-react"
import { useParams } from "react-router"
import { toast } from "sonner"
import z from "zod"

import noImage from "@/assets/no-image.webp"
import { Button } from "@/components/button"
import { ErrorContent } from "@/components/error-content"

import { ContentDetailsSkeleton } from "./content-details-skeleton"
import { ContentNotFound } from "./content-not-found"
import { GoBackLink } from "./go-back-link"

export function ContentDetails() {
  const { contentId } = useParams<{ contentId: string }>()

  const parsedId = z.coerce.number().safeParse(contentId)
  const id = parsedId.success ? parsedId.data : 0

  const {
    data: content,
    isLoading: isLoadingContent,
    isError: isErrorContent,
    refetch: refetchContent,
    error: errorContent,
  } = useContent({
    contentId: id,
  })

  const { mutate, isPending } = useToggleFavorite()

  function toggleFavorite() {
    const isCurrentlyFavorited = content?.isFavorite ?? false

    mutate(
      {
        contentId: id,
        isCurrentlyFavorited,
      },
      {
        onError() {
          toast.error(
            isCurrentlyFavorited
              ? "Não foi possível remover dos favoritos"
              : "Não foi possível salvar nos favoritos",
            { id: "toggle-favorite-error" },
          )
        },
      },
    )
  }

  const statusCode =
    (errorContent as any)?.response?.status ?? (errorContent as any)?.statusCode
  const isNotFound = !parsedId.success || statusCode === 404

  if (isLoadingContent) return <ContentDetailsSkeleton />

  if (isNotFound) {
    return <ContentNotFound />
  }

  if (isErrorContent || !content) {
    return (
      <div className="space-y-6">
        <GoBackLink />

        <ErrorContent
          refetch={() => refetchContent()}
          title="Não foi possível carregar o conteúdo"
          text="Ocorreu uma falha ao buscar as informações. Verifique sua conexão e tente novamente."
        />
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      <GoBackLink />

      <figure className="relative max-h-120 max-lg:-mx-4">
        <img
          src={content.thumbnailUrl ?? noImage}
          alt={content.title}
          className="w-full lg:size-full lg:object-cover"
        />

        <Button
          variant={content.isFavorite ? "primary" : "ghost"}
          className={cn("absolute bottom-4 right-4 size-10 z-1 p-0")}
          onClick={toggleFavorite}
          disabled={isPending}
          aria-label={
            content.isFavorite
              ? "Remover conteúdos dos favoritos"
              : "Salvar conteúdo aos favoritos"
          }
        >
          <LucideHeart
            className={cn(
              "stroke-1 size-6",
              content.isFavorite
                ? "fill-background text-background"
                : "text-primary",
            )}
          />
        </Button>
      </figure>

      <div className="border-b border-ring pb-6 space-y-3">
        <span className="text-primary text-sm">{content.category}</span>
        <h1 className="text-4xl font-bold">{content.title}</h1>
        <p className="text-sm text-muted-foreground">
          Publicado em {publishedDate(content.publishedAt)}
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
