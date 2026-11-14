import { Outlet } from "react-router"

import { Header } from "@/components/header"
import { ScrollToTop } from "@/components/scroll-to-top"

export function AppLayout() {
  return (
    <div className="min-h-dvh bg-zinc-100 text-foreground">
      <ScrollToTop />

      <Header />

      <main className="max-w-5xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <Outlet />
      </main>
    </div>
  )
}
