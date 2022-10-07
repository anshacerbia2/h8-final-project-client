import React from "react";

const ProductListPage = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <div
          className="row"
          style={{ backgroundColor: "#49b773", height: "150px" }}
        >
          <div
            className="col d-flex flex-column justify-content-center align-items-center"
            style={{ color: "#fff" }}
          >
            <h5>Dashboard Page</h5>
            <p>Lorem ipsum dolor siet amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <main className="row my-4">
          <div className="row"></div>
        </main>
      </div>
    </>
  );
};

export default ProductListPage;
