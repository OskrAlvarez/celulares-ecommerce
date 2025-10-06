import { useQuery } from '@tanstack/react-query';
import { getOrdersById } from '../orders.service';

export const useOrder = (orderId: number) => {
  const {
    data,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrdersById(orderId),
    enabled: !!orderId,
    retry: false
  });

  return {
    data,
    isLoading,
    isError
  };
};
