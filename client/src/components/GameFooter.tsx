import { Home } from '@mui/icons-material';
import {
  AppBar, Toolbar, IconButton, Stack,
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
          <IconButton
            size="large"
            sx={{ ml: 2, position: 'fixed', left: 0 }}
            component={Link}
            to="/home"
          >
            <Home />
          </IconButton>
          {children}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
