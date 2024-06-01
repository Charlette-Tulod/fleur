import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  fetchFlowerById,
  fetchFlowersByCategory,
  fetchAllFlowers,
} from '../../services/flowersSupabaseService';

import { Product } from '../../models/flowers';

export const useAllFlowers = (options?: UseQueryOptions<Product[], Error>) => {
  return useQuery<Product[], Error>({
    queryKey: ['allFlowers'],
    queryFn: fetchAllFlowers,
    ...options,
  });
};

export const useFlowerById = (
  id: string,
  options?: UseQueryOptions<Product, Error>
) => {
  return useQuery<Product, Error>({
    queryKey: ['flower', id],
    queryFn: () => fetchFlowerById(id),
    ...options,
  });
};

export const useFlowersByCategory = (category: string | null) => {
  return useQuery<Product[]>({
    queryKey: ['flowers', category],
    queryFn: () => fetchFlowersByCategory(category),

    enabled: !!category,
  });
};
