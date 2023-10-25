import { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Drawer, List, ListItem, ListItemIcon, ListItemButton, useTheme, ListItemText, Divider,
} from '@mui/material';
import {
  CalendarMonth,
  Close, Home, Logout, TableRestaurant,
} from '@mui/icons-material';
import { useAuth } from '../store/AuthProvider';
import { footerText } from './Footer';

interface AppDrawerProps {
  open: boolean;
  onClose: () => void;
}

const drawerBoxSx = {
  width: 250,
  flexShrink: 0,
};

export default memo((props: AppDrawerProps) => {
  const theme = useTheme();
  const { userId, userIdLoading, signOut } = useAuth();
  const isLoggedIn = userId && !userIdLoading;

  const drawerList = (
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={props.onClose}>
          <ListItemIcon>
            <Close />
          </ListItemIcon>
        </ListItemButton>
      </ListItem>
      <ListItem>
        <ListItemButton component={Link} to="/home">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Startseite" />
        </ListItemButton>
      </ListItem>
      <Divider />
      { /* isLoggedIn ? null
        : (
          <ListItem>
            <ListItemButton component={Link} to="/login">
              <ListItemIcon>
                <Login />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        ) */}
      { isLoggedIn
        ? (
          <>
            <ListItem>
              <ListItemButton component={Link} to="/tables">
                <ListItemIcon>
                  <TableRestaurant />
                </ListItemIcon>
                <ListItemText primary="Tische" />
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton component={Link} to="/matchday">
                <ListItemIcon>
                  <CalendarMonth />
                </ListItemIcon>
                <ListItemText primary="Spieltage" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton onClick={signOut}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </>
        )
        : null}
      <ListItem disablePadding sx={{ position: 'fixed', bottom: 0 }}>
        <ListItemButton component={Link} to="/legal">
          <ListItemText primary={footerText} secondary="Legal" />
        </ListItemButton>
      </ListItem>
    </List>
  );

  return (
    <Drawer
      anchor="left"
      open={props.open}
      onClose={props.onClose}
      PaperProps={{
        sx: {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
    >
      <Box
        role="presentation"
        sx={drawerBoxSx}
        onClick={props.onClose}
        textAlign="start"
      >
        {drawerList}
      </Box>
    </Drawer>
  );
});
