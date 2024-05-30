import { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import FlowerCard from '../FlowerCard';
import {
  fetchFlowersByCategory,
  fetchAllFlowers,
} from '../../services/flowersSupabaseService';

const categories = ['Bouquets', 'Special Events', 'Vases'];

function FlowerCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'Bouquets'
  ); // Default category set to 'Bouquets'
  const [showAll, setShowAll] = useState<boolean>(false);

  // Query to fetch flowers based on selected category
  const {
    data: flowers,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useQuery({
    queryKey: ['flowers', selectedCategory],
    queryFn: () => fetchFlowersByCategory(selectedCategory!),
    enabled: !!selectedCategory,
  });

  // Query to fetch all flowers across all categories
  const {
    data: allFlowers,
    isLoading: isAllFlowersLoading,
    error: allFlowersError,
  } = useQuery({
    queryKey: ['allFlowers'],
    queryFn: fetchAllFlowers,
    enabled: showAll,
  });

  // useEffect(() => {
  //   fetchFlowersByCategory(selectedCategory!);
  // }, [selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowAll(false);
  };

  const handleSeeAllClick = () => {
    setShowAll(true);
    setSelectedCategory(null);
  };

  if (isCategoryLoading || isAllFlowersLoading)
    return <Typography>Loading...</Typography>;
  if (categoryError || allFlowersError)
    return <Typography>Error fetching data</Typography>;

  const displayedFlowers = showAll ? allFlowers : flowers;

  return (
    <Box sx={{ p: 3 }} textAlign="center">
      <Typography variant="h4" component="h2" gutterBottom>
        Flower Categories
      </Typography>
      <Typography variant="body1" paragraph>
        Explore our different categories of flowers and arrangements to find the
        perfect one for any occasion.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mb: 3,
          mt: 5,
        }}
      >
        <Button
          onClick={handleSeeAllClick}
          sx={{
            borderRadius: 10,
            color: showAll ? '#fff1f2' : '#fda4af',
            backgroundColor: showAll ? '#fda4af' : 'transparent',
            '&:hover': {
              backgroundColor: '#fff1f2',
              color: '#fda4af',
            },
          }}
        >
          See All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryClick(category)}
            sx={{
              borderRadius: 10,
              color: selectedCategory === category ? '#fff1f2' : '#fda4af',
              backgroundColor:
                selectedCategory === category ? '#fda4af' : 'transparent',
              '&:hover': {
                backgroundColor: '#fff1f2',
                color: '#fda4af',
              },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>
      {displayedFlowers && (
        <Box
          sx={{
            p: { xs: 2, md: 3 }, // Responsive padding
          }}
        >
          <Grid container spacing={5}>
            {displayedFlowers.map((flower) => (
              <Grid item xs={12} sm={6} md={3} key={flower.id}>
                <FlowerCard
                  name={flower.name}
                  price={flower.price}
                  image={flower.image}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}

export default FlowerCategory;