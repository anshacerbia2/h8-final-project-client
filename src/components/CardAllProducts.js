import React from "react";
import { toIDR } from "../helpers";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

const CardAllProducts = ({ products }) => {
  const { isLoading } = useSelector((state) => state.globalReducer);
  return (
    <>
      {products.map((product) => {
        return (
          <div className="card-prod-col" key={product.id}>
            <div
              className="card mb-4"
              style={{ fontSize: "0.875rem", borderRadius: 2 }}
            >
              {isLoading ? (
                <Skeleton height="200px" />
              ) : (
                <img
                  src={product.mainImg}
                  className="card-img-top"
                  alt={product.name}
                  style={{ objectFit: "contain" }}
                  height="200px"
                  width="300px"
                />
              )}

              <div className="card-body" style={{ fontSize: "0.875rem" }}>
                <h5 className="card-title">
                  {isLoading ? <Skeleton /> : <strong>{product.name}</strong>}
                </h5>
                <p className="card-text">
                  <strong>
                    {isLoading ? <Skeleton /> : toIDR(product.price)}/
                    {product.unit}
                  </strong>
                </p>
                <p className="card-text">
                  Stock: {isLoading ? <Skeleton /> : product.stock}
                </p>
                <p className="card-text">
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    product.description.substring(0, 100)
                  )}
                </p>
                {isLoading ? (
                  <Skeleton />
                ) : (
                  <Link
                    to={"/product/" + product.id}
                    className="btn custom-btn-1"
                  >
                    Lihat selengkapnya
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default CardAllProducts;
