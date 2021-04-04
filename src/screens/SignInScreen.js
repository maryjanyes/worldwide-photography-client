import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getTranslationStr } from 'utils/data.util';
import SignInForm from "components/modules/sign/SignInForm";
import SignUpForm from "components/modules/sign/SignUpForm";
import FacebookSignIn from "components/modules/sign/FacebookSignIn";
import GoogleSignIn from "components/modules/sign/GoogleSignIn";

function SignInScreen({ history }) {
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  useEffect(() => {
    history.listen((change) => {
      if (change.pathname === "/sign-in") {
        setIsSignUpMode(false);
      } else {
        setIsSignUpMode(true);
      }
    });
    if (history.location.pathname === "/sign-up") {
      setIsSignUpMode(true);
    }
  }, []);

  return (
    <div className="page page-sign">
      {isSignUpMode ? (
        <SignUpForm
          switchToSignInMode={() => setIsSignUpMode(false)}
          history={history}
        />
      ) : (
        <SignInForm
          backToSignUpMode={() => setIsSignUpMode(true)}
          history={history}
        />
      )}
      <SignInUsing signIn={() => console.log("Sign in using social.")} />
    </div>
  );
}

function SignInUsing({ signIn }) {
  const { translations, activeLanguage, siteJudles } = useSelector(({ ui, users }) => ({ ...ui, ...users }));

  return (
    <div className="sign-in-using">
      <div className="sign-in-using__container">
        <p className="sign-in__title">{translations[getTranslationStr('sign_items.sign_up.sign_in_using', activeLanguage)]}</p>
        <div className="sign-in-using__selectors">
          <FacebookSignIn />
          {/** <GoogleSignIn /> **/}
        </div>
      </div>
      <div className="sign-in__judles">
        <p className="sign-in__title">{translations[getTranslationStr('sign_items.sign_up.project_judles', activeLanguage)]}</p>
        <div className="sign-in__judles-container">
          {siteJudles.length && siteJudles.map(_judle => {
            return (
              <div className="sign-in__judles-judle">
                  <img
                    className="judle-avatar judle-1 site-image"
                    src={_judle.avatar_url}
                  />
                  <span>
                    (с) {_judle.slogan}
                  </span>
              </div>
            )
          }) || <p>Waiting for the first judle coming!</p>}
        </div>
      </div>
    </div>
  );
}

export default SignInScreen;
