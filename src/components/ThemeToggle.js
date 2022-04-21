import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const ThemeToggle = ({ toggle, mode }) => (
	<Box sx={{
		display: 'flex',
		alignItems: 'center',
		color: 'text.primary',
		borderRadius: 1,
		p: 1
	}}>
		{mode} mode
		<IconButton sx={{ ml: 1 }} onClick={toggle} color="inherit">
			{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
		</IconButton>
	</Box>
);