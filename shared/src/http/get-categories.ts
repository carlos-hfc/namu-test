import { api } from "../lib/axios"
import type { Category } from "../types/category"

export interface GetCategoriesResponse {
  data: Category[]
}

export async function getCategories() {
  const response = await api.get<GetCategoriesResponse>("/categories")

  return response.data
}
