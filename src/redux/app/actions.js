import { CLOSE_MESSAGE, SET_MESSAGE, TOGGLE_MODE } from "../types";

const types = [
	'error',
	'warning',
	'info',
	'success',
];
const modes = ['light', 'dark'];

export const setMessage = (type, message) => ({
	type: SET_MESSAGE,
	payload: { type, message }
});

export const closeMessage = () => ({ type: CLOSE_MESSAGE });

export const toggleMode = () => ({ type: TOGGLE_MODE });