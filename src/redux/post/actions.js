import axios from "axios";
import { LOADING_START, LOADING_STOP, POST_CLEAR_BY_ID, POST_CREATE, POST_DELETE, POST_EDIT, POST_FETCH_BY_ID, POST_FETCH_USER } from '../types';
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
		console.log('Error: fetch user posts => ', error);
		dispatch(setMessage('error', 'Failed to fetch snippets', error.response.data));
	}
	dispatch({ type: LOADING_STOP });
};

export const fetchPostById = id => async (dispatch, getState) => {
	const { token } = getState().user;
	if (!token || !id) return;

	dispatch({ type: LOADING_START });
	try {
		const response = await axios.get(
			`${API_URL}/posts/user/${id}`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		dispatch({ type: POST_FETCH_BY_ID, payload: response.data })
	} catch (error) {
		console.log('Error: fetch user post by id => ', error);
		dispatch(setMessage('error', 'Failed to fetch snippet', error.response.data));
	}
	dispatch({ type: LOADING_STOP });
};
export const clearPost = () => ({ type: POST_CLEAR_BY_ID });

export const createPost = post => async (dispatch, getState) => {
	const { token } = getState().user;
	const { title, body, syntax } = post;

	if (!token) return;
	if (!title || !body) return dispatch(setMessage(
		'error',
		'Snippet needs a title and content!'
	));

	dispatch({ type: LOADING_START });

	try {
		const response = await axios.post(
			`${API_URL}/posts/user`,
			{ title, body, syntax },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		dispatch({ type: POST_CREATE, payload: response.data });
		dispatch(setMessage('success', 'Created new snippet!'));
	} catch (error) {
		console.log('Error: create post => ', error);
		dispatch(setMessage('error', 'Failed to create snippet', error.response.data));
	}
	dispatch({ type: LOADING_STOP });
};

export const editPost = post => async (dispatch, getState) => {
	const { token } = getState().user;
	const { id, title, body, syntax } = post;

	if (!token || !id) return;
	if (!title || !body) return dispatch(setMessage(
		'error',
		'Snippet needs a title and content!'
	));

	dispatch({ type: LOADING_START });

	try {
		const response = await axios.patch(
			`${API_URL}/posts/user/${id}`,
			{ title, body, syntax },
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		dispatch({ type: POST_EDIT, payload: response.data });
		dispatch(setMessage('success', 'Edited snippet!'));
	} catch (error) {
		console.log('Error: edit post => ', error);
		dispatch(setMessage('error', 'Failed to edit snippet', error.response.data));
	}
	dispatch({ type: LOADING_STOP });
};

export const deletePost = id => async (dispatch, getState) => {
	const { token } = getState().user;

	if (!token || !id) return;

	dispatch({ type: LOADING_START });

	try {
		const response = await axios.delete(
			`${API_URL}/posts/user/${id}`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		dispatch({ type: POST_DELETE, payload: id });
		dispatch(setMessage('success', 'Created new snippet!'));
	} catch (error) {
		console.log('Error: delete post => ', error);
		dispatch(setMessage('error', 'Failed to delete snippet', error.response.data));
	}
	dispatch({ type: LOADING_STOP });
};