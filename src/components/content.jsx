import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
// import styled from "styled-components";
import Navbar from "../Navbar";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import authService from "../context/auth.server";

import "./login.css";
import axios from "axios";
// import { Logout } from "react-admin";

// npm i @emailjs/browsers
const url = "http://localhost:5000/issue/addIssue";



const Contact = () => {
  var tkn = JSON.parse(localStorage.getItem("user"));
console.log(tkn.token);
var newtoken = tkn.token;
  // const [currentUser]=useAuth()
  // const [error, seterror]=useState('')
  // const {currentUser, logout}=useAuth()
  // const signout=useNavigate()

  const [data, setData] = useState({
    name: "",
    email: "",
    date: "",
    supervisor: "",
    productType: "",
    need: "",
    department: "",
    remarks: "",
  });

  const statuscheck = () => {
    window.location.href = "/CheckStatus";
  };

  function handlesubmit() {
    authService.logout();

    // let name_logout = localStorage.getItem("name")
    //     ? localStorage.getItem("name")
    //     : "";

    //   // console.log(name_logout)
    //   if (name_logout == "") {
    //     alert("you need to login first ");
    //     window.location.href = "login.js";
    //   }

    //   if (window.confirm("Are Your Sure Logout?")) {
    //     window.location.href = "/";
    //     localStorage.removeItem("name");
    //     localStorage.removeItem("email");
    //   } else {
    //     // window.location.href="productDetail.html"
    //   }
  }
  //  async function handlesubmit(){
  // seterror('')
  // try{
  //   await logout()
  //   signout('/login')

  // }catch{

  //   seterror('cannot logout  at this point..')
  // }

  //   }

  //   let name_logout = localStorage.getItem("name")
  //     ? localStorage.getItem("name")
  //     : "";

  //   // console.log(name_logout)
  //   if (name_logout == "") {
  //     alert("you need to login first ");
  //     window.location.href = "login.js";
  //   }

  //   if (window.confirm("Are Your Sure Logout?")) {
  //     window.location.href = "/";
  //     localStorage.removeItem("name");
  //     localStorage.removeItem("email");
  //   } else {
  //     // window.location.href="productDetail.html"
  //   }
  // };

  const form = useRef();

  const sendEmail = (e) => {
    console.log(url);
    e.preventDefault();
    axios
      .post(url, {
        name: data.name,
        email: data.email,
        supervisor: data.supervisor,
        productType: data.productType,
        need: data.need,
        department: data.department,
        remarks: data.remarks,
      },{headers: {
        "x-api-key": newtoken,
        Accept: "application/json",
        "Content-Type": "application/json",
      }})
      .then((res) => {
        console.log(res.data);
        alert("message sent Successfully ");
      });

    emailjs
      .sendForm(
        "service_fpz5ptg",
        "template_pbjoze8",
        form.current
        // "_yDzJGOuSBKs1Sqg5"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("message sent ");
          window.location.href = "/";
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata); 
    console.log(newdata);
  }
  return (
    <>
      <Navbar />
      {/* <div class="container text-center"> */}

      {/* </div> */}
      {/* <strong className="welcomemessage">Welcome: 
        {currentUser.email}
      </strong> */}

      {/* <p className="welcomemessage"> Welcome: {localStorage.getItem("user")}</p> */}

      <button onClick={handlesubmit} className="logout">
        LOGOUT
      </button>
      <div className="">
        {/* <h1>hello</h1> */}
        <form ref={form} onSubmit={sendEmail} className="content">
          {/* <button onClick={handlesubmit}>LOGout</button> */}
          <div className="row">
            <h2 className="headingform"> E&E PRODUCT FORM </h2>
          </div>
          <div className="row">
            <div className="col">
              <label>Name</label>
              <input
                onChange={(e) => handle(e)}
                value={data.name}
                id="name"
                type="text"
                name="to_name"
                required
                className="form-control"
                placeholder="Please Enter Your Name"
              />
            </div>
            <div className="col">
              <label>Email</label>
              <input
                onChange={(e) => handle(e)}
                value={data.email}
                id="email"
                type="email"
                name="from_name"
                required
                className="form-control"
                placeholder="Please Enter Your Email"
              />
            </div>
            <div className="col">
              <label>Date</label>
              <input
                onChange={(e) => handle(e)}
                value={data.date}
                id="date"
                type="date"
                required
                className="form-control"
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label>Supervisor</label>
              <select
                className="form-control"
                onChange={(e) => handle(e)}
                value={data.supervisor}
                id="supervisor"
                name="head"
              >
                <option> --Select--</option>
                <option name="head">Shah Saud Abdali</option>
                <option name="head">Syed Abu Rehan</option>
                <option name="head">Sabir Ahmed Shamoo</option>
              </select>
            </div>

            <div className="col">
              <label>Product Type</label>
              <select
                className="form-control"
                onChange={(e) => handle(e)}
                value={data.productType}
                name="P_Name"
                id="productType"
              >
                <option> --Select--</option>
                <option name="P_Name">LAPTOP</option>
                <option name="P_Name">DESKTOP</option>
                {/* <input  type ="text " name="P_Name"  ></input> */}
              </select>
              {/* <input
              type="text"
              name="P_Name"
              required
              className="form-control"
              placeholder="Enter type. Laptop, Desktop etc "
            /> */}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Need </label>
              <select className="form-control">
                <option> --Select--</option>
                <option name="need">ITEM </option>
                <option name="need">ASSIST </option>
              </select>
              <input
                onChange={(e) => handle(e)}
                value={data.need}
                name="need"
                id="need"
                type="text"
                className="form-control"
                placeholder="Enter  Your Need. "
                required
              />
            </div>
          </div>

          {/* <label>Quantity</label>
            <input
              type="number"
              className="form-control"
              placeholder="how much Quantity Needed"
              name="quantity"
              required
            /> */}

          <div className="row">
            <div className="col">
              <label>Department </label>
              <select
                className="form-control"
                onChange={(e) => handle(e)}
                value={data.department}
                id="department"
                name="Department"
              >
                <option> --Select--</option>
                <option name="Department">PIEZO</option>
                <option name="Department">R&D (IT)</option>
                <option name="Department">Sale & Finance </option>
                <option name="Department">SITE ENGINEER </option>
              </select>
            </div>

            {/* <input
              type="text"
              name="Department"
              className="form-control"
              placeholder="Enter Your Department "
              required
            /> */}

            {/* <input
              type="text"
              className="form-control"
              placeholder="Please Enter Your Head Name"
              name="head"
              required
            /> */}
            <div className="col">
              <label> Remarks</label>
              <textarea
                onChange={(e) => handle(e)}
                value={data.remarks}
                id="remarks"
                name="message"
                className="form-control"
                placeholder="Enter Details.."
                required
              />
            </div>

            <input
              type="submit"
              className="btnsumbit"
              value="Send For Approval "
            />
          </div>
        </form>
      </div>

      {/* <div className="img"> </div> */}
      {/* </div> */}
    </>
  );
};

export default Contact;
