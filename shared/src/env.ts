import { z } from "zod"

export const envSchema = z.object({
  API_URL: z.url(),
})

export function validateEnv(rawEnv: Record<string, unknown>) {
  const parsed = envSchema.safeParse(rawEnv)

  if (!parsed.success) {
    console.error("Invalid env vars", z.treeifyError(parsed.error))
    throw new Error("Invalid env vars")
  }

  return parsed.data
}
