import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { formatDate, toIDR } from '../helpers';
import { fetchHistory } from '../store/actions';


export default function DashboardHistory() {
  const dispatch = useDispatch();
  const { histories } = useSelector(state => state.globalReducer);
  console.log(histories);
  // const [cart, setCart] = useState({
  //   origin: 501,
  //   destination: 114,
  //   weight: 1000,
  //   courier: 'jne',
  // });
  useEffect(() => {
    dispatch(fetchHistory());
  }, [])
  return (
    <div className="DashboardHistory">
      {
        histories.length ?
          histories.map(v => {
            return (
              <div className="history-row">
                <div className="hs-orderid">ID : &nbsp;{v.order_id ? v.order_id : ''}
                  {
                    v.transaction_status === 'settlement' ? <span className="hs-status">success</span> : <span className="hs-status" style={{ color: '#d7bb21' }}>pending</span>}
                </div>
                <small style={{ marginBottom: 12, display: 'inline-block' }}>Date : &nbsp;{formatDate(v.transaction_time)}</small>
                <div>
                  <span>Alamat tujuan : </span>
                  <p>{JSON.parse(v.shipping_address).address + ', ' + JSON.parse(v.shipping_address).city} &nbsp;<span>({JSON.parse(v.shipping_address).first_name + ' ' + JSON.parse(v.shipping_address).last_name})</span></p>

                </div>
                {
                  v.OrderItems.map(item => {
                    return (
                      <>
                        <p className="mb-2"><span className="hs-author">Seller : {item.author}</span></p>
                        <div className="hs-item">
                          <img src={item.itemImg} />
                          <div className="hs-item-content">
                            <p>{item.name}</p>
                            <p className="d-flex">
                              <span>{item.quantity} barang x {toIDR(item.price)} </span>
                              <span>Total belanja: <span style={{ fontSize: 16, fontWeight: '700' }}>{toIDR(item.price * item.quantity)}</span></span>
                            </p>
                          </div>
                        </div>
                      </>
                    )
                  })
                }




              </div>
            )
          })
          :
          <></>
      }
    </div>
  )
}
