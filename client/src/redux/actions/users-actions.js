export const signIn = payload => {
    return {
        type: 'TRY_SIGN_IN',
        payload,
    }
}

export const signUp = payload => {
    return {
        type: 'TRY_SIGN_UP',
        payload,
    }
}
