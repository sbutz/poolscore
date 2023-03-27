import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

function ErrorPage() {
  return (
    <Layout title="Error">
      <Box sx={{ p: 5 }}>
        <Typography variant="h6">
          Ups, es ist ein Fehler aufgetreten.
        </Typography>
        <Button component={Link} to="/" sx={{ mt: 3 }}>
          Zurück zur Startseite
        </Button>
      </Box>
    </Layout>
  );
}

export default ErrorPage;
