import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, Box, TextField, Paper, Grid } from '@mui/material';

import { editPost } from '../redux/actions';
import { selectIsLoading } from '../redux/selectors';

import { Editor } from '../components/Editor';

export const SnippetsEditPage = () => {
	const postId = useParams().id;
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);
	// const postById = useSelector(selectIsLoading);
	let id

	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [syntax, setSyntax] = useState('plain_text');

	const handleSubmit = () => dispatch(editPost({ id, title, body, syntax }));
	const handleTitle = event => setTitle(event.target.value);
	const handleBody = newValue => setBody(newValue);
	const handleSyntax = newValue => setSyntax(newValue);

	return (
		<Container sx={{ mt: 8, maxWidth: { xs: "md", md: 'lg' } }}>
			<Paper variant="outlined" sx={{ m: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
				<Typography component="h1" variant="h4">
					Edit snippet
				</Typography>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								value={title}
								onChange={handleTitle}
								margin="normal"
								required
								fullWidth
								disabled={isLoading}
								id="title"
								label="Title"
								name="Title"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12}>
							<Editor
								value={body}
								onChange={handleBody}
								onSyntaxChange={handleSyntax}
							/>
						</Grid>
					</Grid>
					<Button
						fullWidth
						onClick={handleSubmit}
						variant="contained"
						disabled={isLoading}
						sx={{ mt: 3, mb: 2 }}
					>
						Edit Snippet
					</Button>
				</Box>
			</Paper>
		</Container>
	);
};