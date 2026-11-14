import { parseApiError } from "../api-error"
import { api } from "../lib/axios"
import type { Category } from "../types/category"

export interface GetCategoriesResponse {
  data: Category[]
}

export async function getCategories() {
  try {
    const response = await api.get<GetCategoriesResponse>("/categories")

    return response.data
  } catch (error) {
    throw parseApiError(error, "Não foi possível carregar as categorias")
  }
}
