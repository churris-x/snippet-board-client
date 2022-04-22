import { useMemo, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Alert, Snackbar } from '@mui/material';

import { selectMessage, selectMode } from './redux/selectors'
import { closeMessage, toggleMode } from './redux/actions';

import { HomePage, LoginPage } from './pages';
import { ThemeToggle } from './components';

function App() {
	const dispatch = useDispatch()
	const { type, message, snackOpen } = useSelector(selectMessage)
	const mode = useSelector(selectMode);

	const handleToggle = () => dispatch(toggleMode());

	const theme = useMemo(() => createTheme({
		palette: { mode },
	}), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ThemeToggle mode={mode} toggle={handleToggle} />

			<Snackbar open={snackOpen} autoHideDuration={6000} onClose={() => dispatch(closeMessage())}>
				<Alert severity={type} sx={{ width: '100%', boxShadow: 2 }}>
					{message}
				</Alert>
			</Snackbar>
			<Routes>
				<Route exact path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
