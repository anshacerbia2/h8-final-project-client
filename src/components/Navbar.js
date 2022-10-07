import logo from '../logo.png'
export default function Navbar(props) {
  const { jumbotron } = props;
  return (
    <header>
      <nav>
        <div className="container">
          <div className="navbar-wrapper">
            <a className="nav-logo">
              <img src={logo} />
            </a>

          </div>
        </div>
      </nav>
      {
        jumbotron && (
          <div className="jumbotron">

          </div>
        )
      }
    </header>
  )
}