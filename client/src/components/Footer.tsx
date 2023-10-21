import { Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = (new Date()).getFullYear();
  return (
    <Container sx={{ position: 'fixed', bottom: 0 }}>
      <Stack direction={{ sm: 'row' }} justifyContent="space-between" alignItems="center">
        <Typography color="text.secondary">
          ©
          {' '}
          {currentYear}
          {' '}
          Stefan Butz®, all rights reserved
        </Typography>
        <Typography component={Link} to="/legal" color="text.secondary">Legal</Typography>
      </Stack>
    </Container>
  );
}
