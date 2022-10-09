import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { toIDR } from "../helpers";
import { decCart, fetchCarts, incCart } from '../store/actions';

export default function DashboardCart() {
  const dispatch = useDispatch();
  const { carts } = useSelector(state => state.globalReducer);

  useEffect(() => {
    dispatch(fetchCarts());
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
              carts.length && carts.map(cart => {
                return (
                  <div className="cart-card" key={'cart-' + cart.id}>
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


        </div>
      </div>
    </div>
  )
}
