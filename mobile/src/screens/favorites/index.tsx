import { useFavorites } from "@namu-test/shared"
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from "react-native"

import { colors } from "@/colors"
import { ContentCard } from "@/components/content-card"
import { ErrorDetails } from "@/components/error-details"

import { EmptyContent } from "../../components/empty-content"

export function Favorites() {
  const { data, isLoading, isError, refetch } = useFavorites()

  async function handleRefresh() {
    await refetch()
  }

  if (isError || !data) {
    return (
      <ErrorDetails
        refetch={handleRefresh}
        title="Não foi possível carregar os favoritos"
        text="Ocorreu uma falha na comunicação com o servidor. Tente novamente."
      />
    )
  }

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator
          color={colors.primary}
          size={"large"}
        />
      </View>
    )
  }

  return (
    <View className="px-6 pt-3 pb-6 flex-1 gap-4">
      <View className="gap-2">
        <Text className="text-2xl font-bold">Favoritos</Text>

        <Text className="text-sm">Conteúdos que você salvou</Text>
      </View>

      {!isLoading && !isError && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.items}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ContentCard
              content={item}
              isFavorite
            />
          )}
          contentContainerClassName="gap-4"
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
              colors={[colors.primary]}
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
          ListEmptyComponent={
            <EmptyContent
              title="Nenhum favorito encontrado"
              text="Ainda não há favoritos disponíveis no momento"
            />
          }
        />
      )}
    </View>
  )
}
