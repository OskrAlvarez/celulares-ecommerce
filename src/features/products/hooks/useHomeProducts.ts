import { useQueries } from '@tanstack/react-query';
import { getRandomProducts, getRecentProducts } from '../products.service';

export const useHomeProducts = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['recentProducts'],
        queryFn: getRecentProducts
      },
      {
        queryKey: ['randomProducts'],
        queryFn: getRandomProducts
      }
    ]
  });

  const [ recentProducts, randomProducts ] = results

  // Combinar los estados de las consultas
  const isLoading = recentProducts.isLoading || randomProducts.isLoading
  const isError = recentProducts.isError || randomProducts.isError

  return {
    recentProducts: recentProducts.data || [],
    randomProducts: randomProducts.data || [],
    isLoading,
    isError
  }

};
