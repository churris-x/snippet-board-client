import { LOADING_START, LOADING_STOP, SET_MESSAGE, CLEAR_MESSAGE, CLOSE_MESSAGE, TOGGLE_MODE } from '../types';

const initialState = {
	isLoading: false,
	message: '',
	description: '',
	snackOpen: false,
	type: 'info',
	mode: localStorage.getItem("mode") || 'light',
};

export const appReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOADING_START:
			return { ...state, isLoading: true };
		case LOADING_STOP:
			return { ...state, isLoading: false };
		case SET_MESSAGE:
			return {
				...state,
				message: payload.message,
				type: payload.type,
				description: payload.description,
				snackOpen: true,
			};
		case CLEAR_MESSAGE:
			return { ...state, message: '', type: 'info' };
		case CLOSE_MESSAGE:
			return { ...state, snackOpen: false };
		case TOGGLE_MODE:
			localStorage.setItem("mode", state.mode === 'dark' ? 'light' : 'dark');
			return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' };
		default:
			return state;
	}
};