import React from "react";

const CartPage = () => {
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
            <h5>Cart Page</h5>
            <p>Lorem ipsum dolor siet amet consectetur adipisicing elit.</p>
          </div>
        </div>
        <main className="row my-4">
          <div className="col">
            <p>Your Cart, User</p>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Produk</th>
                  <th>Kategori</th>
                  <th>Harga</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Tomat Segar dan Jumbo</td>
                  <td>Sayur dan buah</td>
                  <td>Rp. 200.000,00</td>
                  <td>
                    <button className="btn btn-sm btn-danger">Remove</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Susu segar</td>
                  <td>Sayur dan buah</td>
                  <td>Rp. 500.000,00</td>
                  <td>
                    <button className="btn btn-sm btn-danger">Remove</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="row">
              <p>
                <strong>Detail pesanan: </strong>
              </p>
              <div className="col">
                <p>Nama pemesan: Haji Ali</p>
                <p>Alamat: Jl. Pondok Labu No. 9090, Cilandak, Jakarta Selatan</p>
                <p>Nomor handphone: +62-857-2831-1928</p>
                <p>Total harga: Rp. 700.000,00</p>
              </div>
            </div>
            <button className="btn btn-md btn-primary">Process checkout</button>
          </div>
        </main>
      </div>
    </>
  );
};

export default CartPage;
