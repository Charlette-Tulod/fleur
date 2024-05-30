import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Image1 from '../../assets/image1.jpeg';
import Image2 from '../../assets/image2.jpeg';

interface ImageCardProps {
  image: string;
  title: string;
  description: string;
}

function ImageCard({ image, title, description }: ImageCardProps) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 300, md: 400 }, // Responsive height
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: '#fff',
        textAlign: 'left',
        p: { xs: 2, md: 3 }, // Responsive padding
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          ml: { xs: 28, md: 30 }, // Responsive left margin
          maxWidth: { xs: '70%', md: '60%' }, // Responsive max width
        }}
      >
        <Typography
          variant="h4"
          component="h2"
          color="customColors.brown"
          gutterBottom
          sx={{ fontSize: { xs: '1.5rem', md: '2.2rem' } }} // Responsive font size
        >
          {title}
        </Typography>
        <Typography
          variant="body1"
          color="customColors.brown"
          paragraph
          sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }} // Responsive font size
        >
          {description}
        </Typography>
        <Button
          onClick={() => navigate('/flowers')}
          variant="contained"
          sx={{
            borderRadius: 10,
            backgroundColor: '#ffffff',
            '&:hover': {
              backgroundColor: '#fff1f2',
            },
            fontSize: { xs: '0.75rem', md: '0.75rem' }, // Responsive font size
            padding: { xs: '0.5rem 1rem', md: '0.75rem 1.5rem' }, // Responsive padding
          }}
        >
          Shop Now
        </Button>
      </Box>
    </Box>
  );
}

function ImageDisplay() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 5, md: 10 }, // Responsive gap
        p: { xs: 2, md: 5 }, // Responsive padding
      }}
    >
      <ImageCard
        image={Image1}
        title="Beautiful Bouquets"
        description="Discover our stunning collection of bouquets for all occasions."
      />
      <ImageCard
        image={Image2}
        title="Seasonal Flowers"
        description="Explore our range of fresh seasonal flowers."
      />
    </Box>
  );
}

export default ImageDisplay;
