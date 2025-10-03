import { supabase } from "@/common/supabase/client";
import { Loader } from "@/components";
import { singOut, useUser } from "@/features/auth";
import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export function ClientLayout() {

  const { session, isLoading:isLoadingSession } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate('/login')
      }
    })
  }, [navigate])

  if (isLoadingSession) return <Loader />

  const handleLogOut = async () => {
    await singOut()
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Menu */}
      <nav className="flex justify-center gap-10 text-sm font-medium">
        <NavLink
          to='account/orders'
          className={({ isActive }) => `${isActive ? 'underline' : ''} hover:underline`}
        >
          Pedidos
        </NavLink>

        {/* TODO: LINK DASHBOARD */}

        <button
          className="hover:underline"
          onClick={handleLogOut}
        >
          Cerrar Sesión
        </button>
      </nav>

      <main className="container mt-12 flex-1">
        <Outlet />
      </main>
    </div>
  )
}
