import React from "react";
import { useState } from "react";
import { Alert } from "bootstrap";
import Contact from "./content.jsx";
import Register from "./Registeration.js";
import "./login.css";
  let userName = localStorage.getItem("name")
  ? localStorage.getItem("name")
  : "";

function Login() {
  const [email, setEmaillog] = useState("");
  const [password, setPasswordlog] = useState("");
  const [flag, setFlag] = useState(false);
  const [contact, setContent] = useState(true);
  const [register, setRegister] = useState(true);
  var userinput = JSON.parse(localStorage.getItem("userdata")) || [];
  function handleSubmit(e) {
    e.preventDefault();
  

    if (
      userinput.some((v) => {
        return v.email == email && v.password == password;
      })
    ) {
      alert("login Successfull...");
      window.location.href = "/";

      var current_user = userinput.filter((v) => {
        return v.email == email && password == password;
      })[0];
      localStorage.setItem("name", current_user.name);
      localStorage.setItem("email", current_user.name);
      setContent(!contact);
      setFlag(false);
    } else {
      alert("login Fails....");
    }
  }

  function handleClick() {


  window.location.href = "Register";

    
  

  }

  return (
    <div>
      {contact ? (
        <div className="container">
          <div className="left">
            <div className="header">
              <div className="outer">
                <div className="inner">
                  <form onSubmit={handleSubmit}>
                    <h1 className="hedername"> Login</h1>

                    <div className="form-group">
                      <label> Email</label>
                      <input
                        type="Email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(event) => setEmaillog(event.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label> Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="enter password"
                        value={password}
                        onChange={(event) => setPasswordlog(event.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btnregister"
                    >
                      {" "}
                      Login
                    </button>
                    <p onClick={handleClick} className="forgot-password">
                      {" "}
                      Dont Have A Account Sign Up
                    </p>

                    {flag && (
                      <Alert color="primary" variant="danger">
                        Please Fill Correct Info.
                      </Alert>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="right" ></div>
    </div>
      ) : (
        <Contact />
      )}
    
    </div>
  );
}

export default Login;
