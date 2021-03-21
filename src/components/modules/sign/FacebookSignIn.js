import React from "react";
import { useDispatch } from "react-redux";
import FacebookLogin from "react-facebook-login";

import { signUp } from "reducers/actions/auth.actions";

const FacebookSignIn = () => {
    const dispatch = useDispatch();

    const onLoginWithFacebook = data => {
        data.from_facebook = true;
        // dispatch(signUp(data, dispatch));
    };

    return <FacebookLogin
        appId='467836654370521'
        fields='name, email, picture'
        callback={onLoginWithFacebook}
    />;
};

export default FacebookSignIn;
