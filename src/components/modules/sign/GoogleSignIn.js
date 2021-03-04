import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';

import outerServicesSettings from 'configs/outer-services.settings';

const GoogleSignIn = () => {
    const [loadError, setLoadError] = useState(null);

    const onLoginWithGoogle = data => { };

    const onScriptLoadFailure = reason => {
        setLoadError(reason.details);
    };

    return loadError && <span className='google-script__load-error'>{loadError.slice(0, 18)}</span> || (<GoogleLogin
        clientId={outerServicesSettings.GOOGLE_CLIENT_APP_ID}
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={onLoginWithGoogle}
        onFailure={onLoginWithGoogle}
        onScriptLoadFailure={onScriptLoadFailure}
        cookiePolicy='single_host_origin'
    />);
};

export default GoogleSignIn;