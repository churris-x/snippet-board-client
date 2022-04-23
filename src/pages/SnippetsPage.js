import { useSelector } from 'react-redux';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { selectUserPosts } from '../redux/selectors';

export const SnippetsPage = () => {
	const posts = useSelector(selectUserPosts);

	return (
		<Container maxWidth="sm">
			{posts.length ? 'Snippets!' : 'Couldn\'t find any snippets!'}
		</Container>
	);
};