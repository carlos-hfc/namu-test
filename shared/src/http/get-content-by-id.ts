import { api } from "../lib/axios"
import type { ContentDetail } from "../types/content"

export interface GetContentByIdRequest {
  contentId: number
}

export type GetContentByIdResponse = ContentDetail

export async function getContentById({ contentId }: GetContentByIdRequest) {
  const response = await api.get<GetContentByIdResponse>(
    `/contents/${contentId}`,
  )

  return response.data
}
