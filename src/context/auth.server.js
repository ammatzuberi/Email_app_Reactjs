import axios from "axios";
import { useState } from "react";
// import { email } from "react-admin";


var tkn ='';
const Api_url = "http://localhost:5000/user";
const signup = (email, password) => {
  return axios
    .post("http://localhost:5000/user/register", {
      email,
      password, 
    })
    .then((response) => {
    //   if (response.data.accessToken) { 
    //     localStorage.setItem("user", JSON.stringify(response.data));
    //   }
      return response.data;
    });
};
const login = (email, password) => {
  

  return axios
    .post(Api_url + "/login", {
      email,
      password,
    })
    .then((response) => {
        console.log(response)
   
      if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data  ;
    });
};
const logout = () => {
    localStorage.removeItem("user");
    window.location.href="/login";
  };
  
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };
  const token=()=>{

  }
  const authService = {
    token,
    signup,

    login,
    logout,
    getCurrentUser,
  };
  

export default authService;
