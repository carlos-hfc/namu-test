import { useEffect } from "react"
import { useLocation, useSearchParams } from "react-router"

export function ScrollToTop() {
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  const page = searchParams.get("page")

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    })
  }, [pathname, page])

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth",
  //   })
  // }, [page])

  return null
}
