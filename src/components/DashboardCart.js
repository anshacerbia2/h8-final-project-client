import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { toIDR } from "../helpers";
import { decCart, fetchCarts, fetchUser, incCart, postCharge } from '../store/actions';
import PaymentModal from "./PaymentModal";

export default function DashboardCart() {
  const dispatch = useDispatch();
  const { user, carts } = useSelector(state => state.globalReducer);
  const [courier, setCourier] = useState('jne');
  let total = 0;
  carts.forEach(v => total += (v.quantity * v.Product.price));
  const qty = carts.reduce((total, obj) => total + obj.quantity, 0);
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    dispatch(fetchCarts());
    dispatch(fetchUser());
  }, []);

  const incCartHandler = async (id) => {
    try {
      const resp = await dispatch(incCart(id));
      if (resp.status === 200) await dispatch(fetchCarts());
    } catch (error) {
      console.log(error);
    }
  }

  const decCartHandler = async (id) => {
    try {
      const resp = await dispatch(decCart(id));
      if (resp.status === 200) await dispatch(fetchCarts());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="DashboardCart">
      <div className="custom-row-1">
        <div
          style={{
            width: 'calc(100% - 240px)',
            margin: '0 10px'
          }}
        >
          <div className="dc-cart-content">
            {
              carts.length ?
                carts.map((cart, i) => {
                  return (
                    <div className="cart-card" key={'cart-' + cart.id} style={{ marginTop: i === 0 ? 0 : '' }}>
                      <div className="cart-card-author">
                        <img src={cart.User?.avatar} style={{ borderRadius: 15, width: 30, minWidth: 30, height: 30, minHeight: 30, objectFit: 'cover', objectPosition: 'center' }} />
                        <span style={{ marginLeft: '12px', fontWeight: '600', fontSize: 13 }}>{cart.User?.fName + ' ' + cart.User?.lName}</span>
                      </div>
                      <div div className="custom-row-1" style={{ width: '100%', left: 0 }}>
                        <div className="cart-img">
                          <img src={cart.Product?.mainImg} />
                        </div>
                        <div className="cart-content">
                          <span className="cart-name">{cart.Product?.name}</span>
                          <span className="cart-price">{toIDR(cart.Product?.price)}</span>
                          <div className="cart-action-container" style={{ alignSelf: 'flex-end' }} >
                            <button className="btn" onClick={() => decCartHandler(cart.id)}>
                              <span className="material-symbols-outlined">remove</span>
                            </button>
                            <div style={{ fontWeight: '700' }}>{cart.quantity}</div>
                            <button className="btn" onClick={() => incCartHandler(cart.id)}>
                              <span className="material-symbols-outlined">add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
                :
                <></>
            }
          </div>
        </div>
        <div
          style={{
            minWidth: 200,
            width: 200,
            margin: '0 10px'
          }}
        >
          <form>
            <h6 className="detail-cart-title">Atur Pengiriman</h6>
            <div className="group-input mt-3 mb-3 select-courier">
              <select
                name="courier"
                className="form-select"
                aria-label="Default select example"
                value={courier}
                onChange={(e) => setCourier(e.target.value)}
              >
                <option value="jne">JNE</option>
                <option value="pos indonesia">Pos Indonesia</option>
                <option value="jne">TIKI</option>
              </select>
            </div>
            <h6 className="detail-cart-title">Total Harga<span style={{ fontSize: 13, fontWeight: 500 }}> (&nbsp;{qty} product)</span></h6>
            <p style={{ color: '#696969', fontWeight: '900' }}>{toIDR(total)}</p>
            <PaymentModal
              show={modalShow}
              // carts={carts}
              onHide={() => setModalShow(false)}
            />
            <div className="detail-cart-action">
              <button
                id="openChat"
                type="button"
                className="btn custom-btn-1"
                onClick={() => carts.length ? setModalShow(true) : null}
              >
                <span>Beli Sekarang</span>
              </button>
            </div>
          </form>



        </div>
      </div>
    </div >
  )
}
