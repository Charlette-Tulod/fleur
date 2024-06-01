import {
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import Image1 from '../../assets/image7.png';

function ContactUsPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        color="customColors.brown"
        gutterBottom
      >
        Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        We would love to hear from you! Whether you have a question about our
        flowers, need assistance with an order, or just want to share your
        experience, were here to help.
      </Typography>

      <Card sx={{ mb: 2, mt: 5 }}>
        <CardMedia
          component="img"
          image={Image1}
          sx={{ height: '300px', mb: 3 }}
        />
        <CardContent>
          <Typography variant="h5" component="div" sx={{ mb: 2 }}>
            Our Contact Information
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Address:</strong> 123 Flower Lane, Blossom City, FL 12345
            <br />
            <strong>Phone:</strong> (123) 456-7890
            <br />
            <strong>Email:</strong> contact@fleur.com
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}

export default ContactUsPage;
