import { Link } from "react-router-dom"

export default function Breadcumb(props) {
  return (
    <div className="detail-navbar">
      <div className="container">
        <div className="detail-navbar-wrapper">
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
          /
          <a>{props.product?.SubCategory.name}</a>
          /
          <a>{props.product?.name}</a>
        </div>
      </div>
    </div>
  )
}
