import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "#3d3d3d",
        color: "#fff",
        fontFamily: "Lato",
        paddingTop: 70,
        paddingBotto: 30,
        fontSize: 14
      }}
    >
      <div className="container">
        <div className="custom-row-1">
          <div
            style={{ width: "calc(100%/3 - 20px)", margin: "0 10px" }}
          // style={{
          //   height: "30rem",
          //   width: 'calc(100%/3 - 20px)',
          //   backgroundColor: "#e8e8e8",
          //   paddingTop: "5rem",
          //   paddingLeft: "1rem",
          // }}
          >
            <h5>Agro Shop</h5>
            <p>
              We are company, Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Voluptates a doloremque quam, corporis illo quisquam eum.
            </p>
            <p>Jl. Cilandak 132, Jakarta Selatan</p>
            <p>+62 21 927-283-823</p>
            <p>agro@example.com</p>
          </div>
          <div
            style={{ width: "calc(100%/3 - 20px)", margin: "0 10px" }}
          // style={{
          //   height: "30rem",
          //   width: 'calc(100%/3 - 20px)',
          //   backgroundColor: "#e8e8e8",
          //   paddingTop: "5rem",
          //   paddingLeft: "1rem",
          // }}
          >
            <h5>Contact us</h5>
            <form action="" className="mt-3">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  aria-describedby="email"
                />
              </div>
              <div className="mb-3">
                <div className="form-group purple-border">
                  <textarea
                    className="form-control"
                    id="message"
                    rows="3"
                    placeholder="Message"
                  ></textarea>
                </div>
              </div>
              <button className="btn btn-sm btn-primary">Submit</button>
            </form>
          </div>
          <div
            style={{ width: "calc(100%/3 - 20px)", margin: "0 10px" }}
          // style={{
          //   height: "30rem",
          //   width: 'calc(100%/3 - 20px)',
          //   backgroundColor: "#e8e8e8",
          //   paddingTop: "5rem",
          //   paddingLeft: "1rem",
          // }}
          >
            <h5>Newsletter</h5>
            <p className="mt-3">
              Don't miss our latest news. Subscribe your email below
            </p>
            <form action="" className="">
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  aria-describedby="email"
                />
              </div>
              <button className="btn btn-primary btn-sm">Submit</button>
            </form>
          </div>
        </div>
        <p className="text-center py-4 mb-0">Copyright 2022 - Agro Shop</p>
      </div>
    </footer>
  );
};

export default Footer;
