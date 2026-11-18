import { useQuery } from "@tanstack/react-query"

import { getFavorites } from "../http/get-favorites"

export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
    select: ({ data }) => ({
      items: data,
      ids: new Set(data.map(item => item.id)),
    }),
  })
}
