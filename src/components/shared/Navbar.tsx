import { navbarLinks } from "@/common/constants/links";
import { Link, NavLink } from "react-router-dom";
import { HiOutlineSearch, HiOutlineShoppingBag } from "react-icons/hi";
import { FaBarsStaggered } from 'react-icons/fa6';
import { Logo } from "./Logo";

export function Navbar() {
  return (
    <header className="bg-white text-black py-4 flex items-center justify-between px-5 border-b border-slate-200 lg:px-12">
      {/* LOGO */}
      <Logo />
      <nav className="space-x-5 hidden md:flex">
        {navbarLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className={({ isActive }) =>
              `${
                isActive ? "text-cyan-600 font-bold underline" : ""
              } transition-all duration-300 font-medium hover:text-cyan-600 hover:underline`
            }
          >
            {link.title}
          </NavLink>
        ))}
      </nav>
      <div className="flex gap-5 items-center">
        <button>
          <HiOutlineSearch size={25} />
        </button>

        <div className="relative">
          {/* USER NAV */}
          <Link
            to={"/account"}
            className="border-2 border-slate-200 w-9 h-9 rounded-full grid place-items-center text-lg font-bold"
          >
            R
          </Link>
        </div>

        <div className="relative">
          <button className="relative">
            <span className="absolute -bottom-2 -right-2 w-5 h-5 grid place-items-center bg-black text-white text-xs rounded-full">
              0
            </span>
            <HiOutlineShoppingBag size={25} />
          </button>
        </div>

        <button className='md:hidden'>
				<FaBarsStaggered size={25} />
			</button>
      </div>
    </header>
  );
}
