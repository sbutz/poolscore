import { Box, Drawer, List, ListItem, ListItemIcon, ListItemButton,
    ListItemText, } from '@mui/material'
import { Home } from '@mui/icons-material';
import { Link } from "react-router-dom";

interface AppDrawerProps {
    open: boolean;
    onClose: () => void;
}

function AppDrawer(props: AppDrawerProps) {
    const drawerList = (
        <Box
            role="presentation"
            sx={{
                width: 250,
                flexShrink: 0,
            }}
            onClick={props.onClose}
        >
        <List>
            <ListItem key={'home'} disablePadding>
            <ListItemButton component={Link} to={"/"}>
                <ListItemIcon>
                    <Home />
                </ListItemIcon>
                <ListItemText primary={'Startseite'} />
            </ListItemButton>
            </ListItem>
        </List>
        </Box>
    );

    return(
    <Drawer
        anchor={'left'}
        open={props.open}
        onClose={props.onClose}
        PaperProps={{
            sx: {
                top: (theme) => theme.spacing(8),
            }
        }}
    >
        {drawerList}
    </Drawer>
    );
}

export default AppDrawer;