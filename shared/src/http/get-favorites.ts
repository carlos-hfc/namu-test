import { parseApiError } from "../api-error"
import { api } from "../lib/axios"
import type { Content } from "../types/content"

export interface GetFavoritesResponse {
  data: Content[]
}

export async function getFavorites() {
  try {
    const response = await api.get<GetFavoritesResponse>("/favorites")

    return response.data
  } catch (error) {
    throw parseApiError(error, "Não foi possível carregar os seus favoritos")
  }
}
