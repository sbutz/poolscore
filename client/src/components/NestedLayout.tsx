import {
  Stack, Container, AppBar, Toolbar, Typography, IconButton,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';

interface HeaderProps {
  title: string;
  children?: React.ReactNode;
}
function NestedHeader({ title, children = null }: HeaderProps) {
  const navigate = useNavigate();
  const goBack = useCallback(() => { navigate(-1); }, [navigate]);

  return (
    <AppBar position="sticky" color="transparent">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          sx={{ mr: 2 }}
          color="inherit"
          onClick={goBack}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {children}
      </Toolbar>
    </AppBar>
  );
}

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}
export default function NestedLayout({ title, children } : LayoutProps) {
  return (
    <Stack height="100vh">
      <NestedHeader title={title} />
      <Container>
        {children}
      </Container>
    </Stack>
  );
}
