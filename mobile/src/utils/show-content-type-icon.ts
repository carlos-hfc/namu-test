import { ContentType } from "@namu-test/shared"
import {
  LucideFileText,
  LucideHeadphones,
  LucideIcon,
  LucidePlayCircle,
} from "lucide-react-native"

export const contentTypeIcon: Record<ContentType, LucideIcon> = {
  article: LucideFileText,
  audio: LucideHeadphones,
  video: LucidePlayCircle,
}
