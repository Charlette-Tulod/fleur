import { Link } from 'react-router-dom';
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
  id: string;
  name: string;
  price: number;
  image: string;
}

function FlowerCard({ id, name, price, image }: FlowerCardProps) {
  return (
    <Link to={`/flowers/${id}`}>
      <Card
        sx={{
          border: '1px solid #fff1f2',
          boxShadow: 'none',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
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
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
}

export default FlowerCard;
