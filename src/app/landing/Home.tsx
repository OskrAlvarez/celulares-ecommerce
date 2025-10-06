import { preparedProducts } from "@/common/helpers";
import {
  Brands,
  FeatureGrid,
  ProductGrid,
  ProductGridSkeleton,
} from "@/components";

import { useHomeProducts } from "@/features/products";

export function Home() {
  const { randomProducts, recentProducts, isLoading } = useHomeProducts();

  const preparedRecentProducts = preparedProducts(recentProducts);
  const popularProducts = preparedProducts(randomProducts);
  return (
    <div>
      <FeatureGrid />

      {isLoading ? (
        <ProductGridSkeleton numberOfProducts={4} />
      ) : (
        <ProductGrid
          title="Nuevos Productos"
          products={preparedRecentProducts}
        />
      )}
      {isLoading ? (
        <ProductGridSkeleton numberOfProducts={4} />
      ) : (
        <ProductGrid title="Productos Destacados" products={popularProducts} />
      )}

      <Brands />
    </div>
  );
}
