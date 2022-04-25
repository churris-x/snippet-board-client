import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container, CircularProgress, Grid, CardActionArea, Card, CardHeader, Box, CardContent } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { selectIsLoading, selectUserPosts } from '../redux/selectors';
import { fetchUserPosts } from '../redux/actions';

import { SnippetCard } from '../components';

export const UserSnippetsPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoading = useSelector(selectIsLoading);
	const posts = useSelector(selectUserPosts);

	const handleNew = () => navigate('/snippets/user/add');

	useEffect(() => {
		dispatch(fetchUserPosts());
	}, []);

	return (
		<Container sx={{ flexDirection: 'row' }}>
			{isLoading ? <CircularProgress sx={{ alignSelf: 'center' }} /> : !posts.length ? 'Couldn\'t find any snippets!' :
				<Grid container spacing={4} mb={4}>
					<Grid item>
						<Card sx={{ width: 345, height: 338 }}>
							<CardActionArea onClick={handleNew} sx={{
								height: 'inherit',
								display: 'flex',
								justifyContent: 'flex-start',
								flexDirection: 'column'
							}}>
								<CardHeader
									title='New snippet'
									sx={{ alignSelf: 'flex-start' }}
								/>
								<AddIcon sx={{ width: 40, height: 40, alignSelf: 'center', flexGrow: 1, mb: 8 }} />
							</CardActionArea>
						</Card>
					</Grid>
					{posts.map(post => (
						<Grid item key={post.id}>
							<SnippetCard {...post} />
						</Grid>
					))}
				</Grid>
			}
		</Container>
	);
};