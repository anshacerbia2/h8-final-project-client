import React from "react";

const CartPage = () => {
  return (
    <>
      <div className="container">

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
