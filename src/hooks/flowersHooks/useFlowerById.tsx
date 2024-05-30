import { useQuery } from '@tanstack/react-query';
import { fetchFlowerById } from '../../services/flowersSupabaseService';

export const useFlowerById = (id: string | undefined) =>
  useQuery({
    queryKey: ['flower', id],
    queryFn: () => fetchFlowerById(id),
  });

export default useFlowerById;
