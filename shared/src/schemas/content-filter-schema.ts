import z from "zod"

export const contentFilterSchema = z.object({
  search: z.string().optional(),
  category: z.string().optional(),
})

export type ContentFilterSchema = z.infer<typeof contentFilterSchema>
