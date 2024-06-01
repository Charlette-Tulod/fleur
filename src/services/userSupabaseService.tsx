import supabase from '../config/supabaseClient';
import { User } from '../models/user'; // Assuming you have defined types/interfaces in a separate file

export const fetchUserProfile = async (
  userId: string
): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, phone, email, password, address')
      .eq('id', userId)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data ?? null;
  } catch (error) {
    console.error('Fetch Profile Error:', error);
    throw new Error('Failed to fetch profile.');
  }
};

export const updateProfile = async (
  userId: string,
  profileData: Partial<User>
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update(profileData)
      .eq('id', userId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    console.error('Update Profile Error:', error);
    throw new Error('Failed to update profile.');
  }
};
