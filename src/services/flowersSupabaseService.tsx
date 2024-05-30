import supabase from '../config/supabaseClient';

// Function to fetch flowers by category
export const fetchFlowersByCategory = async (category: string | null) => {
  const { data, error } = await supabase
    .from('flowers')
    .select('*')
    .eq('category', category);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Function to fetch all flowers
export const fetchAllFlowers = async () => {
  const { data, error } = await supabase.from('flowers').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// Function to fetch a flower by its ID
export const fetchFlowerById = async (id: string | undefined) => {
  const { data, error } = await supabase
    .from('flowers')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
