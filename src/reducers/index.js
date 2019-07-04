import { combineReducers } from 'redux';

import state from './state';
import user from './user';
import media from './media';

export default combineReducers({
	state,
	user,
	media
});
