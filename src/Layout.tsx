import { useState } from 'react';
import { Stack, Box } from '@mui/material'

import Header from './Header';
import AppDrawer from './AppDrawer';

interface LayoutProps {
    children: React.ReactNode;
    toolbar?: React.ReactNode[];
}
function Layout(props : LayoutProps) {
    const [open, setOpen] = useState(false);
    return (
    <Stack height="100vh">
        <Box sx={{flexGrow: 0, flexShrink: 1, flexBasis: "auto"}}>
            <Header
                onIconClick={() => { setOpen(!open); }}
            >
                {props.toolbar}
            </Header>
            <AppDrawer
                open={open}
                onClose={() => { setOpen(false); }}
            />
        </Box>
        <Box sx={{flexGrow: 1, flexShrink: 1, flexBasis: "auto"}}>
            {props.children}
        </Box>
    </Stack>
    );
}

export default Layout;