import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div
        className="container-fluid header"
        style={{ padding: "15px 0", color: "#fafafa" }}
      >
        <div className="container d-flex justify-content-between">
          <h5 style={{ color: "#fafafa" }}>TASK MANAGEMENT SYSTEM</h5>
          <button
            style={{ width: "200px", marginLeft: "10px" }}
            className="btn btn-danger"
          >
            <Link to="/login">
              <span className="templink"> Logout </span>
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
