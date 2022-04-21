import { IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

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
			{mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
		</IconButton>
	</Box>
);