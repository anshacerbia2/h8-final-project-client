import "../App.css";
import "../css/detailPage.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { courierCost, fetchProduct, fetchProvinces, fetchUser, postCart } from "../store/actions";
import Breadcumb from "../components/Breadcumb";
import { formatDate, swalImg, swalWithBootstrapButtons, toIDR } from "../helpers";
import { isValidInputTimeValue } from "@testing-library/user-event/dist/utils";
import Skeleton from "react-loading-skeleton";

export default function DetailPage() {
  // 
  const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productReducer);
  const { isLoadingSubmit, user } = useSelector((state) => state.globalReducer);
  const { isLoading, provinces, cities } = useSelector((state) => state.globalReducer);

  const [cart, setCart] = useState({
    origin: null,
    destination: null,
    weight: 1000,
    courier: 'jne',
    quantity: 1,
    ProductId: null,
  });

  useEffect(() => {
    dispatch(fetchProduct(id));
    if (localStorage.getItem('access_token')) dispatch(fetchUser());
  }, []);

  useEffect(() => {
    const setUp = async () => {
      const orig = product.User?.Addresses.find(v => v.default === true);
      const dest = user ? user.Addresses.find(v => v.default === true) : null;
      // setCart({ ...cart, origin: orig.cityId, destination: dest.cityId, ProductId: product.id })
      setCart({ ...cart, ProductId: product.id })
    }
    setUp()
  }, [product, user]);

  const addCartHandler = async (e) => {
    try {
      e.preventDefault();
      if (!localStorage.getItem('access_token')) {
        swalWithBootstrapButtons.fire({
          title: '"Silahkan login dahulu"',
          icon: 'warning',
          timer: 3000,
        });
        return;
      }

      console.log(cart);
      const resp = await dispatch(postCart(cart));
      // const respJSON = await resp.json();
      console.log(resp);
      // Add process cart
      // dispatch(courierCost(cart)).then((resp) => {
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
      // });
    } catch (error) {
      console.log(error);
    }
  }

  const renderChat = (e) => {
    e.preventDefault()
    if (!localStorage.getItem('access_token')) {
      swalWithBootstrapButtons.fire({
        title: '"Silahkan login dahulu"',
        icon: 'warning',
        timer: 3000,
      });
      return;
    }
    navigate(`/chat/${product.User.id}`)
  }

  const incrementHandler = () => {
    if (cart.quantity >= product.stock) return;
    setCart({ ...cart, ['quantity']: cart.quantity + 1, weight: cart.weight + 1000 });
  }

  const decrementHandler = () => {
    if (cart.quantity <= 1) return;
    setCart({ ...cart, ['quantity']: cart.quantity - 1, weight: cart.weight - 1000 });
  }

  const handleChange = (e) => {
    console.log(e);
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    if (name === 'quantity' && (value > product.stock || value < 1)) return;
    setCart({ ...cart, [name]: value });
  }

  return (
    <div id="DetailPage">
      <Breadcumb product={product} />
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
                {
                  user && user.id !== product.User.id ?
                    <div className="detail-cart-action">
                      <button
                        id="openChat"
                        className="btn custom-btn-1"
                        style={{ marginTop: 0 }}
                        onClick={renderChat}
                      >
                        <span className="material-symbols-outlined">chat</span>
                        <span>Chat</span>
                      </button>
                    </div> :
                    <></>
                }
              </div>
            </div>
            <div className="detail-sender">
              <span>Pengiriman</span>
              <div>
                <span className="material-icons" style={{ marginLeft: "-3px" }}>
                  location_on
                </span>
                <p>
                  Dikirim dari &nbsp;
                  <span>
                    {
                      isLoading ? <Skeleton /> : product.User?.Addresses.find(v => v.default === true)?.city
                    }
                  </span>
                </p>
              </div>
              <div>
                <span className="material-icons">local_shipping</span>
                <p>Ongkos kirim ekonomis</p>
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
                  {/* <h6 className="detail-cart-title">Atur Pengiriman</h6>
                  <div className="group-input mt-3 mb-3">
                    <select
                      name="courier"
                      className="form-select"
                      aria-label="Default select example"
                      value={cart.courier}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="jne">JNE</option>
                      <option value="pos indonesia">Pos Indonesia</option>
                      <option value="jne">TIKI</option>
                    </select>
                  </div> */}
                  <h6 className="detail-cart-title">Atur Jumlah</h6>
                  <div className="group-input">
                    <button
                      type="button"
                      className="btn min"
                      onClick={() => decrementHandler()}
                    >
                      <span className="material-symbols-outlined">remove</span>
                    </button>
                    <input
                      className="form-control stock"
                      name="quantity"
                      value={cart.quantity}
                      min={0}
                      max={product.stock}
                      onChange={(e) => handleChange(e)}
                    />
                    <button
                      type="button"
                      className="btn add"
                      onClick={() => incrementHandler()}
                    >
                      <span className="material-symbols-outlined">add</span>
                    </button>
                    <div className="detail-stock">
                      Stock:
                      {isLoading ? <Skeleton /> : <span> {product.stock}</span>}
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
                    {product.price ? <span>{toIDR(cart.quantity * product.price)}</span> : <></>}
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
