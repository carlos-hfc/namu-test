import {
  contentTypeLabel,
  convertContentDuration,
  publishedDate,
  useContent,
} from "@namu-test/shared"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { LucideClock, LucideGraduationCap } from "lucide-react-native"
import { ActivityIndicator, Image, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

import { StackParamsList } from "@/@types/navigation"
import { colors } from "@/colors"
import { ErrorDetails } from "@/components/error-details"
import { contentTypeIcon } from "@/utils/show-content-type-icon"

import { Header } from "./header"
import { InformationCard } from "./information-card"
import { NotFound } from "./not-found"

export function ContentDetails({
  route,
}: NativeStackScreenProps<StackParamsList, "content-details">) {
  const { id } = route.params

  const { data, isLoading, isError, refetch, error } = useContent({
    contentId: id,
  })

  const statusCode =
    (error as any)?.response?.status ?? (error as any)?.statusCode
  const isNotFound = statusCode === 404

  if (isNotFound) return <NotFound />

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

  if (isError || !data)
    return (
      <ErrorDetails
        refetch={refetch}
        title="Não foi possível carregar os conteúdos"
        text="Ocorreu uma falha na comunicação com o servidor. Tente novamente."
      />
    )

  return (
    <SafeAreaView className="px-6 pt-3 pb-6 flex-1 gap-4">
      <Header
        contentId={id}
        isFavorite={data.isFavorite}
      />

      <Image
        source={
          data.thumbnailUrl
            ? { uri: data.thumbnailUrl }
            : require("@/assets/no-image.png")
        }
        alt={data.title}
        className="w-full h-48"
      />

      <View className="gap-2">
        <Text className="text-primary text-sm">{data.category}</Text>
        <Text className="text-2xl font-bold">{data.title}</Text>
        <Text className="text-muted-foreground text-sm">
          Publicado em Publicado em {publishedDate(data.publishedAt)}
        </Text>
      </View>

      <Text className="text-base border-y py-4 border-border">
        {data.description}
      </Text>

      <View className="flex-row gap-2 items-center">
        <InformationCard
          title="Tipo"
          text={contentTypeLabel[data.type]}
          Icon={contentTypeIcon[data.type]}
        />
        <InformationCard
          title="Instrutor"
          text={data.instructor}
          Icon={LucideGraduationCap}
          className="basis-1/4"
        />
        <InformationCard
          title="Duração"
          text={convertContentDuration(data.durationSeconds)}
          Icon={LucideClock}
        />
      </View>
    </SafeAreaView>
  )
}
