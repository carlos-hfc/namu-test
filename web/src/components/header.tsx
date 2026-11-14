import logo from "@/assets/logo.webp"

export function Header() {
  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-5">
      <div className="max-w-5xl flex mx-auto px-4 lg:px-8 py-4">
        <img
          src={logo}
          alt="Logo Namu"
          className="w-auto h-10"
        />
      </div>
    </header>
  )
}
