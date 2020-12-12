import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { getTranslationStr } from 'utils/data.util';
import SignInForm from "components/modules/sign/SignInForm";
import SignUpForm from "components/modules/sign/SignUpForm";

import signInVariant from "types/signInVariant";

import Judle1_avatar from '../../assets/images/NastyaTelikova_judle.png';
import Judle2_avatar from '../../assets/images/Valentina_judle.png';

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
  }, [history.pathname]);

  useEffect(() => {
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
  const { translations, activeLanguage } = useSelector(({ ui }) => ui);
  return (
    <div className="sign-in-using">
      <div className="sign-in-using__container">
        <p className="sign-in__title">{translations[getTranslationStr('sign_items.sign_up.sign_in_using', activeLanguage)]}</p>
        <div className="sign-in-using__selectors">
          <button
            onClick={() => signIn(signInVariant.facebook)}
            className="btn-link sign-in-selector facebook"
          >
            Facebook
          </button>
          <button
            onClick={() => signIn(signInVariant.google)}
            className="btn-link sign-in-selector google"
          >
            Google
          </button>
        </div>
      </div>
      <div className="sign-in__judles">
        <p className="sign-in__title">{translations[getTranslationStr('sign_items.sign_up.project_judles', activeLanguage)]}</p>
        <div className="sign-in__judles-container">
          <div className="sign-in__judles-judle">
            <img
              className="judle-avatar judle-1"
              // src={Judle1_avatar}
            />
            <span>
              (с) могу уместить всю свою жизньв рюкзаки уехать в неизвестность
            </span>
          </div>
          <div className="sign-in__judles-judle">
            <img
              className="judle-avatar judle-2"
              // src={Judle2_avatar}
            />
            <span>(с) тут слоган Насті</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInScreen;
