import Contact from "./components/content.jsx";
import Register from "./components/Registeration";


import { Await, BrowserRouter, json } from "react-router-dom";
import Login from "./components/Login";
import Navbar from "./Navbar";
import "../src/navbar.scss";
import React, { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import Adminstatus from "./components/Adminstatus.js";
import "../src/App.css";

// import buildHasuraProvider from 'ra-data-hasura';
// import { Admin, Resource } from 'react-admin';

import simpleRestProvider from "ra-data-simple-rest";
import lb4Provider from "react-admin-lb4";

import { Status } from "./components/Status";
import { Admin, LoginForm, Resource } from "react-admin";
// import Track from "./components/Track";

// import { UserList, UserEdit, UserCreate } from "./Users";
// import { PostList, PostEdit, PostCreate } from "./Post";
// import { AuthProvider } from "./context/AuthContext.js";
// import jsonServerProvider from "ra-data-json-server";
// const dataProvider = jsonServerProvider("http://localhost:1000");

import Signup from "./components/Signup.js";

import LoginF from "./components/LoginF.js";
import authService from "./context/auth.server.js";

// let userdata=[];

//  const data =simpleRestProvider("http://localhost:1000/userdata")
// console.log(data)

// const dataProvider = jsonServerProvider(userdata);
// console.log(dataProvider)

// console.log(userdata)

// const baseURL = "http://localhost:1000/userdata";

// if (!post) return null;

// let userName = localStorage.getItem("name") ? localStorage.getItem("name") : "";

let name_logout = localStorage.getItem("user")
  ? localStorage.getItem("user")
  : "";

var token = JSON.parse(localStorage.getItem("user"));
// console.log(token?.role)
var role = token?.role;
function App() {
  const [admindata, setadmindata] = useState();

  const [currentUser, setcurrentUser] = useState(undefined);
  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setcurrentUser(user);
    }
    if (role == "user") {
      setadmindata(role);
    }
  }, []);
  const logOut = () => {
    authService.logout();
  
  };
  setTimeout(() => {
    authService.logout();  

}, 3600000);
  return (
    <div className="App">
      {/* <link to="/" className="nav-link">
</link> */}

      {/* <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}> */}
      {/* <Router>
  <AuthProvider>
    <Routes>
      
    <Route exact path="/signup" element={<Signup/>}/>
    <Route exact path="/" element={<Contact/>}/>
  <Route exact path="/login" element={<LoginF/>}/>

    </Routes>
    
  
  </AuthProvider>
  </Router> */}

      {/* </div>
        </Container> */}

      {/* <Admin dataProvider={dataProvider}>
    <Resource
    name="userdata"
    list={PostList}
    
    edit={PostEdit}
    create={PostCreate}    
    />
  </Admin> */}
      <BrowserRouter>
        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light"> */}
     
            
              {/* <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li> */}
                  {/* <nav  className="nav"> */}
        

        {/* <Link to="/" className="site-title">
         E&E
        </Link> */}
        {/* <ul>
          <CustomLink to="/">Form</CustomLink>
          <CustomLink to="/CheckStatus">Status</CustomLink>
        </ul>
      </nav> */}
<ul className="ulapp">

              {currentUser && (
          
  
                <li className="active">
                  <Link to={"/"} className="nav-link">
                    HOME
                {/* <img src="https://media-exp1.licdn.com/dms/image/C560BAQHZ36eqffoDbw/company-logo_200_200/0/1607066793624?e=2147483647&v=beta&t=oemfKLWsSWsCijZfnFaCdAOH5z_we7ptWJXSvHV1O9k"/> */}
                  </Link>
                </li>

              
              )}
  
            {currentUser ? (
        



       
                <li className="nav-item">
                  <a href="/login" className="logout" onClick={logOut}>
                    Logout
                  </a>
                </li>
               
           
           
            ) : (
           <ul>

         
                {/* <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li> */}

                {/* <li className="nav-item">
                  <Link to={"/signup"} className="nav-link">
                    Sign up
                  </Link>
                </li> */}
                </ul>
            )}
      
      </ul>
        <Routes>
          {/* <Route path="signup" element={ <Signup />} /> */}
          {/* <Route path="/login" element={ <LoginF />} />  */}

          {/* <Route path="/" element={name_logout == "" ? <LoginF /> : <Contact />} /> */}

          <Route
            path="/contact"
            element={admindata == "admin" ? <Status /> : <Contact />}
          />
          <Route
            path="/signup"
            element={   <Signup />}
            //   name_logout != "" ? (
            //     <Navigate to="/" replace={true} />
            //   ) : (
             
            //   )
            // }
          />
          <Route
            path="/Login"
            element={
              name_logout != "" ? (
                <Navigate to="/" replace={true} />
              ) : (
                <LoginF />
              )
            }
          />

          <Route
            path="CheckStatus"
            element={
              name_logout != "" ? (
                <Status />
              ) : (
                <Navigate to="/Login" replace={true} />
              )
            }
          ></Route>
          <Route path="Navbar" element={<Navbar />}></Route>
          <Route
            path="/"
            element={
              admindata ? (
                <Contact />
              ) : (
                <Navigate to="/CheckStatus" replace={true} />
              )
            }
          />
          <Route path="/admin" element={<Adminstatus />} />
          {/* <Route path="/status" element={ currentUser =="" ? <Login />:<Status /> } />  */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// export default jsonServerProvider('http://localhost:1000/userdata')
