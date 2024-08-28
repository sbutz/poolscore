import { ArrowBack } from '@mui/icons-material';
import {
  AppBar, IconButton, Toolbar, Typography, Container, Box,
} from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';

export default function NestedLayout() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            sx={{ mr: 2 }}
            onClick={() => { navigate(-1); }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Poolscore
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ pb: 4 }}>
        <Toolbar sx={{ mb: 4 }} />
        <Outlet />
      </Container>
    </Box>
  );
}
