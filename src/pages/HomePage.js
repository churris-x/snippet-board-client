import { Container, Typography } from '@mui/material';

export const HomePage = () => {
	return (
		<Container maxWidth="lg">
			<Typography component='h2' variant="h3">
				Snippet
			</Typography>
			<Typography component='h2' variant="h4" sx={{ color: 'primary.main' }}>

				/ˈsnɪpɪt/
			</Typography>
			<Typography component='h2' variant="h6">
				A short reusable piece of code
			</Typography>
		</Container>
	);
};