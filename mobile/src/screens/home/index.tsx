import { useFavorites } from "@namu-test/shared"
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
import { Skeleton } from "@/components/skeleton"
import { useContentsContext } from "@/contexts/contents-context"

import { ContentCard } from "../../components/content-card"
import { ErrorContent } from "./error-content"
import { FormFilter } from "./form-filter"

export function Home() {
  const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)

  const {
    contents,
    total,
    hasActiveFilters,
    loadMore,
    isInitialLoading,
    refetch,
    isError,
    isLoadingMore,
  } = useContentsContext()

  const { data: favorites } = useFavorites()

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
            {isInitialLoading ? (
              <Skeleton className="h-3 w-16" />
            ) : (
              <Text className="text-sm">{total} conteúdo(s)</Text>
            )}

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

        {isInitialLoading && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator
              color={colors.primary}
              size={"large"}
            />
          </View>
        )}

        {isError && <ErrorContent refetch={refetch} />}

        {!isInitialLoading && !isError && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={contents}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <ContentCard
                content={item}
                isFavorite={favorites?.has(item.id)}
              />
            )}
            contentContainerClassName="gap-4"
            onEndReached={loadMore}
            onEndReachedThreshold={0}
            refreshControl={
              <RefreshControl
                refreshing={isInitialLoading}
                onRefresh={refetch}
              />
            }
            ListFooterComponent={() =>
              isLoadingMore ? (
                <ActivityIndicator
                  color={colors.primary}
                  size={"large"}
                />
              ) : null
            }
          />
        )}
      </View>
    </View>
  )
}
