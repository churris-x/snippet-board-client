import { useDispatch, useSelector } from 'react-redux';
import { Button, Container } from '@mui/material';

import { createPost } from '../redux/actions';
import { selectIsLoading } from '../redux/selectors';

export const SnippetsAddPage = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);

	const handleSubmit = () => {
		const data = {
			title: 'Teste n1',
			body: 'it was here that king louis the XVXXIIII realized...',
		};

		dispatch(createPost(data));
	}

	return (
		<Container maxWidth="sm">
			<Button
				onClick={handleSubmit}
				variant="contained"
				disabled={isLoading}
			>
				Create Snippet
			</Button>
		</Container>
	);
};