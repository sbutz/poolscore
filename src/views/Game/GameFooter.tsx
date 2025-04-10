import { EmojiEvents } from '@mui/icons-material';
import {
  AppBar, Toolbar, Stack, Button,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router';

interface HeaderProps {
  children: React.ReactNode;
}

export default function GameFooter({ children }: HeaderProps) {
  const theme = useTheme();

  return (
    <AppBar color="transparent" position="sticky">
      <Toolbar>
        <Stack direction="row" justifyContent="center" width="100%" spacing={3}>
          <Button
            color="inherit"
            startIcon={<EmojiEvents />}
            component={Link}
            to="/games"
            sx={{
              position: 'fixed',
              left: theme.spacing(4),
            }}
          >
            Spieltage
          </Button>
          <Stack direction="row" spacing={3}>
            {children}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
