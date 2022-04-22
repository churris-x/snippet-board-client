import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Avatar, Button, TextField,
	Link, Grid, Box, Typography,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

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
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign up
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
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
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
				/>
				<TextField
					margin="normal"
					required
					fullWidth
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
				<Grid container justifyContent='center'>
					<Grid item>
						<Link href="/login" variant="body2">
							Already have an account? Login
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};