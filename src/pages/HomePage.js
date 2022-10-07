import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../store/actions";
import logo from "../logo.png";
import Footer  from "../components/Footer";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.productReducer);

  useEffect(() => {
    // if (!localStorage.getItem('access_token')) navigate('/login');
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="container mt-4">
      <div
        className="row"
        // style={{ border: "0.1px solid #999999", height: "80" }}
      >
        <div className="col-3 d-flex align-items-center">
          <img src={logo} height="80px" width="100px" alt="Agro Shop" />
        </div>
        <div
          className="col d-flex justify-content-center align-items-center"
          style={{
            borderLeft: "0.2px solid #999999",
          }}
        >
          <nav className="">
            <ul class="nav">
              <li class="nav-item">
                <a class="nav-link active" href="#">
                  home
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  product
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  login
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  register
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col d-flex justify-content-center align-items-center">
          Cart
        </div>
      </div>
      {/* Section Header */}
      <div
        className="row mt-2"
        style={{
          // height: "500px",
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          // backgroundBlendMode: "darken",
          color: "#fff",
          backgroundImage: "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
        }}
      >
        <div class="jumbotron d-flex flex-column justify-content-center align-items-center">
          <h3 class="display-4">Welcome to Agro Shop</h3>
          <p class="text-center">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi iure
            ducimus accusamus mollitia nisi. Doloremque consequuntur ea,
            excepturi cupiditate error libero.
          </p>
          <hr />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <a
            class="btn btn-sm"
            href="#"
            role="button"
            style={{ backgroundColor: "#83c81f", color: "#fff" }}
          >
            Learn more
          </a>
        </div>
      </div>
      {/* Section Lelang */}
      <div className="row my-4">
        <h5>Lelang saat ini</h5>
        <div className="col">
          <div className="card" style={{ width: "auto" }}>
            <img
              src="https://cdn.pixabay.com/photo/2016/03/05/22/06/tomatoes-1239176__340.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                See detail
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card" style={{ width: "auto" }}>
            <img
              src="https://cdn.pixabay.com/photo/2016/03/05/22/06/tomatoes-1239176__340.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                See detail
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card" style={{ width: "auto" }}>
            <img
              src="https://cdn.pixabay.com/photo/2016/03/05/22/06/tomatoes-1239176__340.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                See detail
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Section Why Us*/}
      <div className="row">
        <div
          className="col d-flex flex-column justify-content-center align-items-center text-center"
          style={{ height: "25rem", backgroundColor: "#e8e8e8" }}
        >
          <p>Fresh Ingredients</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            a doloremque quam, corporis illo quisquam eum.
          </p>
        </div>
        <div
          className="col d-flex flex-column justify-content-center align-items-center text-center"
          style={{ height: "25rem", backgroundColor: "#e8e8e8" }}
        >
          <p>Fast Delivery</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
            a doloremque quam, corporis illo quisquam eum.
          </p>
        </div>
        <div
          className="col d-flex flex-column justify-content-center align-items-center text-center"
          style={{ height: "25rem", backgroundColor: "#e8e8e8" }}
        >
          <p>Fast Service</p>
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
            <h5>Today Special</h5>
          </div>
          <div className="col d-flex justify-content-end">
            <p>See more</p>
          </div>
        </div>
        <div className="col">
          <div className="card" style={{ width: "auto" }}>
            <img
              src="https://cdn.pixabay.com/photo/2016/03/05/22/06/tomatoes-1239176__340.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                See detail
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card" style={{ width: "auto" }}>
            <img
              src="https://cdn.pixabay.com/photo/2016/03/05/22/06/tomatoes-1239176__340.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                See detail
              </a>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card" style={{ width: "auto" }}>
            <img
              src="https://cdn.pixabay.com/photo/2016/03/05/22/06/tomatoes-1239176__340.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                See detail
              </a>
            </div>
          </div>
        </div>
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
