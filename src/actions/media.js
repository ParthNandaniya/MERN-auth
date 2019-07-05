import axios from 'axios';
import qs from 'querystring';
import moment from 'moment';

import { 
    FETCH_MEDIA,
    FETCH_MEDIA_SUCCESSFUL,
    FETCH_MEDIA_FAILED
} from './types';
import configs from '../configs';


export const fetchMedia = (details = {}, onSuccess = () => {}, onFailure = () => {}) => {
	return dispatch => {

		dispatch({ type: FETCH_MEDIA });

		axios
			.post(`${configs.API.baseURL}dashboard/getAllMedia`, {})
			.then(res => {
				// console.log(res.data);
				if(res.data.result === "successful") {

					dispatch({
						type: FETCH_MEDIA_SUCCESSFUL,
						payload: [ ...res.data.media ]
					});

					onSuccess();
				} else {

					dispatch({ type: FETCH_MEDIA_FAILED });
					onFailure(`${res.data.error}`);
				}
			})
			.catch(error => {
				dispatch({ type: FETCH_MEDIA_FAILED });
				onFailure(`${error}`);
			});
	}
}
