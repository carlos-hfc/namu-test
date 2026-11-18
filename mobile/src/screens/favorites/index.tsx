import { FlatList, Text, View } from "react-native"

import { ContentCard } from "@/components/content-card"

export function Favorites() {
  return (
    <View className="px-6 pt-3 pb-6 flex-1 gap-4">
      <View className="gap-2">
        <Text className="text-2xl font-bold">Favoritos</Text>

        <Text className="text-sm">Conteúdos que você salvou</Text>
      </View>

      <FlatList
        data={Array.from({ length: 5 })}
        renderItem={() => <ContentCard />}
        contentContainerClassName="gap-4"
      />
    </View>
  )
}
