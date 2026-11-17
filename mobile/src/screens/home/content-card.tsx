import { LucideFileText, LucideHeart } from "lucide-react-native"
import { Image, Text, View } from "react-native"

import { colors } from "@/colors"

export function ContentCard() {
  return (
    <View className="rounded-xl bg-background shadow-sm shadow-black/30 overflow-hidden">
      <View className="relative">
        <View className="absolute bg-primary/70 rounded-br-lg p-1.5">
          <LucideFileText
            color={colors.background}
            size={16}
          />
        </View>

        <LucideHeart
          style={{ position: "absolute", right: 8, top: 8 }}
          color={colors.primary}
          fill={colors.primary}
          size={16}
        />

        <Image
          source={require("@/assets/no-image.png")}
          alt=""
          className="w-full h-48"
        />

        <Text className="absolute bottom-2 right-2 text-background bg-foreground/70 rounded-full text-xs px-2 py-1">
          45min
        </Text>
      </View>

      <View className="px-3 py-2 gap-1">
        <Text className="text-primary font-medium text-sm">categoria</Text>
        <Text
          className="font-bold text-lg"
          numberOfLines={1}
        >
          Titulo
        </Text>
        <Text
          className="text-sm"
          numberOfLines={2}
        >
          descricao
        </Text>
        <Text className="text-muted-foreground text-sm mt-2">publicado em</Text>
      </View>
    </View>
  )
}
