import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface FlowerCardProps {
  name: string;
  price: number;
  image: string;
}

function FlowerCard({ name, price, image }: FlowerCardProps) {
  return (
    <Card>
      <CardMedia
        component="img"
        image={image}
        alt={name}
        sx={{ height: '300px' }}
      />
      <CardContent>
        <Typography gutterBottom variant="subtitle1" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ₱{price}
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{
              boxShadow: 'none',
              mr: { xs: 0, sm: 2 },
              mb: { xs: 2, sm: 0 },

              '&:hover': {
                backgroundColor: '#fda4af',
              },
            }}
          >
            Add to Cart
          </Button>
          <IconButton aria-label="add to favorites" sx={{ ml: 7 }}>
            <FavoriteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}

export default FlowerCard;
