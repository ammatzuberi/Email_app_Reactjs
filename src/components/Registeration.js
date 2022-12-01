import { useState } from "react";
import React from "react";
import { Alert } from "bootstrap";
import Login from "./Login";

// import "./login.css";

function Register() {
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(false);
  const [login, setlogin] = useState(true);


  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      setFlag(true);
    } else {
      setFlag(false);
    //   alert("Registration Successfull");

      var userinput = JSON.parse(localStorage.getItem("userdata") || "[]");
      if (
        userinput.some((v) => {
          return v.email == email;
        })
      ) {
        alert(" User Already Found");
      } else {
        var user = {
          name: name,
          email: email,
          password: password,
        };
        userinput.push(user);

        console.log(user);
        localStorage.setItem("userdata", JSON.stringify(userinput));

      alert("Data is saved ");
        setlogin(!login);
      }
    }
  }
  function handleClick() {
    // setlogin(!login);
    window.location.href = "Login";
  }

  return (
    <div>
      {login ? (
        <div className="container">
          <div className="left">
            <div className="header">
              <div className="outer">
                <div className="inner">
                  <form onSubmit={handleSubmit}>
                    <h1 className="hedername"> Registration</h1>
                    <div className="form-group">
                      <label> Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="enter full name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label> Email</label>
                      <input
                        type="Email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label> Password</label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="enter full name"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btnregister"
                    >
                      {" "}
                      Register
                    </button>
                    <p onClick={handleClick} className="forgot-password">
                      {" "}
                      Already Have A Account LOGIN IN{" "}
                    </p>

                    {flag && (
                      <Alert color="primary" variant="danger">
                        Please Fill Every Filed
                      </Alert>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="right"></div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
export default Register;
