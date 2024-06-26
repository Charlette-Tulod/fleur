import { useParams } from 'react-router-dom';
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useFlowerById } from '../../hooks/flowersHooks/useFlowers';
import { useCart } from '../../hooks/cartHooks/useCart';

function FlowerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart(); // Get addToCart function from useCart hook

  const { data: flower, isLoading, isError } = useFlowerById(id || '');

  if (!id) {
    return <Typography variant="h4">Invalid flower ID</Typography>;
  }

  if (isLoading) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  if (isError || !flower) {
    return <Typography variant="h4">Error fetching flower details</Typography>;
  }

  const handleAddToCart = () => {
    addToCart(flower);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 7, mb: 7 }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
        }}
      >
        <CardMedia
          component="img"
          src={flower.image}
          alt={flower.name}
          sx={{ width: '100%', maxWidth: 350, height: 'auto' }}
        />
        <CardContent sx={{ flex: 1, p: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="customColors.brown"
            mb={2}
          >
            {flower.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Category: {flower.category}
          </Typography>
          <Divider sx={{ borderColor: '#ffe4e6', my: 3 }} />
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {flower.description}
          </Typography>
          <Typography variant="h6" color="customColors.brown" sx={{ mt: 4 }}>
            ₱{flower.price}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button
              variant="contained"
              size="small"
              startIcon={<ShoppingCart />}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
}

export default FlowerDetailsPage;
