import { Button, Container, Typography, Box } from '@mui/material';
import Background from '../../assets/background.png';

function Banner() {
  return (
    <Box
      sx={{
        py: { xs: 10, sm: 15 },
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right',
        height: { xs: 500, sm: 650 },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', sm: 'flex-start' },
          textAlign: { xs: 'center', sm: 'left' },
        }}
      >
        <Box sx={{ width: { xs: '100%', sm: '40%' } }}>
          <Typography
            variant="h4"
            component="h1"
            color="customColors.brown"
            gutterBottom
            sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}
          >
            Welcome to
            <br />
            <Typography
              variant="h2"
              component="span"
              fontWeight="bold"
              sx={{ fontSize: { xs: '3rem', sm: '4.25rem' } }}
            >
              Fleur Flowers!
            </Typography>
          </Typography>
          <Typography
            sx={{ my: 4, fontSize: { xs: '1rem', sm: '1.1rem' } }}
            variant="body1"
            color="customColors.brown"
            paragraph
          >
            Welcome to our enchanting flower shop, where every visit promises a
            bouquet of delights. Step into a world where natures artistry takes
            center stage, showcased in vibrant displays of freshly picked blooms
            and lush greenery. Whether you seek the perfect bouquet for a
            wedding celebration, a thoughtful gift for a loved one.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              my: 5,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: 20,
                width: '200px',
                boxShadow: 'none',
                mr: { xs: 0, sm: 2 },
                mb: { xs: 2, sm: 0 },
                '&:hover': {
                  backgroundColor: '#fda4af',
                },
              }}
            >
              Shop Now
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Banner;
