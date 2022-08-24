import {AppBar, Toolbar, IconButton, Typography, } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
    title: string;
    children?: React.ReactNode[];
    icon?: React.ReactNode;
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
                    {props.icon || <MenuIcon />}
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {props.title}
                </Typography>
                {props.children}
            </Toolbar>
        </AppBar>
    </div>
    );
}

export default Header;