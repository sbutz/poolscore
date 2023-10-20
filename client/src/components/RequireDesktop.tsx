import {
  Stack, Typography, useMediaQuery, useTheme,
} from '@mui/material';

interface RequireProps {
  children: React.ReactNode;
}
export default function RequireDesktop({ children } : RequireProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isPortrait = useMediaQuery('(orientation: portrait)');

  if (isDesktop) return <div>{children}</div>;

  return (
    <Stack textAlign="center" height="100vh" justifyContent="center" sx={{ p: 5 }}>
      <Typography variant="h4">
        Dieses Funktion ist nur für breite Bildschirme verfügbar.
      </Typography>
      {isPortrait
        ? (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>
            Tipp: Dein Gerät befindet sich im Porträt-Modus (Hochformat).
            Probiere es mal mit kippen!
          </Typography>
        )
        : null}
    </Stack>
  );
}
