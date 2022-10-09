import "../css/navbar.css";
import logo from "../logo.png";
export default function Navbar(props) {
  const { jumbotron } = props;
  return (
    // <header>
    <>
      <nav className="navbar-sticky">
        <div className="container">
          <div className="navbar-wrapper">
            <a className="nav-logo">
              <img src={logo} />
            </a>
            <div className="dropdown-container">
              <button className="cat-dropdown btn">Category</button>
            </div>
            <form className="input-group global-search">
              <input
                type="text"
                className="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button className="btn" type="button">
                  <span className="material-symbols-outlined">search</span>
                </button>
              </div>
            </form>
            {/* <div className=" collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto ">
                <li className="nav-item">
                  <a
                    className="nav-link mx-2 text-uppercase active"
                    aria-current="page"
                    href="#"
                  >
                    Offers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-2 text-uppercase" href="#">
                    Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-2 text-uppercase" href="#">
                    Catalog
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-2 text-uppercase" href="#">
                    Services
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-2 text-uppercase" href="#">
                    About
                  </a>
                </li>
              </ul>
            </div> */}
            <div className="navbar-menu">
              {/* <a>
                <span className="material-symbols-outlined">
                  shopping_cart
                </span>
              </a>
              <a>
                <span className="material-symbols-outlined">
                  shopping_cart
                </span>
              </a> */}
            </div>
          </div>
        </div>
      </nav>
      <header>{jumbotron && <div className="jumbotron"></div>}</header>
    </>
  );
}
