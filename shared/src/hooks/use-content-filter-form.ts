import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import {
  type ContentFilterSchema,
  contentFilterSchema,
} from "../schemas/content-filter-schema"

export function useContentFilterForm(
  defaultValues?: Partial<ContentFilterSchema>,
) {
  return useForm<ContentFilterSchema>({
    resolver: zodResolver(contentFilterSchema),
    defaultValues: {
      search: "",
      category: "",
      ...defaultValues,
    },
  })
}
