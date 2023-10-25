import { useCallback, useState } from 'react';
import {
  AppBar,
  Box,
  Button, Container, IconButton, Toolbar, useMediaQuery, useTheme,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../store/AuthProvider';
import AppDrawer from './AppDrawer';

export default function Header() {
  const { userId, userIdLoading, signOut } = useAuth();
  const loggedIn = userId && !userIdLoading;

  const [open, setOpen] = useState(false);
  const closeDrawer = useCallback(() => { setOpen(false); }, []);
  const toggleDrawer = useCallback(() => { setOpen(!open); }, [open]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const mobileToolbar = (
    <>
      <IconButton
        size="large"
        edge="start"
        color="primary"
        aria-label="menu"
        onClick={toggleDrawer}
      >
        <Menu />
      </IconButton>
      <Button component={Link} to="/home">Poolscore</Button>
    </>
  );

  const desktopToolbar = (
    <>
      <Button component={Link} to="/home">Poolscore</Button>
      <Box sx={{ flexGrow: 1 }} />
      { loggedIn ? (
        <>
          <Button component={Link} to="/matchdays">Spieltage</Button>
          <Button component={Link} to="/tables">Tische</Button>
          <Button onClick={signOut}>Logout</Button>
        </>
      )
        : null /* <Button component={Link} to="/login">Login</Button> */}
    </>
  );

  return (
    <AppBar color="transparent" position="sticky">
      <Container>
        <Toolbar disableGutters>
          {isMobile ? mobileToolbar : desktopToolbar}
        </Toolbar>
      </Container>
      <AppDrawer
        open={open}
        onClose={closeDrawer}
      />
    </AppBar>
  );
}
