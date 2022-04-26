import { POST_CREATE, POST_DELETE, POST_EDIT, POST_FETCH_USER } from '../types';

const initialState = {
	userPosts: [],
};

export const postReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case POST_FETCH_USER:
			return { ...state, userPosts: payload }
		case POST_CREATE:
			return { ...state, userPosts: [...state.userPosts, payload] }
		case POST_EDIT:
			return { ...state, userPosts: [...state.userPosts.map(i => i.id === payload.id ? payload : i)] }
		case POST_DELETE:
			return { ...state, userPosts: [...state.userPosts.filter(i => i.id !== payload)] }
		default:
			return state;
	}
};