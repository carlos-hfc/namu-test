import { useQuery } from "@tanstack/react-query"

import { getFavorites } from "../http/get-favorites"

export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    select: ({ data }) => new Set(data.map(item => item.id)),
  })
}
