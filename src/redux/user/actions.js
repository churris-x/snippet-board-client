import axios from 'axios';
import {
    LOADING_START,
    LOADING_STOP,
    POST_FETCH_USER,
    USER_AUTO_LOGIN,
    USER_AUTO_LOGIN_FAILED,
    USER_LOGIN,
    USER_LOGOUT,
    USER_SIGNUP,
} from '../types';
import { API_URL } from '../../constants';
import { setMessage } from '../actions';

export const signup =
    ({ name, email, password }, navigate) =>
    async dispatch => {
        if (!name || !email || !password)
            return dispatch(setMessage('error', 'Missign required field!'));

        dispatch({ type: LOADING_START });

        try {
            const response = await axios.post(`${API_URL}/users/signup`, {
                name,
                email,
                password,
            });
            // console.log('Success: User login => ', response);
            dispatch({ type: USER_SIGNUP });
            dispatch(setMessage('success', 'Created account!'));
            navigate('/login');
        } catch (error) {
            // console.log('Error: User login => ', error);
            dispatch(setMessage('error', 'Failed to create account', error.response.data || error));
        }
        dispatch({ type: LOADING_STOP });
    };

export const login =
    ({ email, password, remember }) =>
    async dispatch => {
        if (!email || !password)
            return dispatch(setMessage('error', 'User name and password required!'));

        dispatch({ type: LOADING_START });

        try {
            const response = await axios.post(`${API_URL}/users/login`, {
                email,
                password,
            });
            const { token } = response.data;

            if (remember) localStorage.setItem('token', token);
            dispatch({ type: USER_LOGIN, payload: response.data });

            dispatch(setMessage('success', 'Logged in, welcome back!'));
        } catch (error) {
            // console.log('Error: User login => ', error);
            dispatch(setMessage('error', 'Failed to log in', error.response.data || error));
        }
        dispatch({ type: LOADING_STOP });
    };

export const logout = () => dispatch => {
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: POST_FETCH_USER, payload: [] });
};

export const tokenLogin = navigate => async (dispatch, getState) => {
    const { token } = getState().user;
    if (!token) return;

    dispatch({ type: LOADING_START });

    try {
        const response = await axios.get(`${API_URL}/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        dispatch({ type: USER_AUTO_LOGIN, payload: response.data });
        dispatch(setMessage('success', 'Logged in, welcome back!'));
    } catch (error) {
        // console.log('Error: User auto login => ', error);
        navigate('/login');
        dispatch(setMessage('error', 'Please login again'));
        dispatch({ type: USER_LOGOUT });
        dispatch({ type: POST_FETCH_USER, payload: [] });
    }
    dispatch({ type: LOADING_STOP });
};
