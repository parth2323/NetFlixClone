import React from "react";
import "./ProfileScreen.css";
import Nav from "../components/Nav";
import avatar from "../components/avatarNetflix.png";

import PlansScreen from "./PlansScreen";

import { useSelector } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { auth } from "../firebase";

function ProfileScreen() {
  const user = useSelector(selectUser); //To get email info

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Screen</h1>
        <div className="profileScreen__info">
          <img src={avatar} alt="Avatar" />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans</h3>
              <PlansScreen />
              <button
                onClick={() => {
                  auth.signOut();
                }}
                className="profileScreen__signout"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
