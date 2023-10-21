import { useMediaQuery, useTheme } from '@mui/material';
import ErrorPage from '../views/ErrorPage';

interface RequireProps {
  children: React.ReactNode;
}
export default function RequireDesktop({ children } : RequireProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isPortrait = useMediaQuery('(orientation: portrait)');

  if (isDesktop) return <div>{children}</div>;

  return (
    <ErrorPage
      message="Dieses Funktion ist nur für breite Bildschirme verfügbar."
      hint={isPortrait ? 'Tipp: Dein Gerät befindet sich im Porträt-Modus (Hochformat). Probiere es mal mit kippen!' : undefined}
    />
  );
}
