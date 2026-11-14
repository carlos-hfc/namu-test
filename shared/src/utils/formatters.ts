import type { ContentType } from "../types/content"

export const contentTypeLabel: Record<ContentType, string> = {
  article: "artigo",
  audio: "áudio",
  video: "vídeo",
}

export function convertContentDuration(durationSeconds: number) {
  const seconds = Math.max(0, Math.round(durationSeconds))
  if (seconds < 60) return `${seconds}s`

  if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    return `${minutes}min`
  }

  const hours = Math.floor(seconds / 3600)
  return `${hours}h`
}
