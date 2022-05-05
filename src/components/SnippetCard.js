import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import {
	Card, CardHeader, CardMedia, CardContent, CardActions,
	Collapse, Avatar, IconButton, Typography, Box, Tooltip
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LaunchIcon from '@mui/icons-material/Launch';

import { selectUser } from '../redux/selectors';

import { Color } from '../constants';
import { ReadEditor } from './'
import { setMessage } from '../redux/actions';

const ExpandMore = styled((props) => {
	const { expand, ...other } = props;
	return (
		<Tooltip title={expand ? "Hide" : "Show more"} placement="bottom">
			<IconButton {...other} />
		</Tooltip>
	);
})(({ theme, expand }) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));

export const SnippetCard = ({ id, title, body, description, syntax, updatedAt, userId, details = true }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(selectUser);
	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => setExpanded(!expanded);
	const handleCopy = () => {
		navigator.clipboard.writeText(body);
		dispatch(setMessage('success', 'Copied snippet'));
	};

	return (
		<Card sx={{ width: 345 }}>
			<CardHeader
				avatar={user.id === userId ? null :
					<Avatar sx={{ bgcolor: 'secondary.light' }} aria-label="user" />
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
				// title={expanded ? title : title.length > 24 ? title.substring(0, 24).concat('…') : title}
				title={<Typography width={280} noWrap={!expanded} variant="h5">{title}</Typography>}
				subheader={moment(updatedAt).format('Do MMMM YYYY')}
			/>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					{description &&
						<Typography variant="body2" color="text.secondary">
							{description}
						</Typography>
					}
				</CardContent>
			</Collapse>
			{/* <CardMedia
				component="img"
				height="194"
				image="/static/images/cards/paella.jpg"
				alt="Paella dish"
			/> */}
			<Box sx={{ mx: 2 }}>
				<ReadEditor {...{ body, syntax }} />
			</Box>

			<CardActions disableSpacing sx={{ display: 'flex' }}>
				{/* <Tooltip title="Star" placement="bottom">
					<IconButton aria-label="add to favorites">
						{user.id < id
							? <StarIcon sx={{ color: Color.star }} />
							: <StarOutlineIcon />
						}
					</IconButton>
				</Tooltip>
				23k */}

				<Tooltip title="Copy" placement="bottom">
					<IconButton onClick={handleCopy} aria-label="copy">
						<ContentCopyIcon />
					</IconButton>
				</Tooltip>
				{details &&
					<Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'flex-end' }}>
						<Tooltip title="Details" placement="bottom">
							<IconButton
								onClick={() => navigate(`/snippets/${id}/details`)}
								aria-label="Go to details"
							>
								<LaunchIcon />
							</IconButton>
						</Tooltip>
					</Box>
				}
			</CardActions>
		</Card >
	);
};
