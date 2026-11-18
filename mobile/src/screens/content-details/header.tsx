import { useToggleFavorite } from "@namu-test/shared"
import { useNavigation } from "@react-navigation/native"
import { LucideArrowLeft, LucideHeart } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"

import { colors } from "@/colors"

interface HeaderProps {
  isFavorite?: boolean
  contentId: number
}

export function Header({ contentId, isFavorite = false }: HeaderProps) {
  const navigation = useNavigation()

  const { mutate, isPending } = useToggleFavorite()

  function toggleFavorite() {
    const isCurrentlyFavorited = isFavorite

    mutate({
      contentId,
      isCurrentlyFavorited,
    })
  }

  return (
    <View className="flex-row items-center justify-between">
      <TouchableOpacity
        className="flex-row items-center gap-1"
        activeOpacity={0.7}
        onPress={() => navigation.goBack()}
      >
        <LucideArrowLeft
          size={16}
          color={colors.primary}
        />

        <Text className="text-primary text-sm">Voltar aos conteúdos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleFavorite}
        disabled={isPending}
      >
        <LucideHeart
          color={colors.primary}
          fill={isFavorite ? colors.primary : "transparent"}
        />
      </TouchableOpacity>
    </View>
  )
}
