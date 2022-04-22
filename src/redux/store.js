import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import { userReducer as user } from './user/reducer';
// import { postReducer as post } from './post/reducer';
import { appReducer as app } from './app/reducer';

const reducer = combineReducers({
	user,
	// post,
	app,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));

const store = createStore(reducer, enhancer);

export default store;
