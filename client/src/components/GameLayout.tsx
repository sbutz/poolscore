import { Stack, Container } from '@mui/material';

import RequireDesktop from './RequireDesktop';
import GameBar from './GameBar';

interface LayoutProps {
  children: React.ReactNode;
  fullwidth?: boolean;
  toolbar?: React.ReactNode;
  requireDesktop?: boolean;
}

export default function Layout({
  children, fullwidth = false, toolbar = undefined, requireDesktop = false,
} : LayoutProps) {
  const content = (
    <Stack height="100vh">
      {fullwidth ? children
        : (
          <Container maxWidth="md" sx={{ py: 5 }}>
            {children}
          </Container>
        )}
      <GameBar>
        {toolbar}
      </GameBar>
    </Stack>
  );

  return requireDesktop ? <RequireDesktop>{content}</RequireDesktop> : content;
}
