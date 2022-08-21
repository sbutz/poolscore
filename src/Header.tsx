import {AppBar, Toolbar, IconButton, Typography, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
    children?: React.ReactNode[];
    onIconClick?: () => void;
}

function Header(props: HeaderProps) {
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
                    onClick={props.onIconClick}
                >
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    BC 73 Pfeffenhausen
                </Typography>
                {props.children}
            </Toolbar>
        </AppBar>
    </div>
    );
}

export default Header;