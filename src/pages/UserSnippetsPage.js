import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container, CircularProgress, Grid, CardActionArea, Card, CardHeader, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { selectIsLoading, selectPostSeach, selectToken, selectUserPosts } from '../redux/selectors';
import { fetchUserPosts } from '../redux/actions';

import { SnippetCard } from '../components';

export const UserSnippetsPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const token = useSelector(selectToken);
	const isLoading = useSelector(selectIsLoading);
	const posts = useSelector(selectUserPosts);
	const search = useSelector(selectPostSeach);

	const handleNew = () => navigate('/snippets/user/add');

	useEffect(() => {
		dispatch(fetchUserPosts());
	}, []);

	return (
		<Container sx={{ flexDirection: isLoading ? 'column' : 'row', display: isLoading ? 'flex' : null }}>
			{isLoading ? <CircularProgress sx={{ alignSelf: 'center', mt: 4 }} /> :
				<Grid container spacing={4} my={4}>
					{token &&
						<Grid item>
							<Card sx={{ width: 345, height: 344 }}>
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
					}
					{!posts.length && token
						? <Grid item>Couldn't find any posts!</Grid>
						: posts.filter(i => i.title.toLowerCase().includes(search.toLowerCase())).map(post => (
							<Grid item key={post.id}>
								<SnippetCard {...post} />
							</Grid>
						))}
					{!posts.length && !token &&
						<Grid item>
							You need to be logged in to see your posts
						</Grid>
					}
				</Grid>
			}
		</Container>
	);
};