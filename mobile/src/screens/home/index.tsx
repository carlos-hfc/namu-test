import { LucideFilter } from "lucide-react-native"
import { useState } from "react"
import { FlatList, Text, TouchableOpacity, View } from "react-native"

import { colors } from "@/colors"
import { BottomSheet } from "@/components/bottom-sheet"

import { ContentCard } from "./content-card"
import { FormFilter } from "./form-filter"

export function Home() {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)

  return (
    <View className="px-6 pt-3 pb-6 flex-1 gap-4">
      <View className="gap-2">
        <Text className="text-2xl font-bold">Conteúdos</Text>

        <Text className="text-sm">
          Conteúdos de bem-estar (meditações, aulas de yoga, artigos de nutrição
          e muito mais)
        </Text>
      </View>

      <BottomSheet
        open={isOpenBottomSheet}
        onClose={() => setIsOpenBottomSheet(false)}
        titleComponent={
          <Text className="text-accent text-base font-semibold">Filtrar</Text>
        }
      >
        <FormFilter />
      </BottomSheet>

      <View className="gap-4 flex-1">
        <View className="flex-row justify-between items-center border-b borer-input pb-1">
          <Text className="font-bold text-lg">Conteúdos</Text>

          <View className="flex-row items-center gap-2">
            <Text className="text-sm">2 conteúdo(s)</Text>

            <TouchableOpacity onPress={() => setIsOpenBottomSheet(true)}>
              <LucideFilter
                size={16}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={Array.from({ length: 5 })}
          renderItem={() => <ContentCard />}
          contentContainerClassName="gap-4"
        />
      </View>
    </View>
  )
}
