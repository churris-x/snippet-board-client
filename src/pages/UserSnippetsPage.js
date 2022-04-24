import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, CircularProgress } from '@mui/material';

import { selectIsLoading, selectUserPosts } from '../redux/selectors';
import { fetchUserPosts } from '../redux/actions';

import { SnippetCard } from '../components';

export const UserSnippetsPage = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);
	const posts = useSelector(selectUserPosts);

	useEffect(() => {
		dispatch(fetchUserPosts());
	}, []);

	return (
		<Container sx={{ flexDirection: 'row' }}>
			{isLoading ? <CircularProgress /> : !posts.length ? 'Couldn\'t find any snippets!' :
				posts.map(post => <SnippetCard key={post.id} {...post} />)
			}
		</Container>
	);
};