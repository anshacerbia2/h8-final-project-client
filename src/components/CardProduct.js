import React from "react";

const CardProduct = () => {
  return (
    <>
      <div className="col">
        <div className="card mb-4" style={{ width: "20rem" }}>
          <img
            src="https://cdn.pixabay.com/photo/2016/03/05/22/06/tomatoes-1239176__340.jpg"
            className="card-img-top"
            alt="..."
          />
          <div className="card-body" style={{ fontSize: "0.875rem" }}>
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
            <a href="#" className="btn btn-sm btn-outline-primary">
              Lihat selengkapnya
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProduct;
