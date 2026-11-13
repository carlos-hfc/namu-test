import { createBrowserRouter } from "react-router"

import { AppLayout } from "./_layouts/app-layout"
import { Home } from "./pages/home"

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
])
