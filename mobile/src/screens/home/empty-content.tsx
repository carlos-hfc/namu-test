import { LucideSearchX } from "lucide-react-native"
import { Text, View } from "react-native"

import { colors } from "@/colors"
import { useContentsContext } from "@/contexts/contents-context"

export function EmptyContent() {
  const { hasActiveFilters } = useContentsContext()

  return (
    <View className="items-center justify-center rounded-xl gap-3 px-4 py-6">
      <LucideSearchX
        color={colors["muted-foreground"]}
        size={40}
      />

      <View className="gap-1">
        <Text className="text-center text-lg font-bold">
          Nenhum conteúdo encontrado
        </Text>
        <Text className="text-center text-base text-muted-foreground">
          {hasActiveFilters
            ? "Não encontramos resultados para os filtros aplicados"
            : "Ainda não há conteúdos disponíveis no momento"}
        </Text>
      </View>
    </View>
  )
}
