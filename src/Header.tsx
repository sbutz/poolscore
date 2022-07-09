import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import {AppBar, Box, Button, Drawer, List, ListItem, ListItemButton,
    ListItemIcon, ListItemText, Toolbar, IconButton, Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Home, Undo } from '@mui/icons-material';

import AlertDialog from './AlertDialog';
import { Context } from './Store';

function Header() {
    const [state, dispatch] = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);

    const drawerList = (
        <Box
            role="presentation"
            sx={{
                width: 250,
                flexShrink: 0,
            }}
            onClick={() => { setOpenDrawer(false); }}
        >
        <List>
            <ListItem key={'home'} disablePadding>
            <ListItemButton onClick={() => { setOpenDialog(true); }}>
                <ListItemIcon>
                    <Home />
                </ListItemIcon>
                <ListItemText primary={'Startseite'} />
            </ListItemButton>
            </ListItem>
        </List>
        </Box>
    );

    return (
    <div>
        <AppBar position="sticky"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
         >
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => { setOpenDrawer(!openDrawer); }}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    BC 73 Pfeffenhausen
                </Typography>
                { location.pathname == "/" ? null :
                <Button
                    color="inherit"
                    startIcon={<Undo/>}
                    onClick={() => { dispatch?.({type: 'rollback_score'}); }}
                >
                    Rückgängig
                </Button>
                }
            </Toolbar>
        </AppBar>
        <Drawer
            anchor={'left'}
            open={openDrawer}
            onClose={() => { setOpenDrawer(false); }}
            PaperProps={{
                sx: {
                    top: (theme) => theme.spacing(8),
                }
            }}
        >
            {drawerList}
        </Drawer>
        <AlertDialog
            open={openDialog}
            title={"Zurück zur Startseite?"}
            text={"Der aktuelle Spielstand geht dabei verloren."}
            cancelText={"Abbrechen"}
            onCancel={()=> { setOpenDialog(false); }}
            acceptText={"Ok"}
            onAccept={() => {
                setOpenDialog(false);
                dispatch?.({type: 'reset_score'});
                navigate(-1);
            }}
        />
    </div>
    );
}

export default Header;