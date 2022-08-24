import { useState } from 'react';
import { Stack, Box, Container } from '@mui/material'

import Header from './Header';
import AppDrawer from './AppDrawer';

interface LayoutProps {
    title: string;
    children: React.ReactNode;
    fullwidth?: boolean;
    toolbar?: React.ReactNode[];
}
function Layout(props : LayoutProps) {
    const [open, setOpen] = useState(false);
    return (
    <Stack height="100vh">
        <Box sx={{flexGrow: 0, flexShrink: 1, flexBasis: "auto"}}>
            <Header
                title={props.title}
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
            {props.fullwidth ?  props.children :
                <Container maxWidth="md" sx={{py: 5}}>
                    {props.children}
                </Container>
            }
        </Box>
    </Stack>
    );
}

export default Layout;