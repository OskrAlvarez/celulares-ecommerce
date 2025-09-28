import { navbarLinks } from "@/common/constants/links";
import { useGlobalStore } from "@/common/store/global.store";
import { IoMdClose } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";

export default function NavbarMobile() {
  const setActiveNavMobile = useGlobalStore(
    (state) => state.setActiveNavMobile
  );
  return (
    <div className="bg-white text-black h-screen w-full shadow-lg fixed  animate-slide-in-left z-50 flex justify-center py-32">
      <button
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => setActiveNavMobile(false)}
      >
        <IoMdClose size={30} className="text-black" />
      </button>

      {/* Contenido */}
      <div className="flex flex-col gap-20">
        <Link
          to={"/"}
          onClick={() => setActiveNavMobile(false)}
          className="text-4xl font-bold tracking-tighter transition-all"
        >
          <p>
            Celulares
            <span className="text-indigo-600">Baratos</span>
          </p>
        </Link>

        <nav className="flex flex-col gap-6 items-center">
          {navbarLinks.map((navlink) => (
            <NavLink
              to={navlink.href}
              key={navlink.id}
              className={({ isActive }) =>
                `${
                  isActive ? "text-indigo-600 underline font-bold" : ""
                } transition-all duration-300 text-xl hover:text-indigo-600 hover:underline`
              }
              onClick={() => setActiveNavMobile(false)}
            >
              {navlink.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
