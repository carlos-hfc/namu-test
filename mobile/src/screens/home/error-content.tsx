import { LucideAlertCircle } from "lucide-react-native"
import { Text, View } from "react-native"

import { colors } from "@/colors"
import { Button } from "@/components/button"

interface ErrorContentProps {
  refetch(): void
}

export function ErrorContent({ refetch }: ErrorContentProps) {
  return (
    <View className="items-center justify-center rounded-xl gap-3 px-4 py-6">
      <LucideAlertCircle
        color={colors.destructive}
        size={40}
      />

      <View className="gap-1">
        <Text className="text-center text-lg font-bold">
          Não foi possível carregar os conteúdos
        </Text>
        <Text className="text-center text-base text-muted-foreground">
          Ocorreu uma falha na comunicação com o servidor. Tente novamente.
        </Text>
      </View>

      <Button onPress={refetch}>Tentar novamente</Button>
    </View>
  )
}
