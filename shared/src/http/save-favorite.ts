import { api } from "../lib/axios"

export interface SaveFavoriteRequest {
  contentId: number
}

export async function saveFavorite({ contentId }: SaveFavoriteRequest) {
  const response = await api.post("/favorites", { contentId })

  return response.data
}
