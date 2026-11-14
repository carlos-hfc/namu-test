// web/src/test/mocks/handlers.ts
import { http, HttpResponse } from "msw"

import { makeContent, type MockContent } from "../factories/make-content"

export const mockCategories = [
  { slug: "meditacao", name: "Meditação" },
  { slug: "yoga", name: "Yoga" },
  { slug: "nutricao", name: "Nutrição" },
]

export const mockContents: MockContent[] = [
  makeContent({
    id: 1,
    title: "Meditação Guiada para Iniciantes",
    category: "Meditação",
    type: "audio",
    durationSeconds: 600,
    isFavorite: true,
  }),
  makeContent({
    id: 2,
    title: "Yoga Matinal",
    category: "Yoga",
    type: "video",
    durationSeconds: 1800,
    isFavorite: false,
  }),
  makeContent({
    id: 3,
    title: "Alimentação Consciente",
    category: "Nutrição",
    type: "article",
    durationSeconds: 420,
    isFavorite: false,
  }),
]

export const handlers = [
  http.get("*/categories", () => {
    return HttpResponse.json({
      data: mockCategories,
    })
  }),

  http.get("*/contents", ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get("search")

    if (search === "inexistente") {
      return HttpResponse.json({
        data: [],
        page: 1,
        total: 0,
        totalPages: 0,
      })
    }

    return HttpResponse.json({
      data: mockContents,
      page: Number(url.searchParams.get("page") ?? 1),
      total: mockContents.length,
      totalPages: 2,
    })
  }),

  http.get("*/contents/:id", ({ params }) => {
    const id = Number(params.id)

    if (id === 999) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 })
    }

    const found = mockContents.find(item => item.id === id) ?? mockContents[0]
    return HttpResponse.json(found)
  }),

  http.get("*/favorites", () => {
    return HttpResponse.json({
      data: mockContents.filter(item => item.isFavorite),
    })
  }),

  http.post("*/favorites", () => {
    return HttpResponse.json({ success: true }, { status: 201 })
  }),

  http.delete("*/favorites/:id", () => {
    return new HttpResponse(null, { status: 204 })
  }),
]
