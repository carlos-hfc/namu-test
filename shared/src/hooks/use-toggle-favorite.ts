import { useMutation, useQueryClient } from "@tanstack/react-query"

import type { GetFavoritesResponse } from "../http/get-favorites"
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
      const contentKey = ["contents", contentId]
      const favoritesKey = ["favorites"]

      await Promise.all([
        queryClient.cancelQueries({ queryKey: favoritesKey }),
        queryClient.cancelQueries({ queryKey: contentKey }),
      ])

      const previousFavorites =
        queryClient.getQueryData<GetFavoritesResponse>(favoritesKey)
      const previousContent =
        queryClient.getQueryData<ContentDetail>(contentKey)

      queryClient.setQueryData<ContentDetail>(contentKey, updater => {
        if (updater) {
          return { ...updater, isFavorite: !isCurrentlyFavorited }
        }

        return updater
      })

      queryClient.setQueryData<GetFavoritesResponse>(favoritesKey, updater => {
        if (!updater) return updater

        if (isCurrentlyFavorited) {
          return {
            ...updater,
            data: updater.data.filter(item => item.id !== contentId),
          }
        }

        const newFavoriteItem =
          previousContent ?? ({ id: contentId } as ContentDetail)

        return {
          ...updater,
          data: [...updater.data, newFavoriteItem],
        }
      })

      return { previousContent, previousFavorites }
    },
    onError: (_, { contentId }, context) => {
      if (context?.previousContent) {
        queryClient.setQueryData(
          ["contents", contentId],
          context.previousContent,
        )
      }
      if (context?.previousFavorites) {
        queryClient.setQueryData(["favorites"], context.previousFavorites)
      }
    },
    onSettled: (_, __, { contentId }) => {
      queryClient.invalidateQueries({ queryKey: ["contents", contentId] })
      queryClient.invalidateQueries({ queryKey: ["favorites"] })
    },
  })
}
