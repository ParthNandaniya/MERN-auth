import { combineReducers } from 'redux';

import state from './state';
import user from './user';

export default combineReducers({
	state,
	user,
});
