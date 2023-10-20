import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Container } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';

import Header from './Header';
import AppDrawer from './AppDrawer';
import RequireDesktop from './RequireDesktop';

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  fullwidth?: boolean;
  nested?: boolean;
  toolbar?: React.ReactNode;
  requireDesktop?: boolean;
}

const backIcon = <ArrowBack />;
const menuIcon = <MenuIcon />;

export default function Layout({
  title, children, fullwidth = false, nested = false, toolbar = undefined, requireDesktop = false,
} : LayoutProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const closeDrawer = useCallback(() => { setOpen(false); }, []);
  const toggleDrawer = useCallback(() => { setOpen(!open); }, [open]);
  const goBack = useCallback(() => { navigate(-1); }, [navigate]);

  const content = (
    <Stack height="100vh">
      <Box sx={{ flexGrow: 0, flexShrink: 1, flexBasis: 'auto' }}>
        <Header
          title={title}
          onIconClick={nested ? goBack : toggleDrawer}
          icon={nested ? backIcon : menuIcon}
        >
          {toolbar}
        </Header>
        <AppDrawer
          open={open}
          onClose={closeDrawer}
        />
      </Box>
      <Box sx={{ flexGrow: 1, flexShrink: 1, flexBasis: 'auto' }}>
        {fullwidth ? children
          : (
            <Container maxWidth="md" sx={{ py: 5 }}>
              {children}
            </Container>
          )}
      </Box>
    </Stack>
  );

  return requireDesktop ? <RequireDesktop>{content}</RequireDesktop> : content;
}
