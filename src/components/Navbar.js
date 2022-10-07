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
            <form class="input-group global-search">
              <input
                type="text"
                class="form-control"
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div class="input-group-append">
                <button class="btn" type="button">
                  <span class="material-symbols-outlined">search</span>
                </button>
              </div>
            </form>
            {/* <div class=" collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav ms-auto ">
                <li class="nav-item">
                  <a
                    class="nav-link mx-2 text-uppercase active"
                    aria-current="page"
                    href="#"
                  >
                    Offers
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link mx-2 text-uppercase" href="#">
                    Products
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link mx-2 text-uppercase" href="#">
                    Catalog
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link mx-2 text-uppercase" href="#">
                    Services
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link mx-2 text-uppercase" href="#">
                    About
                  </a>
                </li>
              </ul>
            </div> */}
            <div className="navbar-menu">
              {/* <a>
                <span class="material-symbols-outlined">
                  shopping_cart
                </span>
              </a>
              <a>
                <span class="material-symbols-outlined">
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
