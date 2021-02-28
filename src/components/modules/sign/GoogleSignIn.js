import React from 'react'
import GoogleLogin from 'react-google-login'

const GoogleSignIn = () => {
    const onLoginWithGoogle = data => {
        console.log(data);
    };

    return <GoogleLogin
        clientId="worldwidephotography"
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={onLoginWithGoogle}
        onFailure={onLoginWithGoogle}
        // cookiePolicy={'single_host_origin'}
    />;
};

export default GoogleSignIn;