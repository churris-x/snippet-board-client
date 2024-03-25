import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    Tooltip,
    MenuItem,
} from '@mui/material';
import {
    Menu as MenuIcon,
    MoreVertOutlined as MoreVertOutlinedIcon,
    ContentCut as ContentCutIcon,
    Logout as LogoutIcon,
    Brightness4 as Brightness4Icon,
    Brightness7 as Brightness7Icon,
} from '@mui/icons-material';

import { selectMode, selectToken } from '../redux/selectors';
import { Avatar, SearchBar } from './';
import { logout, toggleMode } from '../redux/actions';

const pages = [
    { name: 'Home', route: '/' },
    // { name: 'Snippets', route: '/snippets' },
    { name: 'My Snippets', route: '/snippets/user' },
];
const settings = [
    // 'Profile',
    'darkmode',
    'Logout',
];

const auths = [
    { name: 'Login', route: '/login' },
    { name: 'Sign up', route: '/signup' },
];

export const MenuBar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElAuth, setAnchorElAuth] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const mode = useSelector(selectMode);

    const handleOpenNavMenu = event => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = event => setAnchorElUser(event.currentTarget);
    const handleOpenAuthMenu = event => setAnchorElAuth(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);
    const handleCloseAuthMenu = () => setAnchorElAuth(null);

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        SNIP IT
                    </Typography>
                    <ContentCutIcon
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontSize: 40,
                        }}
                    />
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' } }}
                        >
                            {pages.map(page => (
                                <MenuItem
                                    key={page.route}
                                    onClick={() => {
                                        navigate(page.route);
                                        handleCloseNavMenu();
                                    }}
                                >
                                    <Typography textAlign='center'>{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {pages.map(page => (
                            <Button
                                key={page.route}
                                onClick={() => {
                                    navigate(page.route);
                                    handleCloseNavMenu();
                                }}
                                sx={{
                                    my: 2,
                                    color: 'white',
                                    display: 'block',
                                    '&:hover': {
                                        backgroundColor: 'primary.light',
                                    },
                                }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    {location.pathname === '/snippets/user' && <SearchBar />}
                    {token ? (
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title='Open options'>
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id='menu-appbar'
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={() => dispatch(toggleMode())}>
                                    {mode === 'dark' ? (
                                        <Brightness7Icon sx={{ mr: 1 }} />
                                    ) : (
                                        <Brightness4Icon sx={{ mr: 1 }} />
                                    )}
                                    <Typography textAlign='center'>
                                        {mode === 'dark' ? 'Light' : 'Dark'} mode
                                    </Typography>
                                </MenuItem>
                                <MenuItem
                                    onClick={() => {
                                        handleCloseUserMenu();
                                        dispatch(logout());
                                    }}
                                >
                                    <LogoutIcon sx={{ mr: 1 }} />
                                    <Typography textAlign='center'>Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    ) : (
                        <>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <Button
                                    sx={{
                                        my: 2,
                                        mr: 2,
                                        color: 'white',
                                        display: 'block',
                                        '&:hover': {
                                            backgroundColor: 'primary.light',
                                        },
                                    }}
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </Button>
                                <Button
                                    variant='outlined'
                                    sx={{
                                        my: 2,
                                        color: 'white',
                                        borderColor: 'white',
                                        display: 'block',
                                        '&:hover': {
                                            backgroundColor: 'primary.light',
                                            borderColor: 'white',
                                        },
                                    }}
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign up
                                </Button>
                            </Box>
                            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                                <Tooltip title='Account options'>
                                    <IconButton
                                        size='large'
                                        onClick={handleOpenAuthMenu}
                                        sx={{ color: 'inherit' }}
                                    >
                                        <MoreVertOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id='menu-appbar'
                                    anchorEl={anchorElAuth}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElAuth)}
                                    onClose={handleCloseAuthMenu}
                                >
                                    {auths.map(auth => (
                                        <MenuItem
                                            key={auth.route}
                                            onClick={() => {
                                                navigate(auth.route);
                                                handleCloseAuthMenu();
                                            }}
                                        >
                                            <Typography textAlign='center'>{auth.name}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                        </>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
