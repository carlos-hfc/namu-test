import {
  Content,
  ContentType,
  contentTypeLabel,
  convertContentDuration,
} from "@namu-test/shared"
import { useNavigation } from "@react-navigation/native"
import {
  LucideFileText,
  LucideHeadphones,
  LucideHeart,
  LucideIcon,
  LucidePlayCircle,
} from "lucide-react-native"
import { Image, Text, TouchableOpacity, View } from "react-native"

import { colors } from "@/colors"

interface ContentCardProps {
  content: Content
  isFavorite?: boolean
}

const icon: Record<ContentType, LucideIcon> = {
  article: LucideFileText,
  audio: LucideHeadphones,
  video: LucidePlayCircle,
}

export function ContentCard({ content, isFavorite = false }: ContentCardProps) {
  const navigation = useNavigation()
  const Icon = icon[content.type]
  const ariaLabel = contentTypeLabel[content.type]

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      className="rounded-xl bg-background shadow-sm shadow-black/30 overflow-hidden"
      onPress={() => navigation.navigate("content-details", { id: content.id })}
    >
      <View className="relative">
        <View className="absolute bg-primary/70 rounded-br-lg p-1.5 z-10">
          <Icon
            color={colors.background}
            size={16}
          />
        </View>

        {isFavorite && (
          <LucideHeart
            style={{ position: "absolute", right: 8, top: 8 }}
            color={colors.primary}
            fill={colors.primary}
            size={16}
          />
        )}

        <Image
          source={
            content.thumbnailUrl
              ? { uri: content.thumbnailUrl }
              : require("@/assets/no-image.png")
          }
          alt=""
          className="w-full h-48"
        />

        <Text className="absolute bottom-2 right-2 text-background bg-foreground/70 rounded-full text-xs px-2 py-1">
          {convertContentDuration(content.durationSeconds)}
        </Text>
      </View>

      <View className="px-3 py-2 gap-1">
        <Text className="text-primary font-medium text-sm">
          {content.category}
        </Text>
        <Text
          className="font-bold text-lg"
          numberOfLines={1}
        >
          {content.title}
        </Text>
        <Text
          className="text-sm"
          numberOfLines={2}
        >
          {content.description}
        </Text>
        <Text className="text-muted-foreground text-sm mt-2">
          publicado em{" "}
          {new Date(content.publishedAt).toLocaleString("pt-br", {
            dateStyle: "medium",
          })}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
