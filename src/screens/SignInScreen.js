import React, { useState, useEffect } from "react";

import SignInForm from "components/modules/sign/SignInForm";
import SignUpForm from "components/modules/sign/SignUpForm";

import signInVariant from "types/signInVariant";

import Judle1 from '../../assets/images/NastyaTelikova_judle.png';
import Judle2 from '../../assets/images/Valentina_judle.png';

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
  return (
    <div>
      <div className="sign-in-selectors">
        <p className="sign-in-text">Sign in using</p>
        <div className="sign-in-using-selectors">
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
      <div className="sign-in-judles-area">
        <p className="sign-in-text">Project judles</p>
        <div className="sign-in-judles">
          <div className="sign-in-judle">
            <img
              className="sign-in-judle-avatar"
              src={Judle1}
            />
            <span>
              (с) могу уместить всю свою жизньв рюкзаки уехать в неизвестность
            </span>
          </div>
          <div className="sign-in-judle">
            <img
              className="sign-in-judle-avatar"
              src={Judle2}
            />
            <span>(с) тут слоган Насті</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInScreen;
