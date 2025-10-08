import { AuthGuard, singOut, useUser } from "@/features/auth";
import { NavLink, Outlet } from "react-router-dom";

export function ClientLayout() {
  const { isLoading: isLoadingSession, session } = useUser();

  const handleLogOut = async () => {
    await singOut();
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Menu */}
      <nav className="flex justify-center gap-10 text-sm font-medium">
        <NavLink
          to="account/orders"
          className={({ isActive }) =>
            `${isActive ? "underline" : ""} hover:underline`
          }
        >
          Pedidos
        </NavLink>

        {/* TODO: LINK DASHBOARD */}

        <button className="hover:underline" onClick={handleLogOut}>
          Cerrar Sesión
        </button>
      </nav>
      <main className="container mt-12 flex-1">
        <AuthGuard isLoadingSession={isLoadingSession} session={session}>
          <Outlet />
        </AuthGuard>
      </main>
    </div>
  );
}
