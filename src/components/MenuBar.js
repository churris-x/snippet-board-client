import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
	AppBar, Box, Toolbar, IconButton, Typography,
	Menu, Container, Button, Tooltip, MenuItem,
} from '@mui/material';
import {
	Menu as MenuIcon,
	MoreVertOutlined as MoreVertOutlinedIcon,
} from '@mui/icons-material';

import { selectToken } from '../redux/selectors';
import { Avatar, SearchBar } from './';
import { logout } from '../redux/actions';

const pages = [
	{ name: 'Home', route: '/' },
	{ name: 'Snippets', route: '/snippets' },
];
const settings = [
	'Profile',
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

	const dispatch = useDispatch();
	const token = useSelector(selectToken);

	const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
	const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
	const handleOpenAuthMenu = (event) => setAnchorElAuth(event.currentTarget);
	const handleCloseNavMenu = () => setAnchorElNav(null);
	const handleCloseUserMenu = () => setAnchorElUser(null);
	const handleCloseAuthMenu = () => setAnchorElAuth(null);

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<Typography
						variant="h6"
						noWrap
						component="div"
						sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
							keepMounted
							transformOrigin={{ vertical: 'top', horizontal: 'left' }}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: 'block', md: 'none' } }}
						>
							{pages.map(page => (
								<Link key={page.route} to={page.route} style={{
									textDecoration: 'none',
									color: 'inherit',
								}}>
									<MenuItem onClick={handleCloseNavMenu}>
										<Typography textAlign="center">
											{page.name}
										</Typography>
									</MenuItem>
								</Link>
							))}
						</Menu>
					</Box>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map(page => (
							<Link key={page.route} to={page.route} style={{
								textDecoration: 'none',
								color: 'inherit'
							}}>
								<Button
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									{page.name}
								</Button>
							</Link>
						))}
					</Box>
					<SearchBar />
					{token ?
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
								keepMounted
								transformOrigin={{ vertical: 'top', horizontal: 'right' }}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								<MenuItem onClick={handleCloseUserMenu}>
									<Typography textAlign="center">Profile</Typography>
								</MenuItem>
								<MenuItem onClick={() => { handleCloseUserMenu(); dispatch(logout()) }}>
									<Typography textAlign="center">Logout</Typography>
								</MenuItem>
							</Menu>
						</Box>
						:
						<>
							<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
								<Link to={'/login'} style={{ textDecoration: 'none', color: 'inherit' }}>
									<Button
										sx={{ my: 2, mr: 2, color: 'white', display: 'block' }}
									>
										Login
									</Button>
								</Link>
								<Link to={'/signup'} style={{ textDecoration: 'none' }}>
									<Button
										variant="outlined"
										sx={{ my: 2, color: 'white', borderColor: 'white', display: 'block' }}
									>
										Sign up
									</Button>
								</Link>
							</Box>
							<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
								<Tooltip title="Account options">
									<IconButton size="large" onClick={handleOpenAuthMenu} sx={{ color: 'inherit' }}>
										<MoreVertOutlinedIcon />
									</IconButton>
								</Tooltip>
								<Menu
									sx={{ mt: '45px' }}
									id="menu-appbar"
									anchorEl={anchorElAuth}
									anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
									keepMounted
									transformOrigin={{ vertical: 'top', horizontal: 'right' }}
									open={Boolean(anchorElAuth)}
									onClose={handleCloseAuthMenu}
								>
									{auths.map(auth => (
										<Link key={auth.route} to={auth.route} style={{ textDecoration: 'none', color: 'inherit' }}>
											<MenuItem onClick={handleCloseAuthMenu}>
												<Typography textAlign="center">{auth.name}</Typography>
											</MenuItem>
										</Link>
									))}
								</Menu>
							</Box>
						</>
					}
				</Toolbar>
			</Container>
		</AppBar>
	);
};