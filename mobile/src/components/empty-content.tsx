import { LucideSearchX } from "lucide-react-native"
import { Text, View } from "react-native"

import { colors } from "@/colors"

interface EmptyContentProps {
  title: string
  text: string
}

export function EmptyContent({ text, title }: EmptyContentProps) {
  return (
    <View className="items-center justify-center rounded-xl gap-3 px-4 py-6 flex-1">
      <LucideSearchX
        color={colors["muted-foreground"]}
        size={40}
      />

      <View className="gap-1">
        <Text className="text-center text-lg font-bold">{title}</Text>
        <Text className="text-center text-base text-muted-foreground">
          {text}
        </Text>
      </View>
    </View>
  )
}
