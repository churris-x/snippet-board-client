import {
	Avatar, Button, TextField, FormControlLabel,
	Checkbox, Link, Grid, Box, Typography,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

export const LoginPage = () => {

	const handleSubmit = event => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);

		console.log({
			email: data.get('email'),
			password: data.get('password'),
			remember: !!data.get('remember'),
		});
	};

	return (
		<Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<LockOutlinedIcon />
			</Avatar>
			<Typography component="h1" variant="h5">
				Sign in
			</Typography>
			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
				<TextField
					margin="normal"
					required
					fullWidth
					id="email"
					label="Email Address"
					name="email"
					autoComplete="email"
					autoFocus
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
				<FormControlLabel
					control={<Checkbox color="primary" />}
					label="Remember me"
					value="remember"
					name="remember"
				/>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
				>
					Sign In
				</Button>
				<Grid container>
					<Grid item xs>
						{/* <Link href="#" variant="body2">
							Forgot password?
						</Link> */}
					</Grid>
					<Grid item>
						<Link href="/signup" variant="body2">
							{"Don't have an account? Sign up"}
						</Link>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};
