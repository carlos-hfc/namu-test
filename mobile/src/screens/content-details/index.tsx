import { Image, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { Header } from "./header"
import { InformationCard } from "./information-card"

export function ContentDetails() {
  return (
    <SafeAreaView className="px-6 pt-3 pb-6 flex-1 gap-4">
      <Header />

      <Image
        source={require("@/assets/no-image.png")}
        alt=""
        className="w-full h-48"
      />

      <View className="gap-2">
        <Text className="text-primary text-sm">categoria</Text>
        <Text className="text-2xl font-bold">Título</Text>
        <Text className="text-muted-foreground text-sm">publicado em</Text>
      </View>

      <Text className="text-base border-y py-4 border-border">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        dolorum repellat error, distinctio aspernatur rerum dolore a molestias
        iusto veniam natus incidunt odio rem voluptatem vel autem fugit nisi
        iure?
      </Text>

      <View className="flex-row gap-2 items-center">
        {Array.from({ length: 3 }).map((_, i) => (
          <InformationCard key={`info-card-${i}`} />
        ))}
      </View>
    </SafeAreaView>
  )
}
