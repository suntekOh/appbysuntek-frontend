import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AppBarMenu, AppBarType, VisibleCondition } from '../../models/enums';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useErrorBoundary } from 'react-error-boundary';
import { useAuth } from '../auth/authProvider';
import { AppBarMenuItem } from '../../models/user-models';
import { QnA } from './main-menu/qna';
import { Default } from './main-menu/default';

export interface DrawerAppBarProps {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    appBarType: AppBarType;
}



const drawerWidth = 240;
const navItems: Array<AppBarMenuItem> =
    [
        {
            key: 0,
            name: 'Home',
            path: "/",
            visibleCondition: VisibleCondition.Always,
            menu: AppBarMenu.Default
        },
        {
            key: 1,
            name: 'Q&A',
            path: "/",
            visibleCondition: VisibleCondition.Always,
            menu: AppBarMenu.QnA
        },
        {
            key: 2,
            name: 'Sign in',
            path: "/auth/signin",
            visibleCondition: VisibleCondition.Annonymous,
            menu: AppBarMenu.SignIn
        },
        {
            key: 3,
            name: 'Sign Out',
            path: "/",
            visibleCondition: VisibleCondition.Authenticated,
            menu: AppBarMenu.SignOut
        }
    ];

export default function DrawerAppBar(props: DrawerAppBarProps) {
    const { window, appBarType } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [mainMenuType, setMainMenuType] = React.useState(AppBarMenu.Default);
    const navigate = useNavigate();
    const { showBoundary } = useErrorBoundary();
    const auth = useAuth();

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleAppBarMenuClick = (item: AppBarMenuItem) => {
        try {
            if (item.menu === AppBarMenu.SignIn) {
                navigate(item.path);
            } else if (item.menu === AppBarMenu.SignOut) {
                auth.signout(() => {
                    navigate(item.path, { replace: true });
                })
            }
            else if (item.menu === AppBarMenu.Default) {
                setMainMenuType(AppBarMenu.Default);
            }
            else if (item.menu === AppBarMenu.QnA) {
                setMainMenuType(AppBarMenu.QnA);
            }
        } catch (err: any) {
            showBoundary(err);
        }
    }

    const filteredNavItem = navItems.filter(item => item.visibleCondition === VisibleCondition.Always || item.visibleCondition === (appBarType === AppBarType.Annonymous ? VisibleCondition.Annonymous : VisibleCondition.Authenticated))

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                MUI
            </Typography>
            <Divider />
            <List>
                {filteredNavItem.map((item) => (
                    <ListItem key={item.key} disablePadding>
                        <ListItemButton sx={{ textAlign: 'center' }} onClick={() => handleAppBarMenuClick(item)}>
                            <ListItemText primary={item.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        MUI
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {filteredNavItem.map((item) => (
                            <Button key={item.key} sx={{ color: '#fff' }} onClick={() => handleAppBarMenuClick(item)}>
                                {item.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                {
                    mainMenuType === AppBarMenu.QnA ? <QnA /> : <Default />
                }
            </Box>
        </Box>
    );
}