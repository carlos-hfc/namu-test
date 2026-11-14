import { LucideChevronLeft } from "lucide-react"
import { Link } from "react-router"

export function GoBackLink() {
  return (
    <Link
      to="/"
      className="text-primary font-medium text-sm flex items-center gap-2 outline-none rounded-full w-max focus-visible:ring-2 focus-visible:ring-primary"
    >
      <LucideChevronLeft className="size-4" />
      Voltar aos conteúdos
    </Link>
  )
}
