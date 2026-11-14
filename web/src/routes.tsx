import { createBrowserRouter } from "react-router"

import { AppLayout } from "./_layouts/app-layout"
import { ContentDetails } from "./pages/content-details"
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
      {
        path: "/content/:contentId",
        element: <ContentDetails />,
      },
    ],
  },
])
