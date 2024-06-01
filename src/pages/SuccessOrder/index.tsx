import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

function ThankYouPage() {
  return (
    <Container maxWidth="md" sx={{ mt: 7, mb: 7, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Thank You for Your Order!
      </Typography>
      <Typography variant="body1" paragraph>
        Your order has been successfully placed. We will send you an email with
        the details shortly.
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
      >
        Back to Home
      </Button>
    </Container>
  );
}

export default ThankYouPage;
