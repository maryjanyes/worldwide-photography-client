import { ApiService } from 'services/api.service';

export const requestContests = dispatch => {
    ApiService.getContests()
        .then(data => {
            dispatch(setContests(data));  
        })
        .catch(err => console.log('Unable fetch contests%', err.message));
};

export const setContests = payload => {
    return {
        type: 'SET_CONTESTS',
        payload,
    };
};
