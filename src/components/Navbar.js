import '../css/navbar.css';
import logo from '../logo.png'
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
              <button className="cat-dropdown btn">
                Category
              </button>
              {/* <div className="dropdown-box">

              </div> */}
            </div>
            <form class="input-group global-search">
              <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2" />
              <div class="input-group-append">
                <button class="btn" type="button">
                  <span class="material-symbols-outlined">
                    search
                  </span>
                </button>
              </div>
            </form>
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
      <header>
        {
          jumbotron && (
            <div className="jumbotron">

            </div>
          )
        }
      </header>
    </>
  )
}