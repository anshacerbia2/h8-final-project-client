import React from "react";
import Footer from "../components/Footer";

const CustomerPage = () => {
  return (
    <>
      <main className="row">
        <div className="col">
          <h2>Customer Table</h2>
          <p>
            The .table class adds basic styling (light padding and horizontal
            dividers) to a table:
          </p>
          <table class="table">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John</td>
                <td>Doe</td>
                <td>john@example.com</td>
              </tr>
              <tr>
                <td>Mary</td>
                <td>Moe</td>
                <td>mary@example.com</td>
              </tr>
              <tr>
                <td>July</td>
                <td>Dooley</td>
                <td>july@example.com</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CustomerPage;
