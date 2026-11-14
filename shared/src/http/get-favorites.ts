import { api } from "../lib/axios"
import type { Content } from "../types/content"

export interface GetFavoritesResponse {
  data: Content[]
}

export async function getFavorites() {
  const response = await api.get<GetFavoritesResponse>("/favorites")

  return response.data
}
