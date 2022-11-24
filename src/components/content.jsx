import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
// import styled from "styled-components";
import Navbar from "../Navbar";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import authService from "../context/auth.server";



import * as postmark from "postmark";
import "./login.css";
import axios from "axios";
import { email } from "react-admin";
// import { Logout } from "react-admin";

// npm i @emailjs/browsers
const url = "http://localhost:5000/issue/addIssue";
const get_email = "http://localhost:5000/issue/getUserIssues";
const postmarkEmail = "https://api.postmarkapp.com/email";

// var postmark = require("postmark");


var serverToken = "51d9f0ab-51f5-447e-9bd5-259a2db2f3f5";
var client = new postmark.ServerClient(serverToken);

const Contact = () => {
  var tkn = JSON.parse(localStorage.getItem("user"));
  var user_email = tkn?.userData?.email;
  console.log(tkn.userData.email);
  console.log(tkn.token);
  var newtoken = tkn.token;

  console.log();

  const [data, setData] = useState({
    name: "",
    email_user: "",
    date: "",
    supervisor: "",
    productType: "",
    need: "",
    department: "",
    remarks: "",
  });

  // console.log("email");
  const get_emailValue = () => {
    document.getElementById("email_user").value = user_email;
    let useremaildata = data;
    useremaildata.email_user = user_email;
    setData(useremaildata);
  };

  // console.log(document.getElementById("email_user"))
  // console.log(user_email)
  const statuscheck = () => {
    window.location.href = "/CheckStatus";
  };

  function handlesubmit() {
    authService.logout();
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
  var tkn = JSON.parse(localStorage.getItem("user"));
  // console.log(tkn.token);
  // console.log(tkn.role);
  var role = tkn.role;
  var newtoken = tkn.token;

  const form = useRef();

  useEffect(() => {
    get_emailValue();
  }, []);

  const postmarkMail = async (e) => {
    await axios
      .post(
        postmarkEmail,
        {
          From: "ammatzuberi@enggenv.com",
          To: "shehryarsmadil@enggenv.com",
          Subject: "Test",
          TextBody: "Hello from Postmark!",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Postmark-Server-Token": serverToken,
            "Access-Control-Allow-Origin": "*",
          },
        }
      )

      .then((res) => {
        console.log(res);
        alert("message sent form postmark ");
        window.location.href = "/CheckStatus";
      })
      // client
      //   .sendEmail({
      //     From: "ammatzuberi@enggenv.com",
      //     To: "ammatzuberi0@gmail.com",
      //     Subject: "Test",
      //     TextBody: "Hello from Postmark!",
      //   })
    

    var client = new postmark.ServerClient(serverToken);

    client.sendEmail({
      "From": "ammatzuberi@enggenv.com",
      "To": "shehryarsmadil@enggenv.com",
      "Subject": "Hello from Postmark",
      "HtmlBody": "<strong>Hello</strong> dear Postmark user.",
      "TextBody": "Hello from Postmark!",
      "MessageStream": "outbound"
    });
  };

  const sendEmail = (e) => {
    console.log(url);
    e.preventDefault();
    axios
      .post(
        url,
        {
          name: data.name,
          email: data.email_user,
          supervisor: data.supervisor,
          date: data.date,
          productType: data.productType,
          need: data.need,
          department: data.department,
          remarks: data.remarks,
        },
        {
          headers: {
            "x-api-key": newtoken,
            // "X-Postmark-Server-Token":serverToken,
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        alert("message sent Successfully ");
        window.location.href = "/CheckStatus";
      });
    client
      .sendEmail({
        From: "ammatzuberi@enggenv.com",
        To: "ammatzuberi0@gmail.com",
        Subject: "Test",
        TextBody: "Hello from Postmark!",
      })
      .then(
        (result) => {
          console.log(result.text);
          alert("message sent from postmark/ ");
        },
        (error) => {
          console.log(error.text);
          alert("an error occured while sending message");
        }
      );

    emailjs
      .sendForm(
        "service_fpz5ptg",
        "template_pbjoze8",
        form.current
        //  ,"_yDzJGOuSBKs1Sqg5"
      )

      .then(
        (result) => {
          console.log(result.text);
          alert("message sent ");
        },
        (error) => {
          console.log(error.text);
        }
      );
      postmarkMail();
  };

  function handle(e) {
    const newdata = { ...data };
    // newdata = { ...data, [e.target.id]: e.target.value };
    newdata[e.target.id] = e.target.value;
    // user_email=data;
    setData(newdata);
    console.log(newdata);
  }
  return (
    <>
      <Navbar />

      <div className="">
        {/* <h1>hello</h1> */}
        {/* <button onClick={postmarkMail}>boom </button> */}

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
                type="te  xt"
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
                id="email_user"
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


export default Contact;
