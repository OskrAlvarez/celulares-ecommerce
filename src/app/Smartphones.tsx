import { preparedProducts } from "@/common/helpers";
import { Pagination } from "@/components";
import {
  CardProducts,
  ContainerFilter,
  useFilteredProducts,
} from "@/features/products";
import { useState } from "react";

export function Smartphones() {
  const [page, setPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const {
    products = [],
    isLoading,
    totalProducts,
  } = useFilteredProducts({
    page,
    brands: selectedBrands,
  });

  const prepareProducts = preparedProducts(products);
  return (
    <>
      <h1 className="text-5xl font-semibold text-center mb-12">Celulares</h1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* FILTROS */}
        <ContainerFilter selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}/>
        {isLoading ? (
          <div className="col-span-2 flex items-center justify-center h-[588px]">
            <p className="text-2xl">Cargando...</p>
          </div>
        ) : (
          <div className="col-span-2 lg:col-span-2 xl:col-span-4 flex flex-col gap-12">
            <div className="grid grid-cols-2 gap-3 gap-y-10 xl:grid-cols-4">
              {prepareProducts.map((product) => (
                <CardProducts
                  key={product.id}
                  img={product.images[0]}
                  name={product.name}
                  price={product.price}
                  colors={product.colors}
                  variants={product.variants}
                  slug={product.slug}
                />
              ))}
            </div>

            {/* PAGINACION */}
            <Pagination
              page={page}
              setPage={setPage}
              totalItems={totalProducts}
            />
          </div>
        )}
      </div>
    </>
  );
}
