import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Box } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

import { selectMode } from '../redux/selectors';
import { toggleMode } from '../redux/actions';

export const ThemeToggle = () => {
	const dispatch = useDispatch();
	const mode = useSelector(selectMode);

	return (
		<Box sx={{
			display: 'flex',
			alignItems: 'center',
			color: 'text.primary',
			borderRadius: 1,
			p: 1
		}}>
			{mode} mode
			<IconButton
				sx={{ ml: 1 }}
				onClick={() => dispatch(toggleMode())}
				color="inherit"
			>
				{mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
			</IconButton>
		</Box>
	);
};