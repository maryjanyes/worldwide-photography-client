import React from 'react'
import FacebookLogin from 'react-facebook-login'

const FacebookSignIn = () => {
    const onLoginWithFacebook = data => {
        console.log(data);
    };

    return <FacebookLogin
        appId='467836654370521'
        autoLoad={true}
        fields='name, email, picture'
        callback={onLoginWithFacebook}
    />;
};

export default FacebookSignIn;
