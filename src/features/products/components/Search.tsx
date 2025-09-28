import { formatPrice } from "@/common/helpers";
import { useGlobalStore } from "@/common/store/global.store";
import { useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { searchProductByName } from "../products.service";
import type { Product } from "@/common/interfaces";
import { useNavigate } from "react-router-dom";

export function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<Product[]>([]);

  const closeSheet = useGlobalStore((state) => state.closeSheet);
  const navigate = useNavigate()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Todo: Buscar productos
      const products = await searchProductByName(searchTerm);
      setSearchResult(products ?? []);
    }
  };

  return (
    <>
      <div className="py-5 px-7 flex items-center borde-b border-slate-200">
        <form
          className="flex gap-3 flex-1 items-center"
          onSubmit={handleSearch}
        >
          <HiOutlineSearch size={22} />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className="outline-none py-2 w-full text-sm focus:border-b focus:border-indigo-500"
            placeholder="¿Que buscas?"
          />
        </form>
        <button onClick={closeSheet}>
          <IoMdClose size={25} className="text-black" />
        </button>
      </div>

      {/* Resultado de Busqueda */}
      <div className="py-5">
        {searchResult.length > 0 ? (
          <ul>
            {searchResult.map((product) => (
              <li key={product.id} className="py-2 group">
                <button className="flex items-center gap-3" onClick={() =>{
                  navigate(`/smartphone/${product.slug}`)
                  closeSheet()
                }}>
                  <img src={product.images[0]} alt={product.name} className="h-20 w-20 object-contain p-3" />
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-semibold group-hover:underline cursor-pointer">
                      {product.name}
                    </p>
                    <p className="text-[13px] text-gray-600">
                      {product.variants[0].storage} / {product.variants[0].color_name}
                    </p>
                    <p className="text-sm font-medium text-gray-600">
                      {formatPrice(product.variants[0].price)}
                    </p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-sm text-gray-600">
            No se Encontraron Resultados
          </p>
        )}
      </div>
    </>
  );
}
