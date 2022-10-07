import '../css/dashboard.css';
import avatar from '../avatar.jpg'
import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import '../css/dashboard.css';
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchProduct, deleteProduct, fetchSubCategories } from '../store/actions';
import 'react-loading-skeleton/dist/skeleton.css';
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const refs = useRef([]);
  const [l, setL] = useState(0);
  const [w, setW] = useState(0);

  useLayoutEffect(() => {
    let idx = 0;
    if (location.pathname === '/dashboard/settings') idx = 0;
    if (location.pathname === '/dashboard/cart') idx = 1;
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
    if (idx === 1) navigate('/dashboard/cart');
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
            <div className="detail-seller-header">
              <img src={avatar} />
              <div style={{ flexGrow: 1 }}>
                <h6 className="mb-0">stevenalaq</h6>
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