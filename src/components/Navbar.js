import "../css/navbar.css";

import React, { useEffect, useState } from "react";
import logo from "../logo.png";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();
  // const { isLogin } = useSelector((state) => state.globalReducer);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      setIsLogin(true);
    }
  }, [isLogin])
  const logoutHandler = () => {
    setIsLogin(false);
    localStorage.clear();
    navigate("/")
  }
  return (
    // <header>
    <>
      <nav className="navbar-sticky">
        <div className="container">
          <div className="navbar-wrapper">
            <Link className="nav-logo" to="/">
              <img src={logo} />
            </Link>
            <div style={{ flexGrow: 1 }}></div>
            <div className="navbar-menu" style={{ marginLeft: "10rem" }}>
              {!isLogin && (
                <NavLink
                  to="/login"
                  className="d-flex"
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none"
                  }}
                >
                  Login
                  <span className="material-symbols-outlined">login</span>
                </NavLink>
              )}
              {isLogin && (
                <NavLink
                  to="/dashboard"
                  className="d-flex"
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                    marginRight: "1rem",
                  }}
                >
                  Dashboard
                  <span className="material-symbols-outlined">
                    dashboard
                  </span>
                </NavLink>
              )}
              {isLogin && (
                <Link
                  to="/dashboard/cart"
                  className="d-flex"
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                    marginRight: "1rem",
                  }}
                >
                  Cart
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </Link>
              )}
              {isLogin && (
                <a
                  onClick={logoutHandler}
                  type="submit"
                  className="d-flex"
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  Logout
                  <span className="material-symbols-outlined">logout</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* <header>{jumbotron && <div className="jumbotron"></div>}</header> */}
    </>
  );
}
