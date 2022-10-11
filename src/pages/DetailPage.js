import "../App.css";
import "../css/detailPage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, fetchProvinces, postCart } from "../store/actions";
import Breadcumb from "../components/Breadcumb";
import { formatDate, swalImg, toIDR } from "../helpers";
import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";
import Skeleton from "react-loading-skeleton";

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productReducer);
  const { isLoadingSubmit } = useSelector((state) => state.globalReducer);
  const { isLoading, provinces, cities } = useSelector(
    (state) => state.globalReducer
  );
  console.log(product);
  const [quantity, setQuantity] = useState(1);
  let totalPrice = quantity * product.price;
  useEffect(() => {
    dispatch(fetchProduct(id));
    // dispatch(fetchProvinces());
  }, []);
  const decrementHandler = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };
  const incrementHandler = () => {
    if (quantity >= product.stock) return;
    setQuantity(quantity + 1);
  };
  const addCartHandler = (e) => {
    // try {
    e.preventDefault();
    if (quantity > product.stock) {
      console.log("invalid stock");
      return;
    }
    const cartInfo = {
      ProductId: product.id,
      quantity: quantity,
      // UserId: 1
    };
    // Add process cart
    dispatch(postCart(cartInfo)).then((resp) => {
      if (resp.status === 201) {
        const responseJSON = resp.json();
        swalImg.fire({
          title: "Berhasil Ditambahkan",
          text: responseJSON.message,
          imageUrl: product.mainImg,
          imageWidth: 300,
          imageHeight: 300,
          timer: 3000,
        });
      }
    });
    // if (response.status === 200) {
    //   const responseJSON = await response.json();
    //   swalImg.fire({
    //     title: 'Berhasil Ditambahkan',
    //     text: responseJSON.message,
    //     imageUrl: product.mainImg,
    //     imageWidth: 300,
    //     imageHeight: 300,
    //     timer: 3000,
    //   })
    // }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <div id="DetailPage">
      <Breadcumb />
      <div className="container">
        <div className="custom-row-1">
          <div
            className="custom-col-2"
            style={{
              width: "calc(27% - 20px)",
              margin: "10px",
            }}
          >
            {isLoading ? (
              <Skeleton height="200px" />
            ) : (
              <img
                className="detail-img"
                src={product.mainImg}
                alt={product.name}
              />
            )}
          </div>
          <div
            className="custom-col-2"
            style={{
              width: "calc(43% - 20px)",
              paddingLeft: "40px",
              margin: "10px",
            }}
          >
            <h3 className="detail-name">
              {isLoading ? <Skeleton /> : product.name}
            </h3>
            <p className="detail-price">
              <span className="price">
                {isLoading ? <Skeleton /> : toIDR(product.price)}
              </span>
              <span className="unit-price">
                /{isLoading ? <Skeleton /> : product.unit}
              </span>
            </p>
            <p className="detail-info">
              Tanggal panen : &nbsp;
              {isLoading ? (
                <Skeleton />
              ) : (
                formatDate(product.harvestDate ? product.harvestDate : "")
              )}
            </p>
            <p className="detail-desc">
              {isLoading ? <Skeleton /> : product.description}
            </p>
            <div className="detail-seller">
              <div className="detail-seller-header">
                {isLoading ? (
                  <Skeleton height="40px" />
                ) : (
                  <img src={product.User?.avatar} alt={product.User?.fName} />
                )}
                <div style={{ flexGrow: 1 }}>
                  <h6 className="mb-0">
                    {isLoading ? (
                      <Skeleton />
                    ) : (
                      product.User?.fName + " " + product.User?.lName
                    )}
                  </h6>
                </div>
                <div className="detail-cart-action">
                  <button
                    id="openChat"
                    className="btn custom-btn-1"
                    style={{ marginTop: 0 }}
                  >
                    <span className="material-symbols-outlined">chat</span>
                    <span>Chat</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="detail-sender">
              <span>Pengiriman</span>
              <div>
                <span className="material-icons" style={{ marginLeft: "-3px" }}>
                  location_on
                </span>
                <p>
                  Dikirim dari
                  <span>
                    {
                      isLoading ? <Skeleton /> : product.User?.Addresses.find(v => v.default === true)?.city
                    }
                  </span>
                </p>
              </div>
              <div>
                <span className="material-icons">local_shipping</span>
                <p>Ongkos kirim ekonomis Rp.18.000</p>
              </div>
            </div>
          </div>
          <div
            className="custom-col-2"
            style={{
              width: "calc(30% - 20px)",
              paddingLeft: "20px",
              margin: "10px",
            }}
          >
            <div className="detail-cart">
              <div className="detail-cart-form-wrapper">
                <form onSubmit={addCartHandler}>
                  <h6 className="detail-cart-title">Atur Jumlah</h6>
                  <div className="group-input">
                    <button
                      type="button"
                      className="btn min"
                      onClick={decrementHandler}
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <input
                      className="form-control stock"
                      name="quantity"
                      value={quantity}
                      min={0}
                      max={product.stock}
                      onChange={(e) => {
                        let value = e.target.value;
                        if (value > product.stock) {
                          return;
                        }
                        setQuantity(value);
                      }}
                    />
                    <button
                      type="button"
                      className="btn add"
                      onClick={incrementHandler}
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                    <div className="detail-stock">
                      Stock:{" "}
                      {isLoading ? <Skeleton /> : <span>{product.stock}</span>}
                    </div>
                  </div>
                  <small
                    style={{
                      fontFamily: "Lato",
                      fontSize: "12px",
                      color: "#666666",
                    }}
                  >
                    Max. pembelian {product.stock} {product.unit}
                  </small>
                  <p className="total-cart">
                    <span>Subtotal</span>
                    <span>{toIDR(totalPrice)}</span>
                  </p>
                  <div className="detail-cart-action">
                    <button
                      id="openChat"
                      type="submit"
                      className="btn custom-btn-1"
                    >
                      <span
                        className="material-symbols-outlined"
                        style={{ marginBottom: 0 }}
                      >
                        add
                      </span>
                      <span>Keranjang</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
