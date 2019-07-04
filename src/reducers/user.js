import { LOGIN, LOGIN_SUCCESSFUL, LOGIN_FAILED, LOGOUT, REGISTER_USER, REGISTER_USER_SUCCESSFUL, REGISTER_USER_FAILED } from '../actions/types';

const INITIAL_STATE = {
	loggingIn: false,
	details: {},

	isRegistering: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case LOGOUT:
			return { ...INITIAL_STATE };

			break;
		
		case REGISTER_USER:
			return { ...state, isRegistering: true };

			break;

		case REGISTER_USER_SUCCESSFUL:
			return { ...state, isRegistering: false, details: action.payload };

			break;

		case REGISTER_USER_FAILED:
			return { ...state, isRegistering: false };

			break;

		case LOGIN:
			return { ...state, loggingIn: true };

			break;

		case LOGIN_SUCCESSFUL:
			return { ...state, loggingIn: false, details: action.payload };

			break;

		case LOGIN_FAILED:
			return { ...state, loggingIn: false };

			break;

		default:
			return state;

			break;
	}
};
