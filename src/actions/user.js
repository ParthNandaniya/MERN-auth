import axios from 'axios';
import qs from 'querystring';
import moment from 'moment';

import { 
	STATE_REHYDRATED, 
	REGISTER_USER,
	REGISTER_USER_SUCCESSFUL,
	REGISTER_USER_FAILED,
	LOGIN, 
	LOGIN_SUCCESSFUL, 
	LOGIN_FAILED, 
	LOGOUT 
} from './types';
import configs from '../configs';

export const stateRehydrated = () => {
	return {
		type: STATE_REHYDRATED
	};
};

export const registerUser = (details = {}, onSuccess = () => {}, onFailure = () => {}) => {
	return dispatch => {
		dispatch({ type: REGISTER_USER });

		const { email, password, firstName, lastName } = details;

		axios
            .post(`${configs.API.baseURL}auth/signup`, {
                email,
                password,
                firstName,
                lastName
            })
            .then(res => {
                if(res.data.result === 'successful') {

					dispatch({
						type: REGISTER_USER_SUCCESSFUL,
						payload: res.data.user
					});

					onSuccess();
                } else {

					dispatch({ type: REGISTER_USER_FAILED });
					onFailure(`${res.data.error}`);
                }
            })
            .catch(error => {
				
				dispatch({ type: REGISTER_USER_FAILED})
				onFailure(`${error}`);
            });
	}
}

export const logout = (details = {}, onSuccess = () => {}, onFailure = () => {}) => {
	return dispatch => {
		
		const { email } = details;

		axios
            .post(`${configs.API.baseURL}auth/logout`, {
                email
            })
            .then(res => {
                // console.log({ res });
                if(res.data.result === 'successful') {

					dispatch({ type: LOGOUT });
					onSuccess();
                } else {
					onFailure(`${res.data.error}`);
				}
            })
            .catch(error => {
                onFailure(`${error}`);
            });

	};
};

export const login = (details = {}, onSuccess = () => {}, onFailure = () => {}) => {
	return dispatch => {
		dispatch({ type: LOGIN });

		const { email, password } = details;

		axios
			.post(`${configs.API.baseURL}auth/login`, {
				email,
				password,
			})
			.then(res => {
				if(res.data.result === 'successful') {

					dispatch({
						type: LOGIN_SUCCESSFUL,
						payload: res.data.user
					});

					onSuccess();
				} else {

					dispatch({ type: LOGIN_FAILED });
					onFailure(`${res.data.error}`);
				}
			})
			.catch(error => {
				dispatch({ type: LOGIN_FAILED });
				onFailure(`${error}`);
			});
	};
};
