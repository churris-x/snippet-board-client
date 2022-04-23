import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, TextField, Box, Typography } from '@mui/material'
import BadgeIcon from '@mui/icons-material/Badge';

import { signup } from '../redux/actions';
import { selectIsLoading } from '../redux/selectors';

export const SignupPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isLoading = useSelector(selectIsLoading);

	const handleSubmit = event => {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const data = {
			name: form.get('name'),
			email: form.get('email'),
			password: form.get('password'),
		};
		console.table(data);
		dispatch(signup(data));
		if (!isLoading) navigate('/');
	};

	return (
		<Box sx={{ m: 1, mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<BadgeIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign up
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					disabled={isLoading}
					id="name"
					label="Username"
					name="name"
					autoComplete="name"
					autoFocus
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					disabled={isLoading}
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					disabled={isLoading}
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					disabled={isLoading}
					sx={{ mt: 3, mb: 2 }}
				>
					Signup
				</Button>
			</Box>
		</Box>
	);
};