import { useContents, useFavorites } from "@namu-test/shared"
import { useEffect } from "react"
import { useSearchParams } from "react-router"
import { toast } from "sonner"
import { z } from "zod"

import { Skeleton } from "@/components/skeleton"

import { ContentCard } from "./content-card"
import { ContentGridSkeleton } from "./content-grid-skeleton"
import { EmptyContent } from "./empty-content"
import { ErrorContent } from "./error-content"
import { FormFilter } from "./form-filter"
import { Pagination } from "./pagination"

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = z.coerce.number().parse(searchParams.get("page") ?? 1)
  const search = searchParams.get("search")
  const category = searchParams.get("category")

  const {
    data: contents,
    isLoading: isLoadingContents,
    isError: isErrorContents,
    refetch: refetchContents,
  } = useContents({
    page,
    search,
    category,
  })

  const {
    data: favorites,
    isError: isErrorFavorites,
    refetch: refetchFavorites,
  } = useFavorites()

  useEffect(() => {
    if (isErrorFavorites) {
      toast.error("Não foi possível carregar seus favoritos", {
        id: "favorites-error",
        action: {
          label: "Tentar novamente",
          onClick: () => refetchFavorites(),
        },
      })
    } else {
      toast.dismiss("favorites-error")
    }
  }, [isErrorFavorites, refetchFavorites])

  const hasActiveFilters = Boolean(search || (category && category !== "all"))
  const isEmptyContents =
    !isLoadingContents && !isErrorContents && contents?.data.length === 0

  function handlePaginate(page: number) {
    setSearchParams(prev => {
      prev.set("page", String(page))

      return prev
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-bold text-3xl">Conteúdos</h1>
        <p>
          Conteúdos de bem-estar (meditações, aulas de yoga, artigos de nutrição
          e muito mais)
        </p>
      </div>

      <FormFilter />

      <section className="space-y-6">
        <div className="flex justify-between items-end border-b border-input pb-1">
          <h2 className="font-bold text-xl">Conteúdos</h2>
          {isLoadingContents ? (
            <Skeleton className="h-4 w-24" />
          ) : (
            <p className="text-sm">{contents?.total ?? 0} conteúdo(s)</p>
          )}
        </div>

        {isErrorContents && <ErrorContent refetch={() => refetchContents()} />}

        {isEmptyContents && (
          <EmptyContent hasActiveFilters={hasActiveFilters} />
        )}

        {!isErrorContents && !isEmptyContents && (
          <div className="grid gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {isLoadingContents && <ContentGridSkeleton />}

            {contents?.data.map(content => (
              <ContentCard
                key={content.id}
                content={content}
                isFavorite={favorites?.ids?.has(content.id)}
              />
            ))}
          </div>
        )}

        {!isErrorContents &&
          !isEmptyContents &&
          contents &&
          contents.totalPages > 1 && (
            <Pagination
              page={contents.page}
              onPageChange={handlePaginate}
              totalPages={contents?.totalPages}
            />
          )}
      </section>
    </div>
  )
}
