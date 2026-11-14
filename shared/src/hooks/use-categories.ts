import { useQuery } from "@tanstack/react-query"

import { getCategories } from "../http/get-categories"

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  })
}
