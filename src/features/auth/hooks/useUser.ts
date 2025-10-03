import { useQuery } from '@tanstack/react-query';
import { getSession } from '../auth.service';

export const useUser = () => {
  const {
    data: session,
    isLoading
  } = useQuery({
    queryKey: ['user'],
    queryFn: getSession,
    retry: false,
    refetchOnWindowFocus: true
  });

  return {
    session,
    isLoading
  };
};
