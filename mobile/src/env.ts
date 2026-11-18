import { API_URL } from "@env"
import { validateEnv } from "@namu-test/shared"

export const env = validateEnv({
  API_URL: API_URL,
})
