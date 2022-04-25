import { useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { selectMode } from './redux/selectors'
import { tokenLogin } from './redux/actions';

import { HomePage, LoginPage, SignupPage, SnippetsAddPage, SnippetsEditPage, UserSnippetsPage } from './pages';
import { ThemeToggle, Message, MenuBar } from './components';
import { light, dark } from './constants';

function App() {
	const dispatch = useDispatch();
	const mode = useSelector(selectMode);

	useEffect(() => {
		dispatch(tokenLogin());
	}, []);

	const theme = useMemo(() => createTheme({
		palette: {
			mode,
			...(mode === 'light' ? light : dark),
		},
	}), [mode]);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />

			<MenuBar />
			<Message />

			<Routes>
				<Route exact path='/' element={<HomePage />} />
				<Route path='/snippets/user' element={<UserSnippetsPage />} />
				<Route path='/snippets/user/add' element={<SnippetsAddPage />} />
				<Route path='/snippets/:id/edit' element={<SnippetsEditPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/signup' element={<SignupPage />} />
			</Routes>
		</ThemeProvider>
	);
}

export default App;
