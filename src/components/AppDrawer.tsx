import { Box, Drawer, List, ListItem, ListItemIcon, ListItemButton,
    ListItemText, Divider} from '@mui/material'
import { CalendarMonth, Groups, SportsEsports, TableRestaurant } from '@mui/icons-material';
import { Link } from "react-router-dom";

interface AppDrawerProps {
    open: boolean;
    onClose: () => void;
}

function AppDrawer(props: AppDrawerProps) {
    const isAdmin = true;
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

    return(
    <Drawer
        anchor={'left'}
        open={props.open}
        onClose={props.onClose}
        PaperProps={{
            sx: {
                pt: (theme) => theme.spacing(8),
            }
        }}
    >
        {drawerList}
    </Drawer>
    );
}

export default AppDrawer;