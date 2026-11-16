import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { useSearchParams } from "react-router"
import { expect } from "vitest"

import { server } from "@/test/mocks/server"
import { renderWithProviders } from "@/test/render-app"

import { Home } from "."

function SearchParamsOutput() {
  const [searchParams] = useSearchParams()

  return <output data-testid="search-params">{searchParams.toString()}</output>
}

describe("Home page", () => {
  it("should be able to list contents and total contents", async () => {
    renderWithProviders(<Home />)

    expect(
      await screen.findByText("Meditação Guiada para Iniciantes"),
    ).toBeInTheDocument()
    expect(screen.getByText("Yoga Matinal")).toBeInTheDocument()
    expect(screen.getByText("3 conteúdo(s)")).toBeInTheDocument()
  })

  it("should be able to show an empty list state when a search yields no results", async () => {
    renderWithProviders(<Home />, {
      initialEntries: ["/?search=inexistente"],
    })

    expect(
      await screen.findByText("Nenhum conteúdo encontrado"),
    ).toBeInTheDocument()
  })

  it("should be able to show an error state when GET /contentes fails, and reload upon clicking 'try again'", async () => {
    const user = userEvent.setup()

    server.use(
      http.get("*/contents", () => {
        return HttpResponse.json(null, { status: 500 })
      }),
    )

    renderWithProviders(<Home />)

    expect(
      await screen.findByText("Não foi possível carregar os conteúdos"),
    ).toBeInTheDocument()

    server.resetHandlers()

    await user.click(screen.getByRole("button", { name: "Tentar novamente" }))

    expect(
      await screen.findByText("Meditação Guiada para Iniciantes"),
    ).toBeInTheDocument()
  })

  it("should show and error toast when GET /favorites fails without blocking contents", async () => {
    server.use(
      http.get("*/favorites", () => {
        return HttpResponse.json(null, { status: 500 })
      }),
    )

    renderWithProviders(<Home />)

    expect(
      await screen.findByText("Não foi possível carregar seus favoritos"),
    ).toBeInTheDocument()

    expect(
      screen.getByText("Meditação Guiada para Iniciantes"),
    ).toBeInTheDocument()
  })

  it("should apply search filters and reset the page", async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <>
        <Home />
        <SearchParamsOutput />
      </>,
      {
        initialEntries: ["/?page=3&category=yoga"],
      },
    )

    const searchInput = await screen.findByPlaceholderText(
      "Busque por um título",
    )
    await user.type(searchInput, "Yoga")
    await user.click(screen.getByRole("button", { name: "Filtrar" }))

    expect(screen.getByTestId("search-params")).toHaveTextContent(
      "page=1&category=yoga&search=Yoga",
    )
  })

  it("should remove active filters", async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <>
        <Home />
        <SearchParamsOutput />
      </>,
      {
        initialEntries: ["/?page=2&search=Yoga&category=yoga"],
      },
    )

    await screen.findByPlaceholderText("Busque por um título")
    await user.click(screen.getByRole("button", { name: "Remover filtros" }))

    expect(screen.getByTestId("search-params")).toHaveTextContent("")
  })

  it("should navigate to another page", async () => {
    const user = userEvent.setup()

    renderWithProviders(
      <>
        <Home />
        <SearchParamsOutput />
      </>,
    )

    await screen.findByRole("button", { name: "Página 2" })
    await user.click(screen.getByRole("button", { name: "Página 2" }))

    expect(screen.getByTestId("search-params")).toHaveTextContent("page=2")
  })
})
