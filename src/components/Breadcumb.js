import { Link } from "react-router-dom"

export default function Breadcumb(props) {
  console.log(props.product);
  return (
    <div className="detail-navbar">
      {/* <div className="container">
        <div className="detail-navbar-wrapper">
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
          {
            props.product?.name ? (
              <>
                /
                <a>{props.product?.SubCategory.name}</a>
                /
                <a>{props.product?.name}</a>
              </>
            )
              :
              <></>
          }
        </div>
      </div> */}
    </div>
  )
}
