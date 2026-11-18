import { LucideFilter } from "lucide-react-native"
import { useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

import { colors } from "@/colors"
import { BottomSheet } from "@/components/bottom-sheet"
import { useContentsContext } from "@/contexts/contents-context"

import { ContentCard } from "../../components/content-card"
import { FormFilter } from "./form-filter"

export function Home() {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)

  const { contents, total, hasActiveFilters, loadMore, isLoading, refetch } =
    useContentsContext()

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
        <FormFilter onSuccess={() => setIsOpenBottomSheet(false)} />
      </BottomSheet>

      <View className="gap-4 flex-1">
        <View className="flex-row justify-between items-center border-b borer-input pb-1">
          <Text className="font-bold text-lg">Conteúdos</Text>

          <View className="flex-row items-center gap-2">
            <Text className="text-sm">{total} conteúdo(s)</Text>

            <TouchableOpacity
              className="flex-row gap-1 items-center"
              onPress={() => setIsOpenBottomSheet(true)}
            >
              <LucideFilter
                size={16}
                color={colors.primary}
              />

              <Text className="text-sm text-primary">Filtrar</Text>

              {hasActiveFilters && (
                <View className="size-2 rounded-full bg-primary" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={contents}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <ContentCard content={item} />}
          contentContainerClassName="gap-4"
          onEndReached={loadMore}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetch}
            />
          }
          ListFooterComponent={() =>
            isLoading ? (
              <ActivityIndicator
                color={colors.primary}
                size={"large"}
              />
            ) : null
          }
        />
      </View>
    </View>
  )
}
