import React from "react";
import logo from "../logo.png";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Nav = () => {
  const { isLogin } = useSelector((state) => state.globalReducer);
  console.log(isLogin);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg sticky-top navbar-light bg-light shadow p-3 bg-white rounded"
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Agro Shop" height="30px" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link">Product</NavLink>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
            <div className="navbar-menu" style={{ marginLeft: "10rem" }}>
              {!isLogin && (
                <a
                  className="d-flex"
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                    marginRight: "1rem",
                  }}
                >
                  Login
                  <span class="material-symbols-outlined">login</span>
                </a>
              )}
              {isLogin && (
                <a
                  className="d-flex"
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                    marginRight: "1rem",
                  }}
                >
                  Logout
                  <span class="material-symbols-outlined">login</span>
                </a>
              )}
              {isLogin && (
                <a
                  className="d-flex"
                  style={{
                    cursor: "pointer",
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  Cart
                  <span className="material-symbols-outlined">
                    shopping_cart
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
