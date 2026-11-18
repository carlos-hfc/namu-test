import { cn } from "@namu-test/shared"
import { LucideAlertCircle } from "lucide-react-native"
import { Text, View } from "react-native"

import { colors } from "@/colors"
import { Button } from "@/components/button"

interface ErrorDetailsProps {
  refetch(): void
  className?: string
  title: string
  text: string
}

export function ErrorDetails({
  refetch,
  text,
  title,
  className,
}: ErrorDetailsProps) {
  return (
    <View
      className={cn(
        "items-center justify-center rounded-xl gap-3 px-4 py-6",
        className,
      )}
    >
      <LucideAlertCircle
        color={colors.destructive}
        size={40}
      />

      <View className="gap-1">
        <Text className="text-center text-lg font-bold">{title}</Text>
        <Text className="text-center text-base text-muted-foreground">
          {text}
        </Text>
      </View>

      <Button onPress={refetch}>Tentar novamente</Button>
    </View>
  )
}
