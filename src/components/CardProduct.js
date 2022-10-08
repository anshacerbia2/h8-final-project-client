import React from "react";
import { toIDR } from "../helpers";


const CardProduct = ({ products }) => {
  console.log(products)
  return (
    <>
      {products.map((product) => {
        return (
          <div className="col" key={product.id}>
            <div className="card mb-4" style={{ width: "auto" }}>
              <img
                src={product.mainImg}
                className="card-img-top"
                alt={product.name}
                height="200px"
                width="300px"
                style={{ objectFit: "contain" }}
              />
              <div className="card-body" style={{ fontSize: "0.875rem" }}>
                <h5 className="card-title">
                  <strong> {product.name}</strong>
                </h5>
                <p className="card-text">{toIDR(product.price)}/{product.unit}</p>
                <p className="card-text">
                  {product.description.substring(0, 100)}
                </p>
                <a
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => console.log(product.id)}
                >
                  Lihat selengkapnya
                </a>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CardProduct;
