import { Card, CardActionArea, CardHeader } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

export const NewSnippetCard = ({ onClick }) => {
	return (
		<Card sx={{ width: 345, height: 344 }}>
			<CardActionArea onClick={onClick} sx={{
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
	)
}