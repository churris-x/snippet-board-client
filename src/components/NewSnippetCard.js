import { useNavigate } from "react-router-dom";
import { Box, Card, CardActionArea, CardHeader, Fab, Grid } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

export const NewSnippetCard = () => {
	const navigate = useNavigate();
	const handleNew = () => navigate('/snippets/user/add');

	return (
		<>
			<Fab color="primary" aria-label="add" onClick={handleNew} sx={{
				position: 'fixed',
				bottom: 32,
				right: 32,
				// left: 'calc(50% - 28px)',
				display: { xs: 'flex', sm: 'none' }
			}}>
				<AddIcon />
			</Fab>
			<Grid item sx={{ display: { xs: 'none', sm: 'flex' } }}>
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
		</>
	)
}