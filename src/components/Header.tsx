import {
  AppBar, Toolbar, IconButton, Typography, useTheme,
} from '@mui/material';
import { memo } from 'react';

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
  icon: React.ReactNode;
  onIconClick?: () => void;
}

function Header({
  title, children = null, icon, onIconClick = undefined,
}: HeaderProps) {
  const theme = useTheme();

  return (
    <AppBar position="sticky" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={onIconClick}
        >
          {icon}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
}

export default memo(Header);
