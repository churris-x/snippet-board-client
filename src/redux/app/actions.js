import { CLOSE_MESSAGE, TOGGLE_MODE } from "../types";

const types = [
	'error',
	'warning',
	'info',
	'success',
];
const modes = ['light', 'dark'];

export const closeMessage = () => ({ type: CLOSE_MESSAGE });

export const toggleMode = () => ({ type: TOGGLE_MODE });