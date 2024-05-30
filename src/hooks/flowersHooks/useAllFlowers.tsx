import { useQuery } from '@tanstack/react-query';
import { fetchAllFlowers } from '../../services/flowersSupabaseService';

export const useAllFlowers = () =>
  useQuery({
    queryKey: ['allFlowers'],
    queryFn: fetchAllFlowers,
  });

export default useAllFlowers;
