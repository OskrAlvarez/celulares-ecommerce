import { useGlobalStore } from "@/common/store/global.store"
import { Banner, Footer, Navbar, Newsletter, Sheet } from "@/components"
import NavbarMobile from "@/components/shared/NavbarMobile"
import { Outlet, useLocation } from "react-router"

export function RootLayout() {
  const { pathname } = useLocation()
  const isSheetOpen = useGlobalStore((state) => state.isSheetOpen)
  const activeNavMobile = useGlobalStore((state) => state.activeNavMobile)
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      {pathname === '/' && <Banner />}

      <main className="container my-8 flex-1">
        <Outlet />
      </main>
      {pathname === '/' && <Newsletter /> }
      {isSheetOpen && <Sheet />}

      {activeNavMobile && <NavbarMobile />}
      <Footer />
    </div>
  )
}
