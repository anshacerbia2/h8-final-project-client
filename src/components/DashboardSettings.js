import '../css/dashboard.css';
import avatar from '../avatar.jpg'

export default function DashboardSettings(props) {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div id="DashboardSettings">
      <div className="custom-row-1">
        <div
          style={{
            minWidth: 200,
            width: 200,
            margin: '0 10px'
          }}
        >
          <img src={avatar} style={{ width: '100%', borderRadius: 2 }} />
          <button className="btn custom-btn-1 dc-btn">Upload Image</button>
        </div>
        <div
          style={{
            width: 'calc(100% - 240px)',
            margin: '0 10px'
          }}
        >
          <div className="dc-settings-content">
            <p className="dc-tag">Data Diri</p>
            <p><span>Nama</span> :&nbsp;&nbsp; {user?.fName + ' ' + user?.lName}</p>
            <p style={{ marginBottom: 24 }}><span>Jenis Kelamin</span> :&nbsp;&nbsp; {user.gender ? user.gender : '-'}</p>
            <p className="dc-tag">Kontak</p>
            <p><span>Email</span> :&nbsp;&nbsp; {user.email ? user.email : '-'}</p>
            <p style={{ marginBottom: 24 }}><span>Nomor HP</span> :&nbsp;&nbsp; {user.phoneNumber ? user.phoneNumber : '-'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
