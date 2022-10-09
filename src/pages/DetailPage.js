import '../App.css';
import '../css/detailPage.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, fetchProvinces } from "../store/actions";
import Breadcumb from '../components/Breadcumb';
import { formatDate, toIDR } from '../helpers';
import { isValidInputTimeValue } from '@testing-library/user-event/dist/utils';

export default function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useSelector((state) => state.productReducer);
  const { isLoading, provinces, cities } = useSelector((state) => state.globalReducer);
  const [province, setProvince] = useState('');
  const [inputVal, setInputVal] = useState({
    courier: '',
    province: '',
    city: '',
  });

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, []);

  // dispatch(fetchProvinces());
  const handleChange = (event) => {
    let name = event.currentTarget.name;
    let value = event.currentTarget.value;
    setInputVal({ ...inputVal, [name]: value });
  }

  return (
    <div id="DetailPage">
      <Breadcumb />
      <div className="container">
        <div className="custom-row-1">
          <div className="custom-col-2"
            style={{
              width: 'calc(27% - 20px)',
              margin: '10px'
            }}
          >
            <img className="detail-img" src={product.mainImg} />
          </div>
          <div className="custom-col-2"
            style={{
              width: 'calc(43% - 20px)',
              paddingLeft: '40px',
              margin: '10px'
            }}
          >
            <h3 className="detail-name">{product.name}</h3>
            <p className="detail-price">
              <span className="price">{toIDR(product.price)}</span>
              <span className="unit-price">/{product.unit}</span>
            </p>
            <p className="detail-info">Tanggal panen : &nbsp;{formatDate(product.harvestDate ? product.harvestDate : '')}</p>
            <p className="detail-desc">
              {product.description}
            </p>
            <div className="detail-seller">
              <div className="detail-seller-header">
                <img src={product.User?.avatar} />
                <div style={{ flexGrow: 1 }}>
                  <h6 className="mb-0">{product.User?.fName + ' ' + product.User?.lName}</h6>
                </div>
                <div className="detail-cart-action" >
                  <button id="openChat" className="btn custom-btn-1" style={{ marginTop: 0 }}>
                    <span className="material-symbols-outlined">
                      chat
                    </span>
                    <span>Chat</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="detail-sender">
              <span>Pengiriman</span>
              <div>
                <span className="material-icons" style={{ marginLeft: '-3px' }}>
                  location_on
                </span>
                <p>Dikirim dari <span>{product.User?.Addresses[0].city}</span></p>
              </div>
              <div>
                <span className="material-icons">
                  local_shipping
                </span>
                <p>Ongkos kirim ekonomis Rp.18.000</p>
              </div>
            </div>
          </div>
          <div className="custom-col-2"
            style={{
              width: 'calc(30% - 20px)',
              paddingLeft: '20px',
              margin: '10px'
            }}
          >
            <div className="detail-cart">
              <div className="detail-cart-form-wrapper">
                <form>
                  <h6 className="detail-cart-title">Atur Pengiriman </h6>
                  <div className="group-input mb-3">
                    <select
                      name="courier"
                      className="form-select"
                      aria-label="Default select example"
                      // value={inputVal.courier}
                      onChange={() => handleChange()}
                    >
                      <option value="">Pilih Kurir</option>
                      <option value="1">JNE</option>
                      <option value="2">Pos Indonesia</option>
                      <option value="3">TIKI</option>
                    </select>
                  </div>
                  {
                    provinces.length !== 0 && (
                      <div className="group-input mb-3">
                        <select
                          name="courier"
                          className="form-select"
                          aria-label="Default select example"
                          // value={inputVal.courier}
                          onChange={() => handleChange()}
                        >
                          <option value="">Pilih Provinsi</option>
                          <option value="jne">JNE</option>
                          <option value="pos">Pos Indonesia</option>
                          <option value="tiki">TIKI</option>
                        </select>
                      </div>

                    )
                  }
                  <div className="group-input mb-3">
                    <select
                      name="courier"
                      className="form-select"
                      aria-label="Default select example"
                      // value={inputVal.courier}
                      onChange={() => handleChange()}
                    >
                      <option value="">Pilih Kota</option>
                      <option value="1">JNE</option>
                      <option value="2">Pos Indonesia</option>
                      <option value="3">TIKI</option>
                    </select>
                  </div>
                  <h6 className="detail-cart-title">Atur Jumlah</h6>
                  <div className="group-input">
                    <button type="button" className="btn min">
                      <span className="material-symbols-outlined">
                        remove
                      </span>
                    </button>
                    <input className="form-control stock" value={1} />
                    <button type="button" className="btn add">
                      <span className="material-symbols-outlined">
                        add
                      </span>
                    </button>
                    <div className="detail-stock">
                      Stock: <span>660</span>
                    </div>
                  </div>
                  <small style={{ fontFamily: 'Lato', fontSize: '12px', color: '#666666' }}>Max. pembelian 660 kg</small>
                  <p className="total-cart">
                    <span>Subtotal</span>
                    <span>Rp. 16.000</span>
                  </p>
                  <div className="detail-cart-action">
                    <button id="openChat" className="btn custom-btn-1">
                      <span className="material-symbols-outlined" style={{ marginBottom: 0 }}>
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
  )
}