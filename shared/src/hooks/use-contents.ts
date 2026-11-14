import { useQuery } from "@tanstack/react-query"

import { getContents, type GetContentsRequest } from "../http/get-contents"

export function useContents({ page, category, search }: GetContentsRequest) {
  return useQuery({
    queryKey: ["contents", page, category, search],
    queryFn: () => getContents({ page, category, search }),
  })
}
