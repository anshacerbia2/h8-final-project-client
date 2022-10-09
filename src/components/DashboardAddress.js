import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchUser } from "../store/actions";
import FormAddAddress from "./FormAddAddress";


export default function DashboardAddress() {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.globalReducer);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div id="DashboardAddress">
      <FormAddAddress
        show={showModal}
        user={user ? user.id : null}
        onHide={() => setShowModal(false)}
      />
      <div style={{ width: 100 }}>
        <button className="btn custom-btn-1" onClick={() => setShowModal(true)}>
          <span className="material-symbols-outlined" style={{ fontSize: 18, marginRight: 2 }}>
            add
          </span>
          Address
        </button>
      </div>
      {
        user ? user.Addresses?.map(address => {
          return (
            <div className="address-card" key={'address-' + address.id}>
              <div div className="address-card-wrapper">
                {address.default && <span className="default-address">Utama</span>}
                <span className="address-name">{address.name}</span>
                <p className="full-address">
                  {address.street + ', '} <span>{address.city.toLowerCase() + ', '} {address.province.toLowerCase()}</span>
                </p>
              </div>
            </div>
          )
        })
          :
          <></>
      }
    </div >
  )
}
