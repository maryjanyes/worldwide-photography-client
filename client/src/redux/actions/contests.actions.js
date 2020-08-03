import { ApiService } from 'services/api.service';

export const requestContests = dispatch => {
    ApiService.getContests()
        .then(data => {
            dispatch(setContests(data));  
        });
};

export const setContests = payload => {
    return {
        type: 'SET_CONTESTS',
        payload,
    };
};

export const updateLastPhotoForSubmit = payload => {
    return {
        type: 'UPDATE_SUBMITTION_PHOTO',
        payload,
    };
};
