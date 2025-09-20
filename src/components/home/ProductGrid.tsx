import type { PreparedProducts } from "@/common/interfaces";
import { CardProducts } from "@/features/products/components/CardProducts";

interface Props {
  title: string;
  products: PreparedProducts[]
}
export function ProductGrid({ title, products }: Props) {
  return (
    <div className='my-32'>
      <h2 className="text-3xl font-semibold text-center mb-8 md:text-4xl lg:text-5xl">
          {title}
      </h2>
      <div className='grid grid-cols-1 gap-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-4'>
        {products.map(product => (
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
    </div>
  )
}
