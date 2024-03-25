import { CLEAR_MESSAGE, CLOSE_MESSAGE, SET_MESSAGE, TOGGLE_MODE } from '../types';

const types = ['error', 'warning', 'info', 'success'];
const modes = ['light', 'dark'];

export const setMessage = (type, message, description) => ({
    type: SET_MESSAGE,
    payload: { type, message, description },
});

export const closeMessage = () => ({ type: CLOSE_MESSAGE });
export const clearMessage = () => ({ type: CLEAR_MESSAGE });

export const toggleMode = () => ({ type: TOGGLE_MODE });
