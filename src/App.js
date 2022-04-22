import { useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { selectMode } from './redux/selectors'

import { HomePage, LoginPage, SignupPage } from './pages';
import { ThemeToggle, Message } from './components';

function App() {
	const mode = useSelector(selectMode);

	const theme = useMemo(() => createTheme({
		palette: {
			mode,
			...(mode === 'light' ? {
				// palette values for light mode
				primary: {
					light: '#6fbf73',
					main: '#4caf50',
					dark: '#357a38',
					contrastText: '#fff',
				},
				secondary: {
					light: '#ff6333',
					main: '#ff3d00',
					dark: '#b22a00',
					contrastText: '#fff',
				},
			} : {
				primary: {
					light: '#9ad29c',
					main: '#81c784',
					dark: '#5a8b5c',
					contrastText: '#000',
				},
				secondary: {
					light: '#ffa183',
					main: '#ff8a65',
					dark: '#b26046',
					contrastText: '#000',
				},
			}),
		},
	}), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<ThemeToggle />
			<Message />

			<Routes>
				<Route exact path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignupPage />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
