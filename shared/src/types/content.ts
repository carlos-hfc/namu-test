export interface Content {
  id: number
  title: string
  description: string
  category: string
  type: ContentType
  durationSeconds: number
  instructor: string
  thumbnailUrl: null | string
  publishedAt: string
}
export type ContentType = "article" | "audio" | "video"
