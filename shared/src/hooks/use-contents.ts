import { useQuery } from "@tanstack/react-query"

import { getContents, GetContentsRequest } from "../http/get-contents"

export function useContents({ page }: GetContentsRequest) {
  return useQuery({
    queryKey: ["contents", page],
    queryFn: () => getContents({ page }),
  })
}
