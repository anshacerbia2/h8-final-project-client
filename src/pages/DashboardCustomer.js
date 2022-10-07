import React from "react";
import Breadcumb from "../components/Breadcumb";
const DashboardCustomer = () => {
  return (
    <>
      <Breadcumb />
      <div className="container">

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
            <button className="btn btn-sm btn-primary my-4 py-2">+ Add Product</button>
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
