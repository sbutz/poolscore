import {
  AppBar, Box, Button, Stack, Toolbar,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Stack height="100vh" spacing={5} alignItems="center">
      <AppBar color="transparent" position="sticky">
        <Toolbar>
          <Button component={Link} to="/">Poolscore</Button>
          <Box sx={{ flexGrow: 1 }} />
          {/*
          <Button component={Link} to="/login">Login</Button>
          */}
        </Toolbar>
      </AppBar>
      {children}
      <Footer />
    </Stack>
  );
}
