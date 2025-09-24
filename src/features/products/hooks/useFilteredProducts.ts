import { useQuery } from "@tanstack/react-query"
import { getFilteredProducts } from "../products.service"

export const useFilteredProducts = ({page, brands}: { page: number, brands: Array<string> }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["filteredProducts", page, brands],
    queryFn: () => getFilteredProducts({page, brands}),
    retry: false // Si falla la peticion, no reintentar
  })

  return {
    products: data?.data,
    isLoading,
    totalProducts: data?.count ?? 0
  }
}
