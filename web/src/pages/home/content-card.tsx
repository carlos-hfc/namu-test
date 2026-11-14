import { LucideHeadphones } from "lucide-react"

export function ContentCard() {
  return (
    <a
      href=""
      className="rounded-xl overflow-hidden transition-all grid hover:shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-primary/80"
    >
      <figure className="relative">
        <span
          className="absolute bg-primary/70 rounded-br-lg p-1"
          aria-label="áudio"
        >
          <LucideHeadphones className="text-background size-5" />
        </span>

        <img
          src="https://placehold.co/600x400"
          alt=""
          className="w-full"
        />

        <figcaption className="absolute bottom-2 right-2 text-background bg-foreground/70 rounded-full text-xs px-2 py-1">
          tempo
        </figcaption>
      </figure>

      <div className="px-3 lg:px-4 py-2 lg:py-3">
        <span className="text-primary text-sm font-medium mb-1 block">
          categoria
        </span>
        <h3 className="font-bold text-lg line-clamp-2">Tìtulo</h3>
        <p className="line-clamp-3">descrição</p>
        <p className="text-muted-foreground text-sm mt-2">publicado em</p>
      </div>
    </a>
  )
}
