import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (userName !== "" && password !== "") {
      try {
        const log = await axios.post("/auth/register", { userName, password });
        console.log(log);
        if (log.data?.success) {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="page">
      <form onSubmit={handelSubmit}>
        <center>
          <h1 className="alignItemCenter">Register</h1>
        </center>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <br></br>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br></br>
        <div className="form-group ">
          <p>
            {" "}
            <Link to="/login">Already have a account</Link>
          </p>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
