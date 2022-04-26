import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Container, CircularProgress, Grid, CardActionArea, Card, CardHeader } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { selectIsLoading, selectToken, selectUserPosts } from '../redux/selectors';
import { fetchUserPosts } from '../redux/actions';

import { SnippetCard } from '../components';

export const UserSnippetsPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const token = useSelector(selectToken);
	const isLoading = useSelector(selectIsLoading);
	const posts = useSelector(selectUserPosts);

	const handleNew = () => navigate('/snippets/user/add');

	useEffect(() => {
		dispatch(fetchUserPosts());
	}, []);

	return (
		<Container sx={{ flexDirection: 'row' }}>
			{isLoading ? <CircularProgress sx={{ alignSelf: 'center' }} /> :
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
					{!posts.length
						? <Grid item>Couldn't find any posts!</Grid>
						: posts.map(post => (
							<Grid item key={post.id}>
								<SnippetCard {...post} />
							</Grid>
						))}
				</Grid>
			}
		</Container>
	);
};