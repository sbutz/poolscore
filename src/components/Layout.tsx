import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Container } from '@mui/material'
import { ArrowBack } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';

import Header from './Header';
import AppDrawer from './AppDrawer';

interface LayoutProps {
    title: string;
    children: React.ReactNode;
    fullwidth?: boolean;
    nested?: boolean;
    toolbar?: React.ReactNode;
}

const backIcon = <ArrowBack />;
const menuIcon = <MenuIcon />;

export default function Layout(props : LayoutProps) {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const closeDrawer = useCallback(() => { setOpen(false); }, []);
    const toggleDrawer = useCallback(() => { setOpen(!open); }, [open]);
    const goBack = useCallback(() => { navigate(-1); }, [navigate]);

    return (
        <Stack height="100vh">
            <Box sx={{flexGrow: 0, flexShrink: 1, flexBasis: "auto"}}>
                <Header
                    title={props.title}
                    onIconClick={props.nested ? goBack : toggleDrawer}
                    icon={props.nested ? backIcon : menuIcon}
                >
                    {props.toolbar}
                </Header>
                <AppDrawer
                    open={open}
                    onClose={closeDrawer}
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