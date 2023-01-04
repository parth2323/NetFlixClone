import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";
import logo from "./logoNetflix.png";
import avatar from "./avatarNetflix.png";

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="nav__logo"
          src={logo}
          alt="Logo"
        />
        <img
          onClick={() => {
            navigate("/profile");
          }}
          className="nav__avatar"
          src={avatar}
          alt="Avatar"
          style={{
            borderRadius: "5px",
          }}
        />
      </div>
    </div>
  );
}

export default Nav;
