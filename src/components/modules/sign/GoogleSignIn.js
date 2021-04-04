import React, { useState } from 'react';
import { useSelector } from "react-redux";
import GoogleLogin from "react-google-login";

import { getTranslationStr } from 'utils/data.util';

import outerServicesSettings from 'configs/outer-services.settings';

const GoogleSignIn = () => {
    const { translations, activeLanguage } = useSelector(({ ui }) => ui);
    const [loadError, setLoadError] = useState(null);

    const onLoginWithGoogle = data => {
        console.log(data, 'On auth result');
    };

    const onScriptLoadFailure = reason => {
        setLoadError(reason.details);
    };

    return loadError && <span className="google-script__load-error">{loadError.slice(0, 18)}</span> || (<GoogleLogin
        clientId={outerServicesSettings.GOOGLE_CLIENT_APP_ID}
        buttonText={translations[getTranslationStr("common.sign_methods.google_placeholder", activeLanguage)]}
        onSuccess={onLoginWithGoogle}
        onFailure={onLoginWithGoogle}
        onScriptLoadFailure={onScriptLoadFailure}
    />);
};

export default GoogleSignIn;
