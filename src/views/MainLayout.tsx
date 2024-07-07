import { PlayArrow, PlaylistPlay } from '@mui/icons-material';
import {
  BottomNavigation, BottomNavigationAction, Container, Paper, Stack,
} from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';

const routes : { [path: string]: number } = {
  '/games': 0,
  '/matchdays': 1,
};

function NavBar() {
  const location = useLocation();
  const value = routes[location.pathname] || 0;

  return (
    <Paper
      sx={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
      }}
      elevation={3}
    >
      <BottomNavigation showLabels value={value}>
        <BottomNavigationAction label="Partien" icon={<PlayArrow />} component={Link} to="/games" />
        <BottomNavigationAction label="Spieltage" icon={<PlaylistPlay />} component={Link} to="/matchdays" />
      </BottomNavigation>
    </Paper>
  );
}

export default function MainLayout() {
  return (
    <Stack height="100vh">
      <Container maxWidth="md">
        <Outlet />
      </Container>
      <NavBar />
    </Stack>
  );
}
