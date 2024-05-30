import { Box, Button, Typography } from '@mui/material';

const categories = {
  Bouquets: [],
  'Special Events': [],
  Vases: [],
};

function FlowerLists() {
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
        sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3, mt: 5 }}
      >
        {Object.keys(categories).map((category) => (
          <Button
            key={category}
            sx={{
              borderRadius: 10,
              color: '#fda4af',
              '&:hover': {
                color: '#fff1f2',
              },
            }}
          >
            {category}
          </Button>
        ))}
      </Box>
    </Box>
  );
}

export default FlowerLists;
