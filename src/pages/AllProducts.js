import React, { useEffect, useState } from "react";
import Breadcumb from "../components/Breadcumb";
import CardAllProducts from "../components/CardAllProducts";
import Accordion from "react-bootstrap/Accordion";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubCategories, fetchProducts } from "../store/actions";
import CategoriesRadio from "../components/CategoriesRadio";

const AllProducts = () => {
  const dispatch = useDispatch();
  const [filterProduct, setFilterProduct] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const { products } = useSelector((state) => state.productReducer);
  const { subCategories } = useSelector((state) => state.subCategoriesReducer);
  useEffect(() => {
    dispatch(fetchProducts()).then((data) => setFilterProduct(data));
    dispatch(fetchSubCategories());
  }, []);
  // console.log(filterProduct.filter(el => el.SubCategoryId === 7));
  const filterHandler = (id) => {
    // console.log(id, typeof id);
    const newProducts = products.filter(
      (product) => product.SubCategoryId === Number(id)
    );
    setFilterProduct(newProducts);
    // console.log(newProducts);
  };
  const searchProductHandler = (event) => {
    event.preventDefault();
    // console.log(searchProduct);
    // code below
  }
  return (
    <>
      <Breadcumb />
      <div className="container mb-4">
        <div className="row">
          <div className="col-9">
            <div className="row">
              <CardAllProducts products={filterProduct} />
            </div>
          </div>
          <div className="col-3">
            <h5 style={{ fontFamily: "Lato" }}>
              <strong> Filter</strong>
            </h5>
            <div className="row mb-3">
              <form class="input-group global-search" style={{ marginLeft: "0", width: "100%", padding: "0"}}>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search product"
                  aria-label="Search product"
                  aria-describedby="Search product"
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                />
                <div class="input-group-append">
                  <button class="btn" type="button" onClick={searchProductHandler}>
                    <span class="material-symbols-outlined">search</span>
                  </button>
                </div>
              </form>
            </div>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header style={{ fontSize: "0.875rem" }}>
                  <strong>Kategori</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <CategoriesRadio
                    subCategories={subCategories}
                    filterHandler={filterHandler}
                  />
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
