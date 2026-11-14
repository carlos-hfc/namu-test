import {
  type ContentFilterSchema,
  useCategories,
  useContentFilterForm,
} from "@namu-test/shared"
import { LucideChevronDown, LucideSearch } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "radix-ui/select"
import { useEffect } from "react"
import { Controller } from "react-hook-form"
import { useSearchParams } from "react-router"
import { toast } from "sonner"

import { FormFilterSkeleton } from "./form-filter-skeleton"

export function FormFilter() {
  const [searchParams, setSearchParams] = useSearchParams()

  const search = searchParams.get("search")
  const category = searchParams.get("category")

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
    refetch: refetchCategories,
  } = useCategories()

  const { control, register, handleSubmit, reset } = useContentFilterForm({
    category: category ?? "all",
    search: search ?? "",
  })

  useEffect(() => {
    if (isErrorCategories) {
      toast.error("Não foi possível carregar as categorias", {
        id: "categories-error",
        duration: 10_000,
        action: {
          label: "Tentar novamente",
          onClick: () => refetchCategories(),
        },
      })
    } else {
      toast.dismiss("categories-error")
    }
  }, [isErrorCategories, refetchCategories])

  function handleFilter(data: ContentFilterSchema) {
    setSearchParams(prev => {
      if (data.search) {
        prev.set("search", data.search)
      } else {
        prev.delete("search")
      }

      if (data.category) {
        prev.set("category", data.category)
      } else {
        prev.delete("category")
      }

      prev.set("page", "1")

      return prev
    })
  }

  function handleClearFilters() {
    setSearchParams(prev => {
      prev.delete("page")
      prev.delete("search")
      prev.delete("category")

      return prev
    })

    reset()
  }

  if (isLoadingCategories) return <FormFilterSkeleton />

  return (
    <form
      className="flex flex-col lg:flex-row lg:items-center gap-3"
      onSubmit={handleSubmit(handleFilter)}
    >
      <div>
        <label
          htmlFor="search"
          className="sr-only"
        >
          Busque por um título
        </label>

        <div className="group flex items-center flex-row gap-2 h-10 border border-muted-foreground rounded-full px-4 text-sm transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30">
          <LucideSearch className="size-4 text-muted-foreground group-focus-within:text-primary" />

          <input
            id="search"
            type="text"
            className="flex-1 outline-none"
            placeholder="Busque por um título"
            {...register("search")}
          />
        </div>
      </div>

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            defaultValue="all"
            onValueChange={field.onChange}
          >
            <SelectTrigger
              data-error={isErrorCategories}
              className="border rounded-full border-muted-foreground w-full lg:w-64 h-10 flex items-center justify-between px-4 outline-none transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/30 data-[state=open]:[&_svg]:rotate-180 text-sm data-[error=true]:hidden"
            >
              <SelectValue />

              <SelectIcon>
                <LucideChevronDown className="transition-transform" />
              </SelectIcon>
            </SelectTrigger>

            <SelectPortal>
              <SelectContent
                position="popper"
                sideOffset={8}
                className="shadow-lg rounded-xl bg-zinc-100 p-1 w-(--radix-select-trigger-width)"
              >
                <SelectViewport>
                  <SelectItem
                    value="all"
                    className="rounded-lg outline-none px-2 py-1 focus-visible:bg-primary/30"
                  >
                    <SelectItemText>Todas</SelectItemText>
                  </SelectItem>

                  {categories?.data.map(item => (
                    <SelectItem
                      key={item.slug}
                      value={item.slug}
                      className="rounded-lg outline-none px-2 py-1 focus-visible:bg-primary/30"
                    >
                      <SelectItemText>{item.name}</SelectItemText>
                    </SelectItem>
                  ))}
                </SelectViewport>
              </SelectContent>
            </SelectPortal>
          </Select>
        )}
      />

      <div className="flex items-center justify-center gap-2">
        <button
          type="submit"
          className="bg-primary border border-transparent outline-none rounded-full px-4 h-10 font-bold focus-visible:ring-2 focus-visible:ring-primary/30 text-sm text-background max-lg:flex-1 cursor-pointer"
        >
          Filtrar
        </button>
        <button
          type="button"
          className="border border-primary outline-none rounded-full px-4 h-10 font-bold focus-visible:ring-2 focus-visible:ring-primary/30 text-sm text-primary max-lg:flex-1 cursor-pointer"
          onClick={handleClearFilters}
        >
          Remover filtros
        </button>
      </div>
    </form>
  )
}
