import { Stack, Box } from '@mui/material'

import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
}
function Layout(props : LayoutProps) {
    return (
    <Stack height="100vh">
        <Box sx={{flexGrow: 0, flexShrink: 1, flexBasis: "auto"}}>
            <Header />
        </Box>
        <Box sx={{flexGrow: 1, flexShrink: 1, flexBasis: "auto"}}>
            {props.children}
        </Box>
    </Stack>
    );
}

export default Layout;