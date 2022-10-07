import React from "react";

const DashboardCustomer = () => {
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
          <div className="col d-flex flex-column justify-content-center align-items-center" style={{ color: "#fff"}}>
            <h5>Dashboard Page</h5>
            <p>Lorem ipsum dolor siet amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <main className="row my-4">
          <div className="col">
            <h5>Dashboard Konsumer</h5>
            <p>Hi, there!</p>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#">Home</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Product</a>
                </li>
              </ol>
            </nav>
            <button className="btn btn-sm btn-primary my-4">+ Add Product</button>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Produk</th>
                  <th>Harga</th>
                  <th>Kategori</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Tomat Segar dan Jumbo</td>
                  <td>Rp. 200.000,00</td>
                  <td>Sayur dan buah</td>
                  <td>
                    <a href="" className="btn btn-sm btn-secondary ml-3">Edit</a>
                    <a href="" className="btn btn-sm btn-danger">Delete</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardCustomer;
