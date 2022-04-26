import { POST_CLEAR_BY_ID, POST_CREATE, POST_DELETE, POST_EDIT, POST_FETCH_BY_ID, POST_FETCH_USER } from '../types';

const initialState = {
	userPosts: [],
	postById: null,
};

export const postReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case POST_FETCH_USER:
			return { ...state, userPosts: payload }
		case POST_FETCH_BY_ID:
			return { ...state, postById: payload };
		case POST_CLEAR_BY_ID:
			return { ...state, postById: null };
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