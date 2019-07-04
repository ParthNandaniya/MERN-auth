import { STATE_REHYDRATED } from '../actions/types';

const INITIAL_STATE = {
	stateRehydrated: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case STATE_REHYDRATED:
			return { ...state, stateRehydrated: true };

			break;

		default:
			return state;

			break;
	}
};
