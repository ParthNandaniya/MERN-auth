import {
    FETCH_MEDIA,
    FETCH_MEDIA_SUCCESSFUL,
    FETCH_MEDIA_FAILED
} from '../actions/types';

const INITIAL_STATE = {
    mediaList: [],
    fetchingMedia: false
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_MEDIA:
            return { ...state, fetchingMedia: true };
        
            break;

        case FETCH_MEDIA_SUCCESSFUL:
            return { ...state, mediaList: action.payload, fetchingMedia: false };

            break;

        case FETCH_MEDIA_FAILED:
            return { ...state, fetchingMedia: false };

            break;
        
        default:
            return state;
    }
};
