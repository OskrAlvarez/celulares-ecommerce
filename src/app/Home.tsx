import { preparedProducts } from "@/common/helpers";
import { Brands, FeatureGrid, ProductGrid } from "@/components";
import { popularCelulares, recentCelulares } from "@/data/initialData";

export function Home() {
  const preparedRecentProducts = preparedProducts(recentCelulares)
  const popularProducts = preparedProducts(popularCelulares)
  return (
    <div>
      <FeatureGrid />
      <ProductGrid  title="Nuevos Productos" products={preparedRecentProducts} />
      <ProductGrid  title="Productos Destacados" products={popularProducts} />
      <Brands />
    </div>
  )
}
