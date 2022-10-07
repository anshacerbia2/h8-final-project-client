import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Template() {
  const jumbotron = false;
  return (
    <>
      <div className="container">
        {/* <Navbar jumbotron={jumbotron} /> */}
        <Outlet />
        <Footer />
      </div>
    </>
  );
}
