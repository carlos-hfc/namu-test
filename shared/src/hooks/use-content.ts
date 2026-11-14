import { useQuery } from "@tanstack/react-query"

import {
  getContentById,
  type GetContentByIdRequest,
} from "../http/get-content-by-id"

export function useContent({ contentId }: GetContentByIdRequest) {
  return useQuery({
    queryKey: ["contents", contentId],
    queryFn: () => getContentById({ contentId }),
  })
}
