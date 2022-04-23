import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { styled, alpha } from '@mui/material/styles';
import {
	AppBar, Box, Toolbar, IconButton, Typography, Menu,
	Container, Avatar, Button, Tooltip, MenuItem, InputBase,
} from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';

import { selectToken } from '../redux/selectors';

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}));

const pages = [
	{ name: 'Home', route: '/' },
	{ name: 'Snippets', route: '/snippets' },
];
const settings = [
	'Profile',
	'Dashboard',
	'Logout',
];

export const MenuBar = () => {
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);

	const token = useSelector(selectToken);

	const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
	const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
	const handleCloseNavMenu = () => setAnchorElNav(null);
	const handleCloseUserMenu = () => setAnchorElUser(null);

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
							{pages.map((page) => (
								<Link to={page.route} style={{
									textDecoration: 'none',
									color: 'inherit',
								}}>
									<MenuItem key={page.route} onClick={handleCloseNavMenu}>
										<Typography textAlign="center">
											{page.name}
										</Typography>
									</MenuItem>
								</Link>
							))}
						</Menu>
					</Box>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Link to={page.route} style={{
								textDecoration: 'none',
								color: 'inherit'
							}}>
								<Button
									key={page.route}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									{page.name}
								</Button>
							</Link>
						))}
					</Box>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Search…"
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
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
								{settings.map((setting) => (
									<MenuItem key={setting} onClick={handleCloseUserMenu}>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						:
						<>
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
						</>
					}
				</Toolbar>
			</Container>
		</AppBar>
	);
};