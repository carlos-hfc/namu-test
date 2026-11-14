import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react"
import type { ReactNode } from "react"
import { MemoryRouter } from "react-router"
import { Toaster } from "sonner"

interface RenderOptions {
  initialEntries?: string[]
}

export function renderWithProviders(
  ui: ReactNode,
  { initialEntries = ["/"] }: RenderOptions = {},
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        retryDelay: 0,
      },
      mutations: {
        retry: false,
      },
    },
  })

  return {
    queryClient,
    ...render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={initialEntries}>
          <Toaster />
          {ui}
        </MemoryRouter>
      </QueryClientProvider>,
    ),
  }
}
