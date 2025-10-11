import { TableProducts } from "@/features/dashboard";
import { IoAdd } from "react-icons/io5";
import { Link } from "react-router-dom";
export function AdminProducts() {
  return (
    <div className="h-full flex flex-col gap-2">
      <Link
        to='/dashboard/products/new'
        className="bg-indigo-600 text-white flex items-center self-end py-1.5 px-2 rounded-md text-sm gap-1 font-semibold hover:bg-indigo-800 transition-colors"
      >
        <IoAdd size={20} className="inline-block" />
        Agregar Producto
      </Link>

      <TableProducts />
    </div>
  )
}
