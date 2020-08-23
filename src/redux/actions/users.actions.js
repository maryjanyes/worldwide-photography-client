import { sign } from './auth.actions';

export const signIn = (payload, dispatch) => {
    sign(payload, dispatch);
    return {
        type: 'TRY_SIGN_IN',
        payload,
    }
}

export const signUp = (payload, dispatch) => {
    sign(payload, dispatch);
    return {
        type: 'TRY_SIGN_UP',
        payload,
    }
}
