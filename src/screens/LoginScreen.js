import React, { useState } from "react";
import "./LoginScreen.css";
import "./LoginScreenExtra.scss";
import SignUpScreen from "./SignUpScreen";

function LoginScreen() {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img
          className="loginScreen__logo"
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt="Logo"
        />
        {/* <div class="button-container-1">
          <span class="mas">MASK1</span>
          <button id="work" type="button" name="Hover">
            Sign In
          </button>
        </div> */}
        <button onClick={() => setSignIn(true)} className="loginScreen__button">
          Sign In
        </button>
        <div className="loginScreen__gradient" />
      </div>

      <div className="loginScreen__body">
        {signIn ? (
          <SignUpScreen />
        ) : (
          <>
            <h1>Unlimited movies, TV shows, and more.</h1>
            <h2 className="subTitle">Watch anywhere. Cancel anytime.</h2>
            <h3 className="h3Title">
              Ready to watch? Enter your email to create or restart your
              membership.
            </h3>

            <div className="loginScreen__input">
              <form>
                <input type="email" placeholder="Email..." />
                <button
                  onClick={() => setSignIn(true)}
                  className="loginScreen__getStarted"
                  type="submit"
                >
                  Get Started
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
