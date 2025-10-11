import { formatDateLong, formatDateShort, formatPrice } from "@/common/helpers";
import { Loader, Pagination } from "@/components";
import { useProducts } from "@/features/products";
import { useState } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

const tableHeaders = [
  "",
  "Nombre",
  "Variante",
  "Precio",
  "Stock",
  "Fecha de Creación",
  "",
];
export function TableProducts() {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const { products, totalProducts, isLoading } = useProducts({
    page,
    pageItems: 5,
  });
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: number;
  }>({});

  const handleDeleteProduct = (id: string) => {
    console.log(id);
  };

  const handleMenuToggle = (index: number) => {
    if (openMenuIndex === index) {
      setOpenMenuIndex(null);
    } else {
      setOpenMenuIndex(index);
    }
  };

  const handleVariantChange = (productId: string, variantIndex: number) => {
    setSelectedVariants({
      ...selectedVariants,
      [productId]: variantIndex,
    });
  };

  if (!products || isLoading || !totalProducts) {
    return <Loader />;
  }
  return (
    <div className="container flex flex-col flex-1 border border-gray-200 rounded-lg p-5 bg-white">
      <h1 className="font-bold text-xl">Productos</h1>
      <p className="text-sm mt-1 mb-8 font-normal text-gray-500">
        Gestiona tus Productos y mira las estadisticas de tus ventas.
      </p>

      {/* Tabla de Productos */}
      <div className="relative w-full h-full">
        <table className="text-sm w-full caption-bottom overflow-auto">
          <thead className="border bg-neutral-200 border-gray-200 pb-3">
            <tr className="text-sm font-bold">
              {tableHeaders.map((header, index) => (
                <th key={index} className="h-12 px-4 text-left">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="border border-gray-200">
            {products.map((product, productIndex) => {
              const selectedVariantIndex = selectedVariants[product.id] ?? 0;

              const selectedVariant = product.variants[selectedVariantIndex];
              return (
                <tr key={productIndex}>
                  <td className="p-4 align-middle sm:table-cell">
                    <img
                      src={
                        product.images[0] ||
                        "https://ui.shadcn.com/placeholder.svg"
                      }
                      alt="Imagen Producto"
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 aspect-square rounded-md object-contain"
                    />
                  </td>
                  <td className="cell-table">
                    {product.name}
                  </td>
                  <td className="cell-table">
                    <select
                      onChange={(e) =>
                        handleVariantChange(product.id, Number(e.target.value))
                      }
                      value={selectedVariantIndex}
                      className="border border-gray-300 rounded-md p-1 w-full"
                    >
                      {product.variants.map((variant, variantIndex) => (
                        <option key={variant.id} value={variantIndex}>
                          {variant.color_name} - {variant.storage}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="cell-table">
                    {formatPrice(selectedVariant.price)}
                  </td>
                  <td className="cell-table">
                    {selectedVariant.stock}
                  </td>
                  <td className="cell-table">
                    {formatDateShort(product.created_at)}
                  </td>
                  <td className="relative">
                    <button
                      className="text-slate-900 cursor-pointer"
                      onClick={() => handleMenuToggle(productIndex)}
                    >
                      <FaEllipsis />
                    </button>
                    {openMenuIndex === productIndex && (
                      <div
                        className="absolute -right-4 mt-2 bg-white border border-gray-200 rounded-md shadow-xl z-10 w-[120px]"
                        role="menu"
                      >
                        <Link
                          to={`/dashboard/product/edit/${product.slug}`}
                          className="flex items-center gap-1 w-full text-left px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100"
                        >
                          <MdModeEdit />
                          Editar
                        </Link>
                        <button
                          className="flex items-center gap-1 w-full text-left text-xs font-medium text-gray-700 px-4 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <MdDelete />
                          Eliminar
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Paginacióm */}
      <div className="p-3">
        <Pagination page={page} setPage={setPage} totalItems={totalProducts} />
      </div>
    </div>
  );
}
