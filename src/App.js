import { useMemo, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { HomePage, LoginPage } from './pages';
import { ThemeToggle } from './components';

function App() {
	const [mode, setMode] = useState('light');
	const handleToggle = () => setMode(prev => prev === 'dark' ? 'light' : 'dark');

	const theme = useMemo(() => createTheme({
		palette: { mode },
	}), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<ThemeToggle mode={mode} toggle={handleToggle} />

			<Routes>
				<Route exact path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
