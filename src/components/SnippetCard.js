import { useState } from 'react';
import moment from 'moment';
import {
	Card, CardHeader, CardMedia, CardContent, CardActions,
	Collapse, Avatar, IconButton, Typography, Divider, TextField, Box
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useSelector } from 'react-redux';
import { selectUser } from '../redux/selectors';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return <IconButton {...other} />;
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	// marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

export const SnippetCard = ({ id, title, body, syntax, updatedAt, userId }) => {
	const user = useSelector(selectUser);
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => setExpanded(!expanded);

	return (
		<Card sx={{ width: 345 }}>
			<CardHeader
				avatar={user.id === userId ? null :
					<Avatar sx={{ bgcolor: red[500] }} aria-label="user" />
				}
				action={
					<ExpandMore
						expand={expanded}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</ExpandMore>
				}
				title={title}
				subheader={moment(updatedAt).format('Do MMMM YYYY')}
			/>
			{/* <CardMedia
				component="img"
				height="194"
				image="/static/images/cards/paella.jpg"
				alt="Paella dish"
			/> */}
			{/* <Divider />
			<Typography variant="body2" color="text.secondary">
				{body.substring(0, 500)}
			</Typography>
			<Divider /> */}
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						Description goes here along with tags
					</Typography>
				</CardContent>
			</Collapse>

			<Box sx={{ mx: 2 }}>
				<TextField
					value={body.substring(0, 500)}
					minRows={7}
					maxRows={7}
					fullWidth
					multiline
					inputProps={{ readOnly: true, style: { fontSize: 12 } }}
				/>
			</Box>

			<CardActions>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<ShareIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
};
