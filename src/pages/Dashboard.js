import '../css/dashboard.css';
import cashAvatar from '../cash.png';
import avatar from '../avatar.jpg'
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import '../css/dashboard.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchProduct, deleteProduct, fetchSubCategories } from '../store/actions';
import 'react-loading-skeleton/dist/skeleton.css';
import { useLocation } from "react-router-dom";
import { swalWithBootstrapButtons } from '../helpers';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  const refs = useRef([]);
  const [l, setL] = useState(0);
  const [w, setW] = useState(0);

  useLayoutEffect(() => {
    let idx = 0;
    if (location.pathname === '/dashboard/settings') idx = 0;
    if (location.pathname === '/dashboard/address') idx = 1;
    if (location.pathname === '/dashboard/products') idx = 2;
    if (location.pathname === '/dashboard/cart') idx = 3;
    if (location.pathname === '/dashboard/history') idx = 4;
    if (location.pathname === '/dashboard/history-lelang') idx = 5;
    const w = refs.current[idx]?.clientWidth;
    const l = refs.current[idx]?.offsetLeft;
    setW(w);
    setL(l);
  }, [refs]);

  useEffect(() => {
    if (location.pathname === '/dashboard') navigate('/dashboard/settings');
    if (!localStorage.getItem('access_token')) navigate('/login');
    dispatch(fetchProducts())
    dispatch(fetchSubCategories())
  }, [])

  const changeDetailPage = (idx) => {
    const w = refs.current[idx].clientWidth;
    const l = refs.current[idx].offsetLeft;
    setW(w);
    setL(l);
    let path = 'settings';
    if (idx === 0) navigate('/dashboard/settings');
    if (idx === 1) navigate('/dashboard/address');
    if (idx === 2) navigate('/dashboard/products');
    if (idx === 3) navigate('/dashboard/cart');
    if (idx === 4) navigate('/dashboard/history');
    if (idx === 5) navigate('/dashboard/history-lelang');
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
    navigate(`/chat/${3}`)
  }

  return (
    <div id="DashboardPage">
      <div className="detail-navbar">
        <div className="container">
          <div className="detail-navbar-wrapper">
            <a>Dashboard</a>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="custom-row-1">
          <div className="dashboard-side">
            <div className="detail-seller-header" style={{
              height: 60, padding: 20, borderRadius: 30, marginBottom: 14,
              boxShadow: 'rgb(49 53 59 / 12%) 0px 1px 6px 0px'
            }}>
              <img src={avatar} />
              <div style={{ flexGrow: 1 }}>
                <h6 className="mb-0">{user?.fName + ' ' + user?.lName}</h6>
              </div>
            </div>
            <div style={{
              height: 60, padding: 20, borderRadius: 30,
              boxShadow: 'rgb(49 53 59 / 12%) 0px 1px 6px 0px', display: 'flex', alignItems: 'center', fontFamily: 'Lato', fontSize: 14, color: '#696969', fontWeight: 700
            }}>
              <img src={cashAvatar} style={{ marginTop: '-5px' }} />
              <span style={{ flexGrow: '1', marginLeft: 10 }}>Saldo</span>
              <span>0</span>
            </div>
            <div style={{
              height: 60, padding: 20, borderRadius: 30,
              boxShadow: 'rgb(49 53 59 / 12%) 0px 1px 6px 0px', display: 'flex', alignItems: 'center', fontFamily: 'Lato', fontSize: 14, color: '#696969', fontWeight: 700
            }}>
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
              </div>
            </div>
          </div>
          <div className="dashboard-content">
            <div className="dc-header">
              <span className="dc-header-active" style={{ width: w, left: l }}></span>
              <a
                ref={(element) => { refs.current[0] = element }}
                onClick={() => changeDetailPage(0)}
              >Bioata Diri</a>
              <a
                ref={(element) => { refs.current[1] = element }}
                onClick={() => changeDetailPage(1)}
              >Daftar Alamat</a>
              <a
                ref={(element) => { refs.current[2] = element }}
                onClick={() => changeDetailPage(2)}
              >Produk</a>
              <a
                ref={(element) => { refs.current[3] = element }}
                onClick={() => changeDetailPage(3)}
              >Keranjang</a>
              <a
                ref={(element) => { refs.current[4] = element }}
                onClick={() => changeDetailPage(4)}
              >Histori</a>
              <a
                ref={(element) => { refs.current[5] = element }}
                onClick={() => changeDetailPage(5)}
              >Histori Lelang</a>
            </div>
            <div className="dc-body">
              <Outlet />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}