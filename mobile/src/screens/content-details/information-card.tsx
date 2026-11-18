import { cn } from "@namu-test/shared"
import { LucideIcon } from "lucide-react-native"
import { Text, View } from "react-native"

import { colors } from "@/colors"

interface InformationCardProps {
  title: string
  text: string
  Icon: LucideIcon
  className?: string
}

export function InformationCard({
  Icon,
  text,
  title,
  className,
}: InformationCardProps) {
  return (
    <View
      className={cn(
        "gap-1 border border-border rounded-lg flex-1 p-3",
        className,
      )}
    >
      <Icon
        size={16}
        color={colors.primary}
        style={{ position: "absolute", right: 8, top: 8 }}
      />
      <Text className="text-sm font-semibold">{title}</Text>
      <Text className="text-lg font-bold capitalize">{text}</Text>
    </View>
  )
}
