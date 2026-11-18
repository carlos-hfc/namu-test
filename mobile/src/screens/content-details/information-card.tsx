import { LucideHeadphones, LucideIcon } from "lucide-react-native"
import { Text, View } from "react-native"

import { colors } from "@/colors"

interface InformationCardProps {
  title: string
  text: string
  icon: LucideIcon
}

export function InformationCard() {
  return (
    <View className="gap-1 border border-border rounded-lg flex-1 p-3">
      <LucideHeadphones
        size={16}
        color={colors.primary}
        style={{ position: "absolute", right: 8, top: 8 }}
      />
      <Text className="text-sm font-semibold">Tipo</Text>
      <Text className="text-lg font-bold">Áudio</Text>
    </View>
  )
}
