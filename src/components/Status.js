import React, { useEffect } from "react";
import Navbar from "../Navbar";
import "./Track.css";
import axios from "axios";
import { useState } from "react";
import "../App.css";
import StepNavigation from "./stepNavigation";
const url = "http://localhost:5000/issue/getUserIssues";
// import Track from "./Track";

export const Status = () => {
  // const labelArray = [
  //   "Order Placed",
  //   "Waiting For Aproval",
  //   "Order is delivered",
  // ];

  var tkn = JSON.parse(localStorage.getItem("user"));
  // console.log(tkn.token);
  var newtoken = tkn.token;
  const [currentStep, updateCurrentStep] = useState(1);

  function updateStep(step) {
    updateCurrentStep(step);
  }
  const handlesubmit = () => {
    window.location.href = "/";
  };
  const [data, setdata] = useState([]);
  const [admindata, setadmindata] = useState([]);
  const [dataststus, setdatastatus] = useState([]);
  const [dataststus2, setdatastatus2] = useState([]);
  const [dataststus3, setdatastatus3] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(url, {
      headers: {
        "x-api-key": newtoken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // console.log(data[0].data)

    // setdata(data.data)
    setadmindata(data);

    var inside_data;

    var indata;

    data.forEach((i) => {
      // console.log(i.data);

      indata = i.data;
      setdatastatus2(indata);
      //  indata=  inside_data.data
      //  console.log(indata)

      // console.log({})
      // setadmindata(inside_data)
    });

    // setdatastatus(i)
  };

  const [posts, setPost] = useState([]);

  useEffect(() => {
    getData();
    // fetch(url,{headers: {
    //   "x-api-key": newtoken,
    //   Accept: "application/json",
    //   "Content-Type": "application/json",
    // }})
    //   .then((response) => response.json())
    //   .then((data) => setPost(data));

    // console.log(setPost(data))
  }, []);

  return (
    <>
      {/* {console.log(1)} */}
      <Navbar />

      <div>
        <div className="App">
          {/* <p className="welcomemessage">
            Welcome: {localStorage.getItem("name")}
          </p>

          <button onClick={handlesubmit} className="logout">
            LOGOUT
          </button> */}

          <h1> Your Status </h1>
        </div>
        <table className="table table-striped">
          {/* <div className="table"> </div> */}
          {/* <thead>
            <tr>
          
              <th>Name</th>
              <th>Email</th>
              <th>Supervisor</th>
              <th>ProductType</th>
              <th>NEED/ASSIST</th>
              <th>Department</th>
              <th>Remarks</th>
              <th>Status </th>
            </tr>
          </thead> */}
          {
            <thead>
              <tr className="tr">
                <th>Email</th>
                <th>Data</th>
              

                {/* <th>Email</th>
              <th>Supervisor</th>
              <th>ProductType</th>
              <th>NEED/ASSIST</th>
              <th>Department</th>
              <th>Remarks</th>
              <th>Status </th> */}
              </tr>
            </thead>
          }
          <tbody>
            {/* {data.map((post) => {
            
              return (
                
                <tr key={post.issueToken}>
               
                  <td> {post.name} </td>

                  <td> {post.email} </td>
                  <td> {post.supervisor} </td>
                  <td> {post.productType} </td>
                  <td> {post.need}</td>
                  <td>{post.department} </td>
                  <td>{post.remarks} </td>
                  <td >{post.status} </td>
                </tr>
              );
            })} */}
            {/* {dataststus.map((data, index)=>{
              console.log(data)
            })} */}

            {admindata.map((post, index) => {
              // console.log(post)
              // {post.map((data)=>{
              //   console.log(data)
              // })}
              return (
                <tr key={index}>
                  <td> {post.email} </td>
                  {post.data.map((newdata, index) => {
                       
                    return (
                

                     
                      <tr key={index}>
                 
                       
                
                          <td>  {newdata.name}</td>
                      
                           
                             <td>{newdata.need}</td>
                             <td>{newdata.issueToken}</td>
                             <td>{newdata.department}</td>
                             <td>{newdata.status}</td>
                              
                          </tr>
                
                    
                   
                   
                  
                    );
                  })}

                  {/* <td> {sub} </td> */}

                  {/* <td>{dataststus[0]}</td> */}
                  {/* <td> {post.issue} </td> */}
                </tr>
              );
            })}
            {/* {
  dataststus2.map((show ,index)=>{
    console.log(show)
  
//     return(
//       <tr key={index} >
//           <td>{show.name}</td>
//           <td>{show.issueToken}</td>
//           <td>{show.need}</td>
//           <td>{show.supervisor}</td>
         
//           <td>{show.status}</td>




//       </tr>
//     )
//   })
// } */}
          </tbody>
        </table>
        <table>
          {/* <thead>
            <tr>
          
              <th>Name</th>
              <th>Email</th>
              <th>Supervisor</th>
              <th>ProductType</th>
              <th>NEED/ASSIST</th>
              <th>Department</th>
              <th>Remarks</th>
              <th>Status </th>
            </tr>
          </thead> */}

          {/* {data.map((post) => {
            
              return (
                
                <tr key={post.issueToken}>
               
                  <td> {post.name} </td>

                  <td> {post.email} </td>
                  <td> {post.supervisor} </td>
                  <td> {post.productType} </td>
                  <td> {post.need}</td>
                  <td>{post.department} </td>
                  <td>{post.remarks} </td>
                  <td >{post.status} </td>
                </tr>
              );
            })} */}
        </table>
      </div>
    </>
  );
};
