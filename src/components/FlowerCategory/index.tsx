import { useState } from 'react';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FlowerCard from '../FlowerCard';
import {
  useAllFlowers,
  useFlowersByCategory,
} from '../../hooks/flowersHooks/useFlowers';

const categories = ['Bouquets', 'Special Events', 'Vases'];

function FlowerCategory() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('Bouquets');
  const [showAll, setShowAll] = useState<boolean>(false);

  const {
    data: allFlowers,
    isLoading: isAllFlowersLoading,
    error: allFlowersError,
  } = useAllFlowers();
  const {
    data: flowers,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useFlowersByCategory(selectedCategory);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setShowAll(false);
  };

  const handleSeeAllClick = () => {
    setShowAll(true);
    setSelectedCategory('');
  };

  if (isCategoryLoading || isAllFlowersLoading) {
    return <Typography>Loading...</Typography>;
  }
  if (categoryError || allFlowersError) {
    return <Typography>Error fetching data</Typography>;
  }

  const displayedFlowers = showAll ? allFlowers : flowers;
  const limitedFlowers = displayedFlowers ? displayedFlowers.slice(0, 4) : [];

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
      {limitedFlowers && (
        <Box
          sx={{
            p: { xs: 2, md: 3 },
          }}
        >
          <Grid container spacing={5}>
            {limitedFlowers.map((flower) => (
              <Grid item xs={12} sm={6} md={3} key={flower.id}>
                <FlowerCard product={flower} />
              </Grid>
            ))}
          </Grid>
          {displayedFlowers && displayedFlowers.length > 4 && (
            <Button
              onClick={() => navigate('/flowers')}
              sx={{
                mt: 3,
                borderRadius: 10,
                color: '#fda4af',
                '&:hover': {
                  backgroundColor: '#fff1f2',
                  color: '#fda4af',
                },
              }}
            >
              See More
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}

export default FlowerCategory;
