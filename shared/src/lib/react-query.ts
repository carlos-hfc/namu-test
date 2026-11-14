import { QueryClient } from "@tanstack/react-query"

import { ApiError } from "../api-error"

const MAX_RETRIES = 2

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60, // 1h
        retry(failureCount, error) {
          if (
            error instanceof ApiError &&
            error.statusCode >= 400 &&
            error.statusCode < 500
          )
            return false

          return failureCount < MAX_RETRIES
        },
        retryDelay(failureCount) {
          return Math.min(1000 * 2 ** failureCount, 1000)
        },
      },
      mutations: {
        retry: false,
      },
    },
  })
}
