import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, Box, TextField, Paper } from '@mui/material';

import { createPost } from '../redux/actions';
import { selectIsLoading } from '../redux/selectors';

export const SnippetsAddPage = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);

	const handleSubmit = () => {
		const data = {
			title: 'Teste n1',
			// body: 'it was here that king louis the XVXXIIII realized...',
		};

		dispatch(createPost(data));
	}

	return (
		<Container maxWidth="sm" height='100%'>
			<Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
				<Typography component="h1" variant="h4">
					Create snippet
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						disabled={isLoading}
						id="title"
						label="Title"
						name="Title"
						autoFocus
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						multiline
						disabled={isLoading}
						id="body"
						label="Start coding!"
						name="Content"
					/>
					<Button
						fullWidth
						onClick={handleSubmit}
						variant="contained"
						disabled={isLoading}
						sx={{ mt: 3, mb: 2 }}
					>
						Create Snippet
					</Button>
				</Box>
			</Paper>
		</Container>
	);
};