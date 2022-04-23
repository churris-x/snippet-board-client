import { LOADING_START, LOADING_STOP, SET_MESSAGE, CLEAR_MESSAGE, CLOSE_MESSAGE, TOGGLE_MODE } from '../types';

const initialState = {
	isLoading: false,
	message: '',
	snackOpen: false,
	type: 'success',
	mode: 'light',
};

export const appReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOADING_START:
			return { ...state, isLoading: true };
		case LOADING_STOP:
			return { ...state, isLoading: false };
		case SET_MESSAGE:
			return { ...state, message: payload.message, type: payload.type, snackOpen: true };
		case CLEAR_MESSAGE:
			return { ...state, message: '' };
		case CLOSE_MESSAGE:
			return { ...state, snackOpen: false };
		case TOGGLE_MODE:
			return { ...state, mode: state.mode === 'dark' ? 'light' : 'dark' };
		default:
			return state;
	}
};