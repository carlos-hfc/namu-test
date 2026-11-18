import { Content, ContentFilterSchema, useContents } from "@namu-test/shared"
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import { queryClient } from "@/lib/react-query"

type ContentsType = {
  contents: Content[]
  total: number
  filters: ContentFilterSchema
  hasActiveFilters: boolean
  applyFilters(data: ContentFilterSchema): void
  clearFilters(): void
  loadMore(): void
  isInitialLoading: boolean
  isLoadingMore: boolean
  refetch(): void
  isError: boolean
  isEmpty: boolean
}

const ContentsContext = createContext({} as ContentsType)

export const useContentsContext = () => useContext(ContentsContext)

const DEFAULT_FILTERS = {
  search: "",
  category: "all",
}

export function ContentsProvider({ children }: PropsWithChildren) {
  const [filters, setFilters] = useState<ContentFilterSchema>(DEFAULT_FILTERS)
  const [page, setPage] = useState(1)
  const [contents, setContents] = useState<Content[]>([])

  const { data, isLoading, isFetching, isError, refetch } = useContents({
    page,
    search: filters.search || null,
    category: filters.category === "all" ? null : filters.category,
  })

  const hasNextPage = data ? page < data.totalPages : false
  const hasActiveFilters = Boolean(
    filters.search || (filters.category && filters.category !== "all"),
  )
  const isInitialLoading = isLoading && page === 1
  const isLoadingMore = isLoading && page > 1
  const isEmpty = !isLoading && !isError && contents.length === 0

  useEffect(() => {
    if (!data?.data) return

    if (page === 1) {
      setContents(data.data)
    } else {
      setContents(prev => {
        const existingIds = new Set(prev.map(content => content.id))
        const newContents = data.data.filter(
          content => !existingIds.has(content.id),
        )

        return [...prev, ...newContents]
      })
    }
  }, [data, page])

  const applyFilters = useCallback((data: ContentFilterSchema) => {
    setPage(1)
    setFilters(data)
  }, [])

  const clearFilters = useCallback(() => {
    setPage(1)
    setFilters(DEFAULT_FILTERS)
  }, [])

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetching) setPage(prev => prev + 1)
  }, [hasNextPage, isFetching])

  const handleRefetch = useCallback(async () => {
    setContents([])
    setPage(1)

    queryClient.removeQueries({
      queryKey: ["contents"],
      predicate({ queryKey }) {
        const params = queryKey[1] as { page?: number } | undefined

        return Boolean(params?.page && params.page > 1)
      },
    })

    if (page === 1) await refetch()
  }, [page, refetch])

  const value = useMemo(() => {
    return {
      filters,
      applyFilters,
      clearFilters,
      loadMore,
      contents,
      total: data?.total ?? 0,
      hasActiveFilters,
      isInitialLoading,
      refetch: handleRefetch,
      isError,
      isLoadingMore,
      isEmpty,
    }
  }, [
    isEmpty,
    filters,
    applyFilters,
    clearFilters,
    loadMore,
    contents,
    data?.total,
    hasActiveFilters,
    isInitialLoading,
    handleRefetch,
    isError,
    isLoadingMore,
  ])

  return (
    <ContentsContext.Provider value={value}>
      {children}
    </ContentsContext.Provider>
  )
}
