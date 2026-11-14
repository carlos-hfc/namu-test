import { validateEnv } from "@namu-test/shared"

export const env = validateEnv({
  API_URL: import.meta.env.VITE_API_URL,
})
