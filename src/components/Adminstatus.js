import React, { useState ,useEffect } from 'react'
import Navbar from '../Navbar'
import axios from 'axios';
import { Await } from 'react-router-dom';

export default function Adminstatus() {
    const [Admindata, Setadmindata]=useState([]);

const url="http://localhost:5000/issue/getUserIssues"

const token=JSON.parse(localStorage.getItem("user"));
const newtoken=token.token
console.log(newtoken)


   
    const getdata=async()=>{
        const {admindata}= await axios.get(url,{headers: {
            "x-api-key": newtoken,
            Accept: "application/json",
            "Content-Type": "application/json",
          }});
          console.log(admindata)
        //   Setadmindata(admindata.data)
    }
    useEffect(() => {
        getdata();  
 
      }, []);
    
  return (
    <div>
            <Navbar />
            <h1>hello from admin</h1>
    </div>
  )
}

