import React from "react";
import { toIDR } from "../helpers";

const CardAllProducts = ({ products }) => {
  return (
    <>
      {products.map((product) => {
        return (
          <div className="col" key={product.id}>
            <div
              className="card mb-4"
              style={{ width: "17rem", fontSize: "0.875rem" }}
            >
              <img
                src={product.mainImg}
                className="card-img-top"
                alt={product.name}
                style={{ objectFit: "contain" }}
                height="200px"
                width="300px"
              />
              <div className="card-body" style={{ fontSize: "0.875rem" }}>
                <h5 className="card-title"><strong>{product.name}</strong></h5>
                <p className="card-text"><strong>{toIDR(product.price)}/{product.unit}</strong></p>
                <p className="card-text">Stock: {product.stock}</p>
                <p className="card-text">
                  {product.description.substring(0, 100)}
                </p>
                <a href="#" className="btn btn-sm btn-outline-primary" onClick={() => console.log(product.id)}>
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

export default CardAllProducts;
