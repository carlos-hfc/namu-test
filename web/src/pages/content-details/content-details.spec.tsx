import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { http, HttpResponse } from "msw"
import { Route, Routes } from "react-router"
import { expect, vi } from "vitest"

import { server } from "@/test/mocks/server"
import { renderWithProviders } from "@/test/render-app"

import { ContentDetails } from "."

function renderContentDetails(contentId: string) {
  return renderWithProviders(
    <Routes>
      <Route
        path="/content/:contentId"
        element={<ContentDetails />}
      />
    </Routes>,
    { initialEntries: [`/content/${contentId}`] },
  )
}

describe("Content details page", () => {
  it("should show the content details and favorite state", async () => {
    renderContentDetails("1")

    expect(
      await screen.findByRole("heading", {
        name: "Meditação Guiada para Iniciantes",
      }),
    ).toBeInTheDocument()
    expect(screen.getByText("Instrutor")).toBeInTheDocument()
    expect(screen.getByText("10min")).toBeInTheDocument()
    expect(
      screen.getByRole("button", {
        name: "Remover conteúdos dos favoritos",
      }),
    ).toBeInTheDocument()
  })

  it("should show not found state for an unknown content", async () => {
    renderContentDetails("999")

    expect(
      await screen.findByRole("heading", { name: "Conteúdo não encontrado" }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: "Explorar conteúdos" }),
    ).toHaveAttribute("href", "/")
  })

  it("should show not found state for an invalid content id", async () => {
    renderContentDetails("invalid")

    expect(
      await screen.findByRole("heading", { name: "Conteúdo não encontrado" }),
    ).toBeInTheDocument()
  })

  it("should retry after loading details fails", async () => {
    server.use(
      http.get("*/contents/1", () => {
        return HttpResponse.json(null, { status: 500 })
      }),
    )

    renderContentDetails("1")

    expect(
      await screen.findByRole("heading", {
        name: "Não foi possível carregar o conteúdo",
      }),
    ).toBeInTheDocument()

    server.resetHandlers()
    await userEvent
      .setup()
      .click(screen.getByRole("button", { name: "Tentar novamente" }))

    expect(
      await screen.findByRole("heading", {
        name: "Meditação Guiada para Iniciantes",
      }),
    ).toBeInTheDocument()
  })

  it("should remove a content from favorites", async () => {
    const user = userEvent.setup()
    const removeFavorite = vi.fn()

    server.use(
      http.delete("*/favorites/1", () => {
        removeFavorite()
        return new HttpResponse(null, { status: 204 })
      }),
    )

    renderContentDetails("1")
    await user.click(
      await screen.findByRole("button", {
        name: "Remover conteúdos dos favoritos",
      }),
    )

    await waitFor(() => expect(removeFavorite).toHaveBeenCalledOnce())
  })
})
