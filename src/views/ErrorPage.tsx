import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router';

const defaultErrorMessage = 'Ups, es ist ein Fehler aufgetreten.';

interface ErrorProps {
  message?: string;
  hint?: string;
}

export default function ErrorPage({ message = defaultErrorMessage, hint = '' }:ErrorProps) {
  return (
    <Stack textAlign="center" height="100vh" justifyContent="center" sx={{ p: 5 }} spacing={2}>
      <Typography variant="h4">{message}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>{hint}</Typography>
      <Button component={Link} to="/">Zurück zur Startseite</Button>
    </Stack>
  );
}
