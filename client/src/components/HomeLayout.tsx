import { Stack, useMediaQuery, useTheme } from '@mui/material';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Stack height="100vh" spacing={5} alignItems="center">
      <Header />
      {children}
      {isDesktop ? <Footer /> : null}
    </Stack>
  );
}
