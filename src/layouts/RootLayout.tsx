import { Banner, Footer, Navbar, Newsletter } from "@/components"
import { Outlet, useLocation } from "react-router"

export function RootLayout() {
  const { pathname } = useLocation()
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      {pathname === '/' && <Banner />}

      <main className="container my-8 flex-1">
        <Outlet />
      </main>
      {pathname === '/' && <Newsletter /> }
      <Footer />
    </div>
  )
}
