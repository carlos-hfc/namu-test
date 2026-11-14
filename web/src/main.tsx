import "@fontsource/poppins"

import { configureApi } from "@namu-test/shared"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { App } from "./app.tsx"
import { env } from "./env.ts"

configureApi({ baseURL: env.API_URL })

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
