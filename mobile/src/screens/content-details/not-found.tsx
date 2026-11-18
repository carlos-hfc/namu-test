import { useNavigation } from "@react-navigation/native"
import { LucideFileX } from "lucide-react-native"
import { Text, View } from "react-native"

import { colors } from "@/colors"
import { Button } from "@/components/button"

export function NotFound() {
  const navigation = useNavigation()

  return (
    <View className="flex-1 items-center justify-center gap-3 px-8">
      <LucideFileX
        size={40}
        color={colors["muted-foreground"]}
      />

      <View className="gap-1">
        <Text className="text-center font-bold text-lg">
          Conteúdo não encontrado
        </Text>

        <Text className="text-center text-base text-muted-foreground">
          O conteúdo que você está procurando não existe ou foi removido.
        </Text>
      </View>

      <Button onPress={() => navigation.goBack()}>Explorar conteúdos</Button>
    </View>
  )
}
