import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '../../services/userSupabaseService'; // Adjust path as per your project structure

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => fetchUserProfile(userId),
  });
};

export default useUserProfile;
