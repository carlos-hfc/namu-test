import { useMutation, useQueryClient } from "@tanstack/react-query"

import { removeFavorite } from "../http/remove-favorite"
import { saveFavorite } from "../http/save-favorite"
import type { ContentDetail } from "../types/content"

interface ToggleFavorite {
  contentId: number
  isCurrentlyFavorited: boolean
}

export function useToggleFavorite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ contentId, isCurrentlyFavorited }: ToggleFavorite) => {
      if (isCurrentlyFavorited) return removeFavorite({ contentId })

      return saveFavorite({ contentId })
    },
    onMutate: async ({ contentId, isCurrentlyFavorited }) => {
      const queryKey = ["contents", contentId]

      await queryClient.cancelQueries({ queryKey })

      const cachedData = queryClient.getQueryData<ContentDetail>(queryKey)

      queryClient.setQueryData<ContentDetail>(queryKey, current => {
        if (current) {
          return { ...current, isFavorite: isCurrentlyFavorited }
        }

        return current
      })

      return { cachedData }
    },
    onError: (_, { contentId }, context) => {
      if (context?.cachedData) {
        queryClient.setQueryData(["contents", contentId], context.cachedData)
      }
    },
    onSettled: (_, __, { contentId }) => {
      queryClient.invalidateQueries({ queryKey: ["contents", contentId] })
    },
  })
}
