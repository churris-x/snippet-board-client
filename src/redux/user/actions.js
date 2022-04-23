import axios from "axios";
import { LOADING_START, LOADING_STOP, USER_AUTO_LOGIN, USER_AUTO_LOGIN_FAILED, USER_LOGIN, USER_LOGOUT, USER_SIGNUP } from '../types';
import { API_URL } from '../../constants'
import { setMessage } from '../actions';

export const signup = ({ name, email, password }) => async dispatch => {
	if (!name || !email || !password) return;

	dispatch({ type: LOADING_START });

	try {
		const response = await axios.post(`${API_URL}/users/signup`, { name, email, password });
		console.log('Success: User login => ', response);
		dispatch({ type: USER_SIGNUP });
		dispatch(setMessage('success', 'Created account!'));
	} catch (error) {
		console.log('Error: User login => ', error);
		dispatch(setMessage('error', 'Failed to create account'));
	}
	dispatch({ type: LOADING_STOP });
};

export const login = ({ email, password, remember }) => async dispatch => {
	if (!email || !password) return;

	dispatch({ type: LOADING_START });

	try {
		const response = await axios.post(`${API_URL}/users/login`, { email, password });
		const { token } = response.data;

		if (remember) localStorage.setItem("token", token);
		dispatch({ type: USER_LOGIN, payload: response.data });

		dispatch(setMessage('success', 'Logged in, welcome back!'));
	} catch (error) {
		console.log('Error: User login => ', error);
		dispatch(setMessage('error', 'Failed to log in'));
	}
	dispatch({ type: LOADING_STOP });
};
export const logout = () => ({ type: USER_LOGOUT });

export const tokenLogin = () => async (dispatch, getState) => {
	const { token } = getState().user;
	if (!token) return;

	dispatch({ type: LOADING_START });

	try {
		const response = await axios.get(
			`${API_URL}/users/me`,
			{ headers: { Authorization: `Bearer ${token}` } }
		);

		dispatch({ type: USER_AUTO_LOGIN, payload: response.data });
		dispatch(setMessage('success', 'Logged in, welcome back!'));

	} catch (error) {
		console.log('Error: User auto login => ', error);
		dispatch({ type: USER_AUTO_LOGIN_FAILED });
	}
	dispatch({ type: LOADING_STOP });

};