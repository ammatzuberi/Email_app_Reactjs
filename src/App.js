






  import Contact from "./components/content.jsx";
  import Register from "./components/Registeration";
  import "../node_modules/bootstrap/dist/css/bootstrap.css";
  import { Await, BrowserRouter } from "react-router-dom";
  import Login from "./components/Login";
  import Navbar from "./Navbar";
  import React, { useEffect, useState } from "react";
  import { Container } from "react-bootstrap";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { BrowserRouter as Router,  Route,  Routes, Link ,Navigate} from "react-router-dom";
  import Adminstatus from "./components/Adminstatus.js";



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

  function App() {

    const [currentUser, setcurrentUser]=useState(undefined);
    useEffect(()=>{
      const user=authService.getCurrentUser();

      if(user){
        setcurrentUser(user);

      }
    },[]);
    const logOut = () => {
      authService.logout();
    };
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
  
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">
          {/* <li className="nav-item">
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </li> */}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
               Home
              </Link> 
            </li>
            
            
          )}
        </div>
    {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/signup"} className="nav-link">
                Sign up
              </Link>
            </li>
          </div>
        )}
      </nav>

  
          <Routes>
                        {/* <Route path="signup" element={ <Signup />} /> */}
                        {/* <Route path="/login" element={ <LoginF />} />  */}

          
            
             {/* <Route path="/" element={name_logout == "" ? <LoginF /> : <Contact />} /> */}

    <Route path="/contact" element={ name_logout =="" ? <LoginForm />:<Contact /> } /> 
        <Route
              path="/signup"
              element={
                name_logout != "" ? <Navigate to="/" replace={true} /> : <Signup />
              }
            />
            <Route
              path="/Login"
              element={
                name_logout != "" ? <Navigate to="/" replace={true} /> : <LoginF />
              }
            /> 
           
            <Route path="CheckStatus" element={name_logout!="" ? <Status />: <Navigate to="/Login" replace={true} /> }></Route>
            <Route path="Navbar" element={<Navbar />}></Route>
            <Route path="/" element ={name_logout!="" ? <Contact />: <Navigate to="/Login" replace={true} /> } /> 
            <Route path="/admin" element = {  <Adminstatus /> } /> 
            {/* <Route path="/status" element={ currentUser =="" ? <Login />:<Status /> } />  */}
          </Routes>
        </BrowserRouter>
      </div>
    );
  }



  export default App;

  // export default jsonServerProvider('http://localhost:1000/userdata')
