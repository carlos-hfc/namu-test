import { useNavigation } from "@react-navigation/native"
import { LucideArrowLeft, LucideHeart } from "lucide-react-native"
import { Text, TouchableOpacity, View } from "react-native"

import { colors } from "@/colors"

export function Header() {
  const navigation = useNavigation()

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

      <TouchableOpacity activeOpacity={0.7}>
        <LucideHeart
          color={colors.primary}
          fill={colors.primary}
        />
      </TouchableOpacity>
    </View>
  )
}
