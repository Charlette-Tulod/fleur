import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import Image1 from '../../assets/image4.jpeg';
import Image2 from '../../assets/image5.jpeg';

function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        color="customColors.brown"
        gutterBottom
      >
        About Fleur
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom paragraph>
        Welcome to Fleur, your ultimate destination for beautiful and fresh
        flowers. At Fleur, we believe that flowers are more than just plants –
        they are expressions of love, joy, and beauty. Whether you are looking
        for a stunning bouquet to brighten someones day, or exquisite floral
        arrangements for a special occasion, we have you covered.
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom paragraph>
        Our mission is to provide our customers with the highest quality
        flowers, sourced from the best growers around the world. We take pride
        in our extensive selection of flowers, including seasonal and exotic
        varieties, to ensure that you find the perfect arrangement for any
        event.
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom paragraph>
        At Fleur, we are committed to sustainability and eco-friendly practices.
        We carefully select our suppliers based on their commitment to
        sustainable farming practices, and we strive to reduce our environmental
        footprint in every aspect of our business.
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom paragraph>
        Thank you for choosing Fleur. We look forward to helping you celebrate
        lifes special moments with the beauty of flowers.
      </Typography>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              image={Image2}
              sx={{ height: '300px' }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Our Flower Shop
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visit our shop to explore a wide variety of flowers and floral
                arrangements. Our friendly staff is always here to help you find
                the perfect bouquet.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardMedia
              component="img"
              image={Image1}
              sx={{ height: '300px' }}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                Sustainability
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We are committed to eco-friendly practices and sustainability.
                Our flowers are sourced from growers who use sustainable farming
                methods.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AboutPage;
