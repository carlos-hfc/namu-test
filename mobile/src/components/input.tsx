import { cn } from "@namu-test/shared"
import { LucideSearch } from "lucide-react-native"
import { useState } from "react"
import { TextInput, TextInputProps, View } from "react-native"

import { colors } from "@/colors"

type InputProps = TextInputProps

export function Input({ className, ...props }: InputProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <View
      className={cn(
        "flex-row items-center gap-2 h-10 border border-muted-foreground rounded-full px-4",
        isFocused && "border-primary",
      )}
    >
      <LucideSearch
        color={isFocused ? colors.primary : colors["muted-foreground"]}
        size={16}
      />

      <TextInput
        {...props}
        className={cn("flex-1 text-sm text-primary-foreground", className)}
        placeholder="Busque por um título"
        placeholderTextColor={colors["muted-foreground"]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onEndEditing={() => setIsFocused(false)}
      />
    </View>
  )
}
