import React, { useEffect } from "react";
import Breadcumb from "../components/Breadcumb";
import CardAllProducts from "../components/CardAllProducts";
import Accordion from "react-bootstrap/Accordion";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubCategories, fetchProducts } from "../store/actions";
import CategoriesRadio from "../components/CategoriesRadio";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productReducer);
  const { subCategories } = useSelector((state) => state.subCategoriesReducer);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchSubCategories());
  }, []);
  return (
    <>
      <Breadcumb />
      <div className="container mb-4">
        <div className="row">
          <div className="col-9">
            <div className="row">
              <CardAllProducts products={products} />
            </div>
          </div>
          <div className="col-3">
            <h5 style={{ fontFamily: "Lato" }}>
              <strong> Filter</strong>
            </h5>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header style={{ fontSize: "0.875rem" }}>
                  <strong>Kategori</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <CategoriesRadio subCategories={subCategories}/>                 
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <strong>Lokasi</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Jakarta
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Bekasi
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Luar pulau jawa
                    </label>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
