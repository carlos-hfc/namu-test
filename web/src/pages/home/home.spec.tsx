import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { expect } from "vitest"

import { server } from "@/test/mocks/server"
import { renderWithProviders } from "@/test/render-app"

import { Home } from "."

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
})
