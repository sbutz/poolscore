import { EmojiEvents } from '@mui/icons-material';
import {
  AppBar, Toolbar, Stack, Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

interface HeaderProps {
  children: React.ReactNode;
}

export default function GameFooter({ children }: HeaderProps) {
  return (
    <AppBar color="transparent" position="sticky">
      <Toolbar>
        <Stack direction="row" justifyContent="center" width="100%" spacing={3}>
          <Button
            color="inherit"
            startIcon={<EmojiEvents />}
            component={Link}
            to="/matchdays"
            sx={{ ml: 4, position: 'fixed', left: 0 }}
            disabled
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
