import { memo } from 'react';
import { Link } from "react-router-dom";
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemButton,
    ListItemText, Divider, useTheme} from '@mui/material'
import { CalendarMonth, Groups, SportsEsports, TableRestaurant } from '@mui/icons-material';

interface AppDrawerProps {
    open: boolean;
    onClose: () => void;
}

//TODO: replace after implementing user management
const isAdmin = true;

const drawerBoxSx = {
    width: 250,
    flexShrink: 0,
};

export default memo(function AppDrawer(props: AppDrawerProps) {
    const drawerList = (
    <Box
        role="presentation"
        sx={drawerBoxSx}
        onClick={props.onClose}
    >
        <List>
            {isAdmin ? <>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to={"/club"}>
                        <ListItemIcon>
                            <Groups />
                        </ListItemIcon>
                        <ListItemText primary={'Verein'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to={"/tables"}>
                        <ListItemIcon>
                            <TableRestaurant />
                        </ListItemIcon>
                        <ListItemText primary={'Tische'} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to={"/matchday"}>
                        <ListItemIcon>
                            <CalendarMonth />
                        </ListItemIcon>
                        <ListItemText primary={'Spieltage'} />
                    </ListItemButton>
                </ListItem>
                <Divider/>
            </> : null}
            <ListItem disablePadding>
                <ListItemButton component={Link} to={"/"}>
                    <ListItemIcon>
                        <SportsEsports />
                    </ListItemIcon>
                    <ListItemText primary={'Freies Spiel'} />
                </ListItemButton>
            </ListItem>
        </List>
    </Box>
    );

    const theme = useTheme();

    return(
        <Drawer
            anchor={'left'}
            open={props.open}
            onClose={props.onClose}
            PaperProps={{
                sx: {
                    pt: theme.spacing(8),
                }
            }}
        >
            {drawerList}
        </Drawer>
    );
});