import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, CircularProgress } from '@mui/material';

import { selectIsLoading, selectUserPosts } from '../redux/selectors';
import { fetchUserPosts } from '../redux/actions';

export const UserSnippetsPage = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);
	const posts = useSelector(selectUserPosts);

	useEffect(() => {
		dispatch(fetchUserPosts());
	}, []);

	return (
		<Container maxWidth="sm">
			{isLoading ? <CircularProgress /> : !posts.length ? 'Couldn\'t find any snippets!' :
				'Snippets!'
			}
		</Container>
	);
};