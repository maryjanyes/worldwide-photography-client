import AuthService from 'services/auth.service';

const signSuccess = profileData => {
    return {
        type: 'LOG_IN_SUCCESS',
        payload: profileData,
    };
};

const signError = error => {
    return {
        type: 'LOG_IN_ERROR',
        error,
    };
};

export const sign = (data, dispatch) => {
    const response = AuthService
        .logIn(data)
    if (response) {
        console.log(response)
    }
};
