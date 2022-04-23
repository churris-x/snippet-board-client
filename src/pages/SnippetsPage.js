import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import { selectUserPosts } from '../redux/selectors';
import { fetchUserPosts } from '../redux/actions';

export const SnippetsPage = () => {
	const dispatch = useDispatch();
	const posts = useSelector(selectUserPosts);

	useEffect(() => {
		dispatch(fetchUserPosts());
	}, []);

	return (
		<Container maxWidth="sm">
			{posts.length ? 'Snippets!' : 'Couldn\'t find any snippets!'}
		</Container>
	);
};