import {
  EmojiEvents, Menu, PlayArrow, SportsEsports,
} from '@mui/icons-material';
import {
  AppBar, IconButton, Toolbar, Typography, Container, Drawer, Box, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, useTheme, useMediaQuery,
  Button,
} from '@mui/material';
import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

function DrawerListItem(text: string, icon: React.ReactNode, link: string) {
  const location = useLocation();
  return (
    <ListItem key={text} disablePadding>
      <ListItemButton component={Link} to={link} selected={location.pathname === link}>
        <ListItemIcon>
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

interface MainDrawerProps {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
}
function MainDrawer({ open, toggleDrawer } : MainDrawerProps) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Drawer
      open={open}
      onClose={() => { toggleDrawer(false); }}
      variant={isDesktop ? 'permanent' : 'temporary'}
      sx={{
        width: 250,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 250,
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <List>
        {DrawerListItem('Freies Spiel', <SportsEsports />, '/')}
        {DrawerListItem('Partien', <PlayArrow />, '/games')}
        {DrawerListItem('Spieltage', <EmojiEvents />, '/matchdays')}
      </List>
    </Drawer>
  );
}

export default function MainLayout() {
  const theme = useTheme();
  const [openDrawer, setDrawerOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            sx={{ mr: 2 }}
            onClick={() => { setDrawerOpen(!openDrawer); }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Poolscore
          </Typography>
          <Button disabled>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <MainDrawer open={openDrawer} toggleDrawer={setDrawerOpen} />
      <Container maxWidth="md" sx={{ pb: 4 }}>
        <Toolbar sx={{ mb: 4 }} />
        <Outlet />
      </Container>
    </Box>
  );
}
