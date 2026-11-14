import { api } from "../lib/axios"
import type { Content } from "../types/content"

export interface GetContentByIdRequest {
  contentId: number
}

export type GetContentByIdResponse = Content

export async function getContentById({ contentId }: GetContentByIdRequest) {
  const response = await api.get<GetContentByIdResponse>(
    `/contents/${contentId}`,
  )

  return response.data
}
