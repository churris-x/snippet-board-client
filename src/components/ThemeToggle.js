import { useSelector, useDispatch } from 'react-redux';
import { IconButton, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import { selectMode } from '../redux/selectors';
import { toggleMode } from '../redux/actions';

export const ThemeToggle = () => {
    const dispatch = useDispatch();
    const mode = useSelector(selectMode);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                color: 'text.primary',
                borderRadius: 1,
                p: 1,
            }}
        >
            {mode} mode
            <IconButton sx={{ ml: 1 }} onClick={() => dispatch(toggleMode())} color='inherit'>
                {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </Box>
    );
};
