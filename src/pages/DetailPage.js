import '../App.css';
import Breadcumb from '../components/Breadcumb';
import '../css/detailPage.css';

export default function DetailPage() {
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
            <img className="detail-img" src={'https://cdn.shopify.com/s/files/1/0018/8327/5325/products/184710490.webp?v=1659441918'} />
          </div>
          <div className="custom-col-2"
            style={{
              width: 'calc(43% - 20px)',
              paddingLeft: '40px',
              margin: '10px'
            }}
          >
            <h3 className="detail-name">Tomat Super</h3>
            <p className="detail-price">
              <span className="price">Rp. 8000</span>
              <span className="unit-price">/kg</span>
            </p>
            <p className="detail-info">Tanggal panen: {new Date().toISOString().slice(0, 10)}</p>
            <p className="detail-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec erat luctus, vestibulum ante sodales, imperdiet est. Vivamus sodales mauris nisi. Etiam nec lacinia sem, nec dapibus eros. Cras sed turpis vitae odio posuere hendrerit viverra a sem. Phasellus neque ante, lacinia ut nibh in, pharetra accumsan ipsum. Nulla facilisi. Fusce consectetur malesuada metus, eget lobortis diam semper at. Etiam volutpat nec dui faucibus suscipit.
            </p>
            <p className="detail-desc">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis nec erat luctus, vestibulum ante sodales, imperdiet est. Vivamus sodales mauris nisi. Etiam nec lacinia sem, nec dapibus eros. Cras sed turpis vitae odio posuere hendrerit viverra a sem. Phasellus neque ante, lacinia ut nibh in, pharetra accumsan ipsum. Nulla facilisi. Fusce consectetur malesuada metus, eget lobortis diam semper at. Etiam volutpat nec dui faucibus suscipit.
            </p>
            <div className="detail-seller">
              <div className="detail-seller-header">
                <img src="https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dmlld3xlbnwwfHwwfHw%3D&w=1000&q=80" />
                <div style={{ flexGrow: 1 }}>
                  <h6>stevenalaq</h6>
                </div>
                <div className="detail-cart-action" >
                  <button id="openChat" className="btn custom-btn-1" style={{ marginTop: 0 }}>
                    <span class="material-symbols-outlined">
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
                <span class="material-icons" style={{ marginLeft: '-3px' }}>
                  location_on
                </span>
                <p>Dikirim dari <span>Jakarta Barat</span></p>
              </div>
              <div>
                <span class="material-icons">
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
                    <select class="form-select" aria-label="Default select example">
                      <option selected>Pilih kurir</option>
                      <option value="1">Ninja Express</option>
                      <option value="2">J&T</option>
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
                      <span className="material-symbols-outlined">
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