import { Container, Typography } from '@mui/material';

function NotFoundPage() {
  return (
    <Container
      sx={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff1f2',
      }}
    >
      <Typography
        variant="h1"
        component="h1"
        gutterBottom
        sx={{ fontSize: '5rem', fontWeight: 'bold' }}
      >
        404 Not Found
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ fontSize: '1.5rem' }}>
        This page does not exist
      </Typography>
    </Container>
  );
}

export default NotFoundPage;
