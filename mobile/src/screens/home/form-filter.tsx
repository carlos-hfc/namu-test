import {
  ContentFilterSchema,
  useCategories,
  useContentFilterForm,
} from "@namu-test/shared"
import { Controller } from "react-hook-form"
import { Keyboard, View } from "react-native"

import { Button } from "@/components/button"
import { Input } from "@/components/input"
import { Select } from "@/components/select"
import { useContentsContext } from "@/contexts/contents-context"

import { FormFilterSkeleton } from "./form-filter-skeleton"

interface FormFilterProps {
  onSuccess?(): void
}

export function FormFilter({ onSuccess }: FormFilterProps) {
  const { applyFilters, clearFilters, filters } = useContentsContext()

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useCategories()

  const { control, reset, handleSubmit } = useContentFilterForm(filters)

  const categoryOptions = [
    { name: "Todas", slug: "all" },
    ...(categories?.data.map(category => ({
      name: category.name,
      slug: category.slug,
    })) ?? []),
  ]

  function handleApplyFilters(data: ContentFilterSchema) {
    Keyboard.dismiss()
    applyFilters(data)
    onSuccess?.()
  }

  function handleCleanFilters() {
    Keyboard.dismiss()
    reset()
    clearFilters()
    onSuccess?.()
  }

  if (isLoadingCategories) return <FormFilterSkeleton />

  return (
    <View className="gap-3">
      <Controller
        name="search"
        control={control}
        render={({ field }) => (
          <Input
            value={field.value}
            onChangeText={field.onChange}
          />
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
            options={categoryOptions}
            value={isErrorCategories ? "" : field.value}
            onValueChange={field.onChange}
          />
        )}
      />

      <View className="flex-row items-center justify-center gap-2">
        <Button
          className="flex-1"
          variant="secondary"
          onPress={handleCleanFilters}
        >
          Remover filtros
        </Button>
        <Button
          className="flex-1"
          onPress={() => handleSubmit(handleApplyFilters)()}
        >
          Filtrar
        </Button>
      </View>
    </View>
  )
}
