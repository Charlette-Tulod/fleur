import { useQuery } from '@tanstack/react-query';
import { fetchFlowersByCategory } from '../../services/flowersSupabaseService';

const useFlowersByCategory = (category: string | null) =>
  useQuery({
    queryKey: ['flowers', category],
    queryFn: () => fetchFlowersByCategory(category),
    enabled: !!category,
  });

export default useFlowersByCategory;
