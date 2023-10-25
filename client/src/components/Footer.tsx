import { Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const currentYear = (new Date()).getFullYear();
export const footerText = `© ${currentYear} Stefan Butz`;

export default function Footer() {
  return (
    <Container sx={{ position: 'fixed', bottom: 0, pb: 1 }}>
      <Stack direction={{ sm: 'row' }} justifyContent="space-between" alignItems="center">
        <Typography color="text.secondary">{footerText}</Typography>
        <Typography component={Link} to="/legal" color="text.secondary">Legal</Typography>
      </Stack>
    </Container>
  );
}
