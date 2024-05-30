import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Typography, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import FlowerCard from '../FlowerCard';
import {
  fetchFlowersByCategory,
  fetchAllFlowers,
} from '../../services/flowersSupabaseService';

const categories = ['Bouquets', 'Special Events', 'Vases'];

function AllFlowers() {
  const { category: paramCategory } = useParams<{ category: string }>();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    paramCategory === 'all' ? null : paramCategory || null
  );

  const {
    data: flowers,
    isLoading,
    error,
  } = useQuery({
    queryKey: [selectedCategory ? 'flowers' : 'allFlowers', selectedCategory],
    queryFn: () =>
      selectedCategory
        ? fetchFlowersByCategory(selectedCategory)
        : fetchAllFlowers(),
  });

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSeeAllClick = () => {
    setSelectedCategory(null);
  };

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error fetching data</Typography>;
  }

  return (
    <Box sx={{ p: 3 }} textAlign="center">
      <Typography
        variant="h4"
        component="h2"
        sx={{
          fontWeight: 'bold',
          color: '#754328',
          mt: 3,
          textAlign: 'center',
        }}
      >
        {selectedCategory || 'All Flowers'}
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
            color: !selectedCategory ? '#fff1f2' : '#fda4af',
            backgroundColor: !selectedCategory ? '#fda4af' : 'transparent',
            '&:hover': {
              backgroundColor: '#fff1f2',
              color: '#fda4af',
            },
          }}
        >
          See All
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            sx={{
              borderRadius: 10,
              color: selectedCategory === cat ? '#fff1f2' : '#fda4af',
              backgroundColor:
                selectedCategory === cat ? '#fda4af' : 'transparent',
              '&:hover': {
                backgroundColor: '#fff1f2',
                color: '#fda4af',
              },
            }}
          >
            {cat}
          </Button>
        ))}
      </Box>
      <Grid container spacing={5}>
        {flowers?.map((flower) => (
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
  );
}

export default AllFlowers;