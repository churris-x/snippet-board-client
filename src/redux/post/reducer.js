import { POST_CREATE, POST_FETCH_USER } from '../types';

const initialState = {
	userPosts: [],
};

export const postReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case POST_FETCH_USER:
			return { ...state, userPosts: payload }
		case POST_CREATE:
			return { ...state, userPosts: [...state.userPosts, payload] }
		default:
			return state;
	}
};