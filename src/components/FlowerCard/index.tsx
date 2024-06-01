import { Link } from 'react-router-dom';
import { CardContent, CardMedia, Typography, Button, Box } from '@mui/material';

import { Product } from '../../models/flowers';
import { useCart } from '../../hooks/cartHooks/useCart';
import CustomCard from '../UI/Card';

interface FlowerCardProps {
  product: Product;
}

function FlowerCard({ product }: FlowerCardProps) {
  const { addToCart } = useCart();
  if (!product) {
    return null;
  }
  return (
    <Link to={`/flowers/${product.id}`}>
      <CustomCard>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.name}
          sx={{ height: '300px' }}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="div">
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ₱{product.price}
          </Typography>

          <Box sx={{ mt: 3 }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => addToCart(product)}
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
          </Box>
        </CardContent>
      </CustomCard>
    </Link>
  );
}

export default FlowerCard;
