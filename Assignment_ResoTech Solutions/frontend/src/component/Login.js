import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (userName !== "" && password !== "") {
      try {
        const log = await axios.post("/auth/login", { userName, password });
        // console.log(log);
        if (log.data?.id) {
          navigate("/");
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
          <h1 className="alignItemCenter">Login</h1>
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
            <Link to="/register">Create A new account</Link>
          </p>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
