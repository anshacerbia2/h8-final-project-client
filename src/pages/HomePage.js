import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../store/actions";
import logo from "../logo.png";
import Footer from "../components/Footer";
import CardAuction from "../components/CardAuction";
import CardProduct from "../components/CardProduct";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.productReducer);
  useEffect(() => {
    // if (!localStorage.getItem('access_token')) navigate('/login');
    dispatch(fetchProducts());
  }, []);
  return (
    <div className="container">
      {/* Section Header */}
      <div
        className="row"
        style={{
          color: "#fff",
          width: "100%",
          backgroudRepeat: "no-repeat",
          backgroundSize: "center",
          backgroundBlendMode: "darken",
          background:
            "rgba(0, 0, 0, 0.6) url('https://cdn.pixabay.com/photo/2017/11/13/16/19/tea-2946057_1280.jpg')",
        }}
      >
        <div className="jumbotron d-flex flex-column justify-content-center align-items-center">
          <h3 className="display-4">Selamat datang di Agro Shop</h3>
          <p className="text-center" style={{ padding: "0 15rem" }}>
            Belanja semua kebutuhan pangan sayuran dan buah mu disini, langsung
            dari petani. Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Sequi iure ducimus accusamus mollitia nisi.
          </p>
        </div>
      </div>
      {/* Section Lelang */}
      <div className="row my-4">
        <h5>Lelang saat ini</h5>
        <CardAuction />
        <CardAuction />
        <CardAuction />
      </div>
      {/* Section Why Us*/}
      <div
        className="row"
        style={{
          fontSize: "0.875rem",
          color: "#fff",
          backgroudRepeat: "no-repeat",
          backgroundSize: "center",
          backgroundBlendMode: "darken",
          background:
            "rgba(0, 0, 0, 0.6) url('https://cdn.pixabay.com/photo/2017/07/31/04/11/tomato-2556426_1280.jpg')",
        }}
      >
        <div
          className="col d-flex flex-column justify-content-sm-evenly align-items-center text-center"
          style={{
            height: "25rem",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "5rem", color: "#94d537" }}
          >
            nest_eco_leaf
          </span>
          <h5>
            <strong> Produk segar </strong>
          </h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            a doloremque quam, corporis illo quisquam eum.
          </p>
        </div>
        <div
          className="col d-flex flex-column justify-content-sm-evenly align-items-center text-center"
          style={{ height: "25rem" }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "5rem", color: "#94d537" }}
          >
            schedule
          </span>
          <h5>
            <strong> Pengiriman yang cepat</strong>
          </h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            a doloremque quam, corporis illo quisquam eum.
          </p>
        </div>
        <div
          className="col d-flex flex-column justify-content-sm-evenly align-items-center text-center"
          style={{ height: "25rem" }}
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "5rem", color: "#94d537" }}
          >
            priority
          </span>
          <h5>
            <strong>Pelayanan memuaskan</strong>
          </h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            a doloremque quam, corporis illo quisquam eum.
          </p>
        </div>
      </div>
      {/* Section Lelang */}
      <div className="row my-4">
        <div className="row">
          <div className="col">
            <h5>Produk Agro</h5>
          </div>
          <div className="col d-flex justify-content-end">
            <p>See more</p>
          </div>
        </div>
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </div>
      <div className="custom-row-1">
        {products?.map((product, i) => {
          return (
            <div className="custom-col-1" key={"list-product-" + i}>
              <div className="custom-col-1-card">
                <div className="custom-col-1-card-img">
                  <img src={product.mainImg} />
                </div>
                <h3 className="card-name">{product.name}</h3>
                <p className="card-price">
                  {product.price}/{product.unit}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
