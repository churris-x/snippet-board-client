import { USER_AUTO_LOGIN, USER_LOGIN, USER_LOGOUT, USER_SIGNUP } from '../types';

const initialState = {
	token: localStorage.getItem("token") || '',
	id: 0,
	name: '',
	email: '',
	createdAt: '',
	updatedAt: '',
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case USER_LOGIN:
			return { ...state, ...payload };
		case USER_LOGOUT:
			localStorage.removeItem("token");
			return { ...state, ...initialState, token: '' };
		case USER_AUTO_LOGIN:
			return { ...state, ...payload };
		default:
			return state;
	}
};