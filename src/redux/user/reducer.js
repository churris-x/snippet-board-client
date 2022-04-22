import { } from '../types';

const initialState = {
	// local storage?
	token: '',
	name: '',
	email: '',
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		default:
			return state;
	}
};