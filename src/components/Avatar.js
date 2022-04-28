import { useSelector } from "react-redux";
import { Avatar as MuiAvatar } from "@mui/material";

import { selectUser } from "../redux/selectors";

export const Avatar = () => {
	const user = useSelector(selectUser);
	return (
		<MuiAvatar
			sx={{ bgcolor: 'secondary.light' }}
			alt={user.name.toLowerCase().replace(/\w/, firstLetter => firstLetter.toUpperCase())}
			src="/static/images/avatar/2.jpg"
		/>
	);
};