import axios from "axios";
import { LOADING_START, LOADING_STOP, POST_FETCH_USER } from '../types';
import { API_URL } from '../../constants'
import { setMessage } from '../actions';

export const fetchUserPosts = () => async (dispatch, getState) => {
	const { token } = getState().user;
	if (!token) return;

	dispatch({ type: LOADING_START });

	try {
		const response = await axios.get(
			`${API_URL}/posts/user`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		dispatch({ type: POST_FETCH_USER, payload: response.data });
	} catch (error) {
		console.log('Error: User login => ', error);
		dispatch(setMessage('error', 'Failed to fetch posts!'));
	}
	dispatch({ type: LOADING_STOP });
};