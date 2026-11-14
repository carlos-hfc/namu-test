import {
  type Content,
  type ContentType,
  contentTypeLabel,
  convertContentDuration,
} from "@namu-test/shared"
import {
  LucideFileText,
  LucideHeadphones,
  type LucideIcon,
  LucidePlayCircle,
} from "lucide-react"
import { Link } from "react-router"

import noImage from "@/assets/no-image.webp"

interface ContentCardProps {
  content: Content
}

const icon: Record<ContentType, LucideIcon> = {
  article: LucideFileText,
  audio: LucideHeadphones,
  video: LucidePlayCircle,
}

export function ContentCard({ content }: ContentCardProps) {
  const Icon = icon[content.type]
  const ariaLabel = contentTypeLabel[content.type]

  return (
    <Link
      to={`/content/${content.id}`}
      className="rounded-xl overflow-hidden transition-all flex flex-col hover:shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/80"
    >
      <figure className="relative h-52 lg:h-44">
        <span
          className="absolute bg-primary/70 rounded-br-lg p-1"
          aria-label={ariaLabel}
        >
          <Icon className="text-background size-5" />
        </span>

        <img
          src={content.thumbnailUrl ?? noImage}
          alt={content.title}
          className="size-full object-cover"
        />

        <figcaption className="absolute bottom-2 right-2 text-background bg-foreground/70 rounded-full text-xs px-2 py-1">
          {convertContentDuration(content.durationSeconds)}
        </figcaption>
      </figure>

      <div className="px-3 lg:px-4 py-2 lg:py-3 space-y-1">
        <span className="text-primary text-sm font-medium">
          {content.category}
        </span>
        <h3 className="font-bold text-lg line-clamp-1">{content.title}</h3>
        <p className="line-clamp-2 text-sm">{content.description}</p>
        <p className="text-muted-foreground text-sm mt-2">
          Publicado em{" "}
          {new Date(content.publishedAt).toLocaleString("pt-br", {
            dateStyle: "medium",
          })}
        </p>
      </div>
    </Link>
  )
}
