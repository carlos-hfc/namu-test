import { cn } from "@namu-test/shared"
import type { ComponentProps } from "react"

type ButtonVariant = "primary" | "secondary" | "ghost"

interface ButtonProps extends ComponentProps<"button"> {
  variant?: ButtonVariant
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const buttonVariant = {
    primary: "bg-primary text-background",
    secondary: "border-primary text-primary",
    ghost: "hover:border-primary",
  }[variant]

  return (
    <button
      {...props}
      className={cn(
        "flex items-center justify-center select-none border border-transparent outline-none rounded-full px-4 h-10 font-bold text-sm cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-primary/80 hover:brightness-90 disabled:opacity-50 disabled:pointer-events-none",
        buttonVariant,
        className,
      )}
    />
  )
}
