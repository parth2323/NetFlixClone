import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Switch replaced with Routes
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import LoginScreen from "./screens/LoginScreen";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/user/userSlice";

function App() {
  //const user = "null";
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        //LogIn
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
        //console.log(userAuth);
      } else {
        //LoggedOut
        dispatch(logout());
      }
    });
    return unsubscribed;
  }, [dispatch]);
  return (
    <div className="app">
      <Router>
        {!user ? ( //To direct login screen if no user found
          <LoginScreen />
        ) : (
          <Routes>
            <Route exact path="/" element={<HomeScreen />} />
            <Route exact path="/profile" element={<ProfileScreen />} />
            {/* <Route path="/LoginScreen" element={<LoginScreen />} /> */}
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
