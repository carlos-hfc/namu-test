import { api } from "../lib/axios"
import type { Content } from "../types/content"

export interface GetContentsRequest {
  page: number
  search?: string | null
  category?: string | null
}

export interface GetContentsResponse {
  data: Content[]
  page: number
  limit: number
  total: number
  totalPages: number
}

export async function getContents({
  page,
  category,
  search,
}: GetContentsRequest) {
  const response = await api.get<GetContentsResponse>("/contents", {
    params: {
      page,
      search,
      category: category === "all" ? null : category,
    },
  })

  return response.data
}
