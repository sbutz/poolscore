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
  const {
    userId, userIdLoading, signOut, admin,
  } = useAuth();
  const isLoggedIn = userId && !userIdLoading;
  const isAdmin = isLoggedIn && admin;

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
      { isAdmin ? (
        <>
          <Button component={Link} to="/matchday">Spieltage</Button>
          <Button component={Link} to="/tables">Tische</Button>
          <Button component={Link} to="/club">Verein</Button>
        </>
      ) : null }
      { isLoggedIn
        ? <Button onClick={signOut}>Logout</Button>
        : <Button component={Link} to="/login">Login</Button> }
    </>
  );

  return (
    <AppBar color="inherit" position="sticky">
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
