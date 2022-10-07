import React from "react";

const Footer = () => {
  return (
    <footer className="row my-4">
      <div
        className="col"
        style={{
          height: "30rem",
          backgroundColor: "#e8e8e8",
          paddingTop: "5rem",
          paddingLeft: "1rem",
        }}
      >
        <h5>Agro Shop</h5>
        <p>
          We are company, Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Voluptates a doloremque quam, corporis illo quisquam eum.
        </p>
        <p>+62 21 927-283-823</p>
        <p>+62 21 927-283-823</p>
        <p>+62 21 927-283-823</p>
      </div>
      <div
        className="col"
        style={{
          height: "30rem",
          backgroundColor: "#e8e8e8",
          paddingTop: "5rem",
          paddingLeft: "1rem",
        }}
      >
        <h5>Contact us</h5>
        <form action="" className="mt-3">
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Email"
              aria-describedby="email"
            />
          </div>
          <div class="mb-3">
            <div class="form-group purple-border">
              <textarea
                class="form-control"
                id="message"
                rows="3"
                placeholder="Message"
              ></textarea>
            </div>
          </div>
          <button className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
      <div
        className="col"
        style={{
          height: "30rem",
          backgroundColor: "#e8e8e8",
          paddingTop: "5rem",
          paddingLeft: "1rem",
        }}
      >
        <h5>Newsletter</h5>
        <p className="mt-3">
          Don't miss our latest news. Subscribe your email below
        </p>
        <form action="" className="">
          <div class="mb-3">
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Email"
              aria-describedby="email"
            />
          </div>
          <button className="btn btn-primary btn-sm">Submit</button>
        </form>
      </div>
      <p className="text-center mt-4">Copyright 2022 - Agro Shop</p>
    </footer>
  );
};

export default Footer;
