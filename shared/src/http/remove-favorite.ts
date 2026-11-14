import { api } from "../lib/axios"

export interface RemoveFavoriteRequest {
  contentId: number
}

export async function removeFavorite({ contentId }: RemoveFavoriteRequest) {
  await api.delete(`/favorites/${contentId}`)
}
