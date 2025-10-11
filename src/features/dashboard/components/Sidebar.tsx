import { dashboardLinks } from "@/common/constants/links";
import { Logo } from "@/components/shared/Logo";
import { singOut } from "@/features/auth";
import { IoLogOut } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export function Sidebar() {
  const handleLogOut = async () => {
    await singOut()
  }
  return (
    <div className="bg-neutral-900 text-white flex flex-col gap-10 p-5 h-screen">
      <Logo isDashboard />

      <nav className="w-full space-y-5 flex-1">
        {dashboardLinks.map(({ id, title, href, icon }) => (
          <NavLink
            className={({
              isActive,
            }) => `flex items-center justify-center gap-3 transition-all pl-0 py-3
              duration-300 rounded-md ${
                isActive
                  ? "text-white bg-indigo-600"
                  : "hover:text-white hover:bg-indigo-600"
              } lg:pl-5 lg:justify-start`}
            key={id}
            to={href}
          >
            {icon}
            <p className="w-fit font-semibold hidden lg:block">{title}</p>
          </NavLink>
        ))}
      </nav>
      <button
        onClick={handleLogOut}
        className="bg-red-500 w-full py-2.5 rounded-md flex items-center justify-center gap-2 font-semibold text-sm hover:underline"
      >
        <IoLogOut size={20} className="inline-block" />
        <span className="hidden lg:block">Cerrar Sesión</span>
      </button>
    </div>
  );
}
