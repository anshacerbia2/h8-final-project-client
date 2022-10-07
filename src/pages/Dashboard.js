import '../css/dashboard.css';
import avatar from '../avatar.jpg'

export default function Dashboard() {
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
              <a>Bioata Diri</a>
              <a>Daftar Alamat</a>
            </div>
            <div className="dc-body">

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}