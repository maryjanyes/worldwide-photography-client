import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookSignIn = () => {
    const onLoginWithFacebook = data => {
        console.log(data, 'On auth with facebook result');
    };

    return <FacebookLogin
        appId='467836654370521'
        fields='name, email, picture'
        callback={onLoginWithFacebook}
    />;
};

export default FacebookSignIn;
