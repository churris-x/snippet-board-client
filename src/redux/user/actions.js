import axios from "axios";
import { USER_LOGIN, USER_LOGOUT, USER_SIGNUP } from '../types';
import { API_URL } from '../../constants'
// import {} from '../actions';

export const signup = ({ name, email, password }) => async dispatch => {
	if (!name || !email || !password) return;

	// dispatch({ type: USER_LOADING });

	try {
		const response = await axios.post(`${API_URL}/users/signup`, { name, email, password });
		console.log('Success: User login => ', response);
		dispatch({ type: USER_SIGNUP });
	} catch (error) {
		console.log('Error: User login => ', error);
		// dispatch({ type: USER_SIGNUP_FAILED });
	}
};

export const login = ({ email, password, remember }) => async dispatch => {
	if (!email || !password) return;

	// dispatch({ type: USER_LOADING });

	try {
		const response = await axios.post(`${API_URL}/users/login`, { email, password });
		const { token } = response.data;

		if (remember) localStorage.setItem("token", token);
		dispatch({ type: USER_LOGIN, payload: token });
	} catch (error) {
		console.log('Error: User login => ', error);
		// dispatch({ type: USER_LOGIN_FAILED });
	}
};
export const logout = () => ({ type: USER_LOGOUT });

