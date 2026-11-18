import { LucideAlertCircle } from "lucide-react"

import { Button } from "./button"

interface ErrorContentProps {
  refetch(): Promise<any>
  title: string
  text: string
}

export function ErrorContent({ refetch, text, title }: ErrorContentProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 border border-dashed border-muted-foreground/40 rounded-2xl space-y-3">
      <LucideAlertCircle className="size-10 text-destructive" />

      <div className="space-y-1">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>

      <Button onClick={refetch}>Tentar novamente</Button>
    </div>
  )
}
