import { preparedProducts } from "@/common/helpers";
import { allCelulares } from "@/data/initialData";
import { CardProducts } from "@/features/products/components/CardProducts";
import { ContainerFilter } from "@/features/products/components/ContainerFilter";

export function Smartphones() {
  const prepareProducts = preparedProducts(allCelulares);
  return (
    <>
      <h1 className="text-5xl font-semibold text-center mb-12">Celulares</h1>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* FILTROS */}
        <ContainerFilter />
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
        </div>
      </div>
    </>
  );
}
