import React, { useEffect, useState } from "react";
import Breadcumb from "../components/Breadcumb";
import CardAllProducts from "../components/CardAllProducts";
import Accordion from "react-bootstrap/Accordion";
import { useSelector, useDispatch } from "react-redux";
import { fetchSubCategories, fetchProducts, fetchProductByTitle } from "../store/actions";
import CategoriesRadio from "../components/CategoriesRadio";

const AllProducts = () => {
  const dispatch = useDispatch();
  const [filterProduct, setFilterProduct] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const { products } = useSelector((state) => state.productReducer);
  const { subCategories } = useSelector((state) => state.subCategoriesReducer);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchSubCategories());
    setFilterProduct(products);
  }, []);
  console.log(products);
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
    dispatch(fetchProductByTitle(searchProduct)).then(data => setFilterProduct(data))
  }
  return (
    <>
      <Breadcumb allproduct={'true'} />
      <div className="container mb-4">
        <div className="row">
          <div className="col-9">
            <div className="custom-row-1">
              <CardAllProducts products={filterProduct} />
            </div>
          </div>
          <div className="col-3">
            <div className="row mb-3">
              <form onSubmit={searchProductHandler} className="input-group global-search" style={{ marginLeft: "0", width: "100%", padding: "0 0.875rem" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search product"
                  aria-label="Search product"
                  aria-describedby="Search product"
                  value={searchProduct}
                  onChange={(e) => setSearchProduct(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn" type="submit">
                    <span className="material-symbols-outlined">search</span>
                  </button>
                </div>
              </form>
            </div>

            <h5 style={{ fontFamily: "Lato", color: '#696969' }}>
              <strong> Filter</strong>
            </h5>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0" style={{ borderRadius: 2 }}>
                <Accordion.Header style={{ fontSize: "0.875rem" }}>
                  <strong style={{ color: '#6daf0d' }}>Kategori</strong>
                </Accordion.Header>
                <Accordion.Body style={{ fonFamily: 'Lato' }}>
                  <CategoriesRadio
                    subCategories={subCategories}
                    filterHandler={filterHandler}
                  />
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
