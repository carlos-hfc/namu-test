import { api } from "../lib/axios"
import type { Content } from "../types/content"

export interface GetContentsRequest {
  page: number
}

export interface GetContentsResponse {
  data: Content[]
  page: number
  limit: number
  total: number
  totalPages: number
}

export async function getContents({ page }: GetContentsRequest) {
  const response = await api.get<GetContentsResponse>("/contents", {
    params: {
      page,
    },
  })

  return response.data
}
