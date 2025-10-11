import { getProducts } from "@/features/products/products.service"
import { useQuery } from "@tanstack/react-query"

export const useProducts = ({page = 1, pageItems }: {page: number, pageItems: number}) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products", page, pageItems],
    queryFn: () => getProducts(page, pageItems),
    staleTime: 1000 * 60 * 5 // 1 hora
  })

  return {
    products: data?.products,
    isLoading,
    totalProducts: data?.count ?? 0
  }
}
