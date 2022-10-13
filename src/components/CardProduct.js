import React from "react";
import { toIDR } from "../helpers";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";

const CardProduct = ({ products }) => {
  const { isLoading } = useSelector((state) => state.globalReducer);
  return (
    <>
      {products.map((product) => {
        return (
          <div className="card-prod-col" key={product.id}>
            <div className="card mb-4" style={{ width: "100%", borderRadius: 2 }}>
              {isLoading ? (
                <Skeleton height="200px" />
              ) : (
                <img
                  src={product.mainImg}
                  className="card-img-top"
                  alt={product.name}
                  height="250px"
                  width="300px"
                  style={{ objectFit: "contain", borderRadius: 0, padding: 20 }}
                />
              )}
              <div className="card-body" style={{ fontSize: "0.875rem", borderRadius: 0 }}>
                <h5 className="card-title">
                  {isLoading ? <Skeleton /> : <strong> {product.name}</strong>}
                </h5>
                <p className="card-text">
                  {isLoading ? <Skeleton /> : toIDR(product.price)}/
                  {product.unit}
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
                    className="btn custom-btn-1"
                    to={"/product/" + product.id}
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

export default CardProduct;
