import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
              <div>
                {v.order_id ? v.order_id : ''}
              </div>
            )
          })
          :
          <></>
      }
    </div>
  )
}
