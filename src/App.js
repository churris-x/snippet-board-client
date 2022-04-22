import { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { selectMode } from './redux/selectors'
import { toggleMode } from './redux/actions';

import { HomePage, LoginPage } from './pages';
import { ThemeToggle, Message } from './components';

function App() {
	const dispatch = useDispatch();
	const mode = useSelector(selectMode);

	const theme = useMemo(() => createTheme({
		palette: { mode },
	}), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<ThemeToggle />
			<Message />

			<Routes>
				<Route exact path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
