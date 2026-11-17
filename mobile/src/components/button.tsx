import { cn } from "@namu-test/shared"
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

type ButtonVariant = "primary" | "secondary"

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant
}

export function Button({
  variant = "primary",
  children,
  className,
  ...props
}: ButtonProps) {
  const buttonVariant = {
    primary: "bg-primary",
    secondary: "bg-transparent",
  }[variant]

  const textVariant = {
    primary: "text-background",
    secondary: "text-primary",
  }[variant]

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      className={cn(
        "border border-primary rounded-full px-4 h-10 items-center justify-center",
        buttonVariant,
        className,
      )}
    >
      <Text className={cn("text-sm font-bold", textVariant)}>{children}</Text>
    </TouchableOpacity>
  )
}
