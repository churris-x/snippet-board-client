import { useMemo, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

import { HomePage } from './pages';
import { ThemeToggle } from './components';

const reduxIsDarkMode = true;

function App() {
	const [mode, setMode] = useState('light');
	const handleToggle = () => setMode(prev => prev === 'dark' ? 'light' : 'dark');

	const theme = useMemo(() => createTheme({
		palette: { mode },
	}), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container maxWidth="sm">
				<ThemeToggle
					mode={mode}
					toggle={handleToggle}
				/>
				<HomePage />
			</Container>
		</ThemeProvider>
	);
}

export default App;
