import React, { useRef } from "react";
import "./SignUpScreen.css";
import { auth } from "../firebase.js";

function SignUpScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value, //To get email info for SignUp
        passwordRef.current.value //To get password info for SignUp
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(
        emailRef.current.value, //To get email info for SignIn
        passwordRef.current.value //To get password info for SignIn
      )
      .then((authUser) => {
        console.log(authUser);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="SignUpScreen">
      <form>
        <h1>Sign In</h1>
        <input ref={emailRef} type="email" placeholder="Email" />
        <input
          ref={passwordRef}
          type="current-password"
          placeholder="Password"
        />
        <button onClick={signIn} type="submit">
          Sign In
        </button>
        <h4 className="subTitle">
          <span className="signUpScreen__gray">New To Netflix? </span>
          <span className="signUpScreen__link" onClick={register}>
            Sign Up Now
          </span>
        </h4>
      </form>
    </div>
  );
}

export default SignUpScreen;
