import { View } from "react-native"

import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Select } from "@/components/select"

export function FormFilter() {
  return (
    <>
      <View className="gap-3">
        <Input />

        <Select />

        <View className="flex-row items-center justify-center gap-2">
          <Button
            className="flex-1"
            variant="secondary"
          >
            Remover filtros
          </Button>
          <Button className="flex-1">Filtrar</Button>
        </View>
      </View>
    </>
  )
}
