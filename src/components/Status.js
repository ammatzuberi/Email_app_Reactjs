import React, { useEffect, useRef } from "react";
import Popup from "reactjs-popup";
import Navbar from "../Navbar";
import "./Track.css";
import axios from "axios";
import { useSortBy } from "react-table";

import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useState } from "react";
// import "../App.css";
import "../table.scss";
import { Modal, ModalHeader, Row, Col, ModalBody } from "reactstrap";
import { color } from "@mui/system";

const url = "http://localhost:5000/issue/getUserIssues";
const update_url = "http://localhost:5000/issue/updateIssueStatus";
const delete_url = "http://localhost:5000/issue/deleteIssue";

// import Track from "./Track";
var editdata;
var Delete_data;

export const Status = () => {
  var tkn = JSON.parse(localStorage.getItem("user"));
  // console.log(tkn.token);
  // console.log(tkn.role);
  var role = tkn.role;
  var newtoken = tkn.token;
  const [currentStep, updateCurrentStep] = useState(1);

  function updateStep(step) {
    updateCurrentStep(step);
  }
  const handlesubmit = () => {
    window.location.href = "/";
  };
  const [data, setdata] = useState([]);

  const [modal, setmodel] = useState(false);
  const [DeleteModal, setDeleteModal] = useState(false);
  const [admindata, setadmindata] = useState([]);

  const [EditUser, setEditUser] = useState("");

  const [updatedata, setupdatedata] = useState({
    email: "",
    issueToken: "",
    status: "",
  });
  const [DeleteData, setDeleteData] = useState({
    email: "",
    issueToken: "",
  });

  const getuserdata = async () => {
    const { data } = await axios.get(url, {
      headers: {
        "x-api-key": newtoken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setdata(data.data);
  };
  var newid;
  const getData = async (id) => {
    const { data } = await axios.get(url, {
      headers: {
        "x-api-key": newtoken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // console.log(data[0].data)

    // setdata(data.data)
    // console.log(data)
    setadmindata(data);
    setEditUser(data);

    console.log(data);

    // data.forEach((i) => {
    //   // console.log(i.data);
    //   editdata = i.data;
    //   editdata?.forEach((z) => {
    //     let style_status = z.status;
    //     console.log(style_status);
    //     style_status = "Request Initiated!" ? (
    //       style_status
    //     ) : (
    //       <span>{style_status}</span>
    //     );
    //   });

    //   // console.log(editdata)
    // });
    // console.log(editdata.issueToken)
    // setdatastatus(i)
  };

  const deleteEdit = async (id) => {
    setDeleteModal(true);
    const { data } = await axios.get(url, {
      headers: {
        "x-api-key": newtoken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    let editdata_2 = data.find((i) => {
      Delete_data = i.data;
      console.log(Delete_data);
      // Delete_data.find((data)=>{
      //   data.email==email

      // return (data.issueToken = id);

      let obj2 = Delete_data.find((elm) => elm.issueToken === id) || {};
      console.log(obj2);
      document.getElementById("issueToken").value = id;
      document.getElementById("email").value = obj2?.email;

      let token = DeleteData;
      token.issueToken = id;
      token.email = obj2?.email;
      setDeleteData(token);
      console.log(token);

      if (Object.keys(obj2).length) {
        return obj2;
      }
      // console.log(editdata_2);
    });

    // })
  };
  const Edituser = async (id) => {
    console.log(id);
    setmodel(true);

    const { data } = await axios.get(url, {
      headers: {
        "x-api-key": newtoken,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let selectedIssue = data.find((i) => {
      // console.log(i.data);
      editdata = i.data;
      console.log(id);

      let obj = editdata.find((element) => element.issueToken === id) || {};

      console.log(obj);

      document.getElementById("issueToken").value = id;
      document.getElementById("email").value = obj?.email;
      document.getElementById("status").value = obj?.status;

      let prev = updatedata;

      prev.issueToken = id;
      prev.email = obj?.email;
      prev.status = obj?.status;

      setupdatedata(prev);

      console.log(prev);
      if (Object.keys(obj).length) {
        return obj;
      }
    });

    console.log(selectedIssue);
  };

  const [posts, setPost] = useState();

  const form = useRef();

  const updateData = (e) => {
    e.preventDefault();

    axios
      .post(update_url, updatedata, {
        headers: {
          "x-api-key": newtoken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.href = "/CheckStatus";
      });
  };

  const deleteData = (e) => {
    e.preventDefault();

    axios
      .post(delete_url, DeleteData, {
        headers: {
          "x-api-key": newtoken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        window.location.href = "/CheckStatus";
      });
  };

  function handleDelete(e) {
    let deleteData = { ...DeleteData };
    deleteData = { ...deleteData, [e.target.id]: e.target.value };
    setDeleteData(deleteData);
    console.log(deleteData);
  }
  function handle(e) {
    let newdata = { ...updatedata };

    newdata = { ...newdata, [e.target.id]: e.target.value };
    setupdatedata(newdata);
    console.log(newdata);
  }

  const [editpost, seteditpost] = useState(false);
  const toggleModal = () => {
    seteditpost(false);
    setmodel(false);
  };
  // const [order, setorder]=useState("ASC")
  // const sorting = () => {
  //   // alert(1)s
  //   // console.log(admindata);
  //   const sorted = [...admindata];
  //   data.sort((a, b) => {
  //     a.email.toLowerCase().localeCompare(b.email.toLowerCase());
  //     console.log(sorted);
  //     setadmindata(sorted);
  //   });
  // };
  useEffect(() => {
    getData();
    // sorting();
    if (role == "admin") {
      setPost(newtoken);
    } else {
      getuserdata();
    }

    if (modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  }, []);
  let sorted;

  return (
    <>
      <Navbar />

      {/* <h1> STATUS </h1> */}
      {/* <button onClick={sorting}>boom sorted</button> */}
      <div>
        <Modal size="lg" isOpen={modal} toggle={() => setmodel(!modal)}>
          <div className="modal">
            <ModalHeader toggle={() => setmodel(!modal)}></ModalHeader>
            <ModalBody>
              <div className="model-content">
                <button
                  className="close-modal"
                  onClick={() => setmodel(!modal)}
                >
                  x
                </button>
                <form ref={form} onSubmit={updateData} className="form_edit">
                  <label>Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    onChange={(e) => handle(e)}
                    value={updatedata.email}
                  />
                  <label> Issue Token</label>
                  <input
                    type="text"
                    id="issueToken"
                    className="form-control"
                    placeholder="Enter User Token "
                    onChange={(e) => handle(e)}
                    value={updatedata.issueToken}
                  />

                  <label>Status</label>
                  <input
                    type="text"
                    id="status"
                    className="form-control"
                    onChange={(e) => handle(e)}
                    value={updatedata.status}
                  />

                  <input
                    type="submit"
                    onSubmit={updateData}
                    className="btnsumbit"
                    value="Apply for change "
                  />
                </form>
              </div>
            </ModalBody>
          </div>
        </Modal>
      </div>

      <div>
        <Modal
          size="lg"
          isOpen={DeleteModal}
          toggle={() => setDeleteModal(!DeleteModal)}
        >
          {/* <ModalHeader
            toggle={() => setDeleteModal(!DeleteModal)}
          ></ModalHeader> */}
          <ModalBody>
            <div className="model-content">
              <label>Email</label>
              <button
                className="close-modal"
                onClick={() => setDeleteModal(!DeleteModal)}
              >
                x
              </button>

              <form ref={form} onSubmit={deleteData}>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  onChange={(e) => handleDelete(e)}
                  value={DeleteData.email}
                />
                <label> Issue Token</label>
                <input
                  type="text"
                  id="issueToken"
                  className="form-control"
                  placeholder="Enter User Token "
                  onChange={(e) => handleDelete(e)}
                  value={DeleteData.issueToken}
                />
                <input
                  type="submit"
                  onSubmit={deleteData}
                  className="btndelete"
                  value="Delete"
                />
              </form>
            </div>
          </ModalBody>
        </Modal>
      </div>

      {posts ? (
        <div className="div_main">
          <table className="table">
            {admindata.map((post, index) => {
              return (
                <thead key={index}>
                  {index == 0 ? (
                    <tr className="tr_admin">
                      <th>Email</th>
                      <th>Name</th>

                      <th>Supervisor</th>
                      <th>Product Type</th>
                      <th>NEED/ASSIST</th>
                      <th>Department</th>
                      <th>Date</th>
                      <th>Token</th>
                      <th>Remarks</th>
                      <th>Status </th>
                      <th>Actions </th>
                    </tr>
                  ) : (
                    <></>
                  )}
                  {/* <tr className="">
                    <td style={{ fontWeight:"700"}}> {post.email}</td> 
                  </tr> */}
                  {/* { post.data.sort((a,b)=>(a.name-b.name))
                   } */}
                  {post.data.map((newdata) => {
                    return (
                      <tr key={newdata.issueToken} className="admin_data">
                        <td> {newdata.email}</td>
                        <td>{newdata.name}</td>
                        <td>{newdata.supervisor}</td>
                        <td>{newdata.productType}</td>
                        <td>{newdata.need}</td>
                        <td>{newdata.department}</td>
                        <td>{newdata.date}</td>
                        <td>{newdata.issueToken}</td>
                        <td>{newdata.remarks}</td>
                        <td
                          style={{
                            color:
                              newdata.status === "Request Initiated!"
                                ? "red"
                                : "green",
                          }}
                        >
                          {newdata.status}s
                        </td>
                        <td id={newdata.issueToken}>
                          {/* <button className="btn mt-3" style={{backgroundColor:"#0b3629",color:"white"}} onClick={(e)=>setmodel(true)}> 
                     </button> */}

                          <button
                            className="btn_edit"
                            id={newdata.issueToken}
                            onClick={(e) => Edituser(newdata.issueToken)}
                          >
                            <EditRoundedIcon
                              style={{
                                cursor: "pointer",
                                color: "green",
                              }}
                            />
                          </button>

                          <button
                            className="btn_delete"
                            onClick={(e) => deleteEdit(newdata.issueToken)}
                          >
                            <DeleteForeverRoundedIcon
                              style={{
                                cursor: "pointer",
                                color: "red",
                              }}
                              id={newdata.issueToken}
                              onClick={(e) => deleteEdit(newdata.issueToken)}
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              
                  {post.data.map((newdata, index) => {
                    // return (
                    //   <tr key={newdata.issueToken} className="admin_data">
                    //     <td>{newdata.email}</td>
                    //     <td>{newdata.name}</td>
                    //     <td>{newdata.supervisor}</td>
                    //     <td>{newdata.productType}</td>
                    //     <td>{newdata.need}</td>
                    //     <td>{newdata.department}</td>
                    //     <td>{newdata.date}</td>
                    //     <td>{newdata.issueToken}</td>
                    //     <td>{newdata.remarks}</td>
                    //     <td
                    //       style={{
                    //         color:
                    //           newdata.status === "Request Initiated!"
                    //             ? "red"
                    //             : "green",
                    //       }}
                    //     >
                    //       {newdata.status}
                    //     </td>
                    //     <td id={newdata.issueToken}>
                    //       {/* <button className="btn mt-3" style={{backgroundColor:"#0b3629",color:"white"}} onClick={(e)=>setmodel(true)}>
                    //  </button> */}
                    //       <button
                    //         className="btn_edit"
                    //         id={newdata.issueToken}
                    //         onClick={(e) => Edituser(newdata.issueToken)}
                    //       >
                    //         <EditRoundedIcon
                    //           style={{
                    //             cursor: "pointer",
                    //             color: "green",
                    //           }}
                    //         />
                    //       </button>
                    //       <button
                    //         className="btn_delete"
                    //         onClick={(e) => deleteEdit(newdata.issueToken)}
                    //       >
                    //         <DeleteForeverRoundedIcon
                    //           style={{
                    //             cursor: "pointer",
                    //             color: "red",
                    //           }}
                    //           id={newdata.issueToken}
                    //           onClick={(e) => deleteEdit(newdata.issueToken)}
                    //         />
                    //       </button>
                    //       <Popup
                    //       // trigger={
                    //       //   <button>edit</button>
                    //       //                         <i
                    //       // id={newdata.issueToken} className="btnsumbit" onClick={(e)=>Edituser(e.target.id)}>boom</i>
                    //       // <MDBIcon fas icon="pen"  />
                    //       //   <button id={newdata.issueToken} onClick={(e)=>Edituser(e.target.id) }>
                    //       //  edit
                    //       //   </button>
                    //       // }
                    //       //                       trigger={
                    //       //                         <a
                    //       // id={newdata.issueToken} className="far fa-edit add-btn " onClick={(e)=>Edituser(e.target.id)}> </a>
                    //       //                         // <button>edit</button>
                    //       //                       // <MDBIcon fas icon="pen"  id={newdata.issueToken} onClick={(e)=>Edituser(e.target.id)} />
                    //       //                     }
                    //       >
                    //         <form
                    //           className="content"
                    //           ref={form}
                    //           onSubmit={updateData}
                    //         >
                    //           <h2>Edit</h2>
                    //           <label>Email</label>
                    //           <input
                    //             type="email"
                    //             id="email"
                    //             onChange={(e) => handle(e)}
                    //             value={updatedata.email}
                    //           />
                    //           <label> Issue Token</label>
                    //           <input
                    //             type="text"
                    //             id="issueToken"
                    //             placeholder="Enter User Token "
                    //             onChange={(e) => handle(e)}
                    //             value={updatedata.issueToken}
                    //           />
                    //           <label>Status</label>
                    //           <input
                    //             type="text"
                    //             id="status"
                    //             onChange={(e) => handle(e)}
                    //             value={updatedata.status}
                    //           />
                    //           <input
                    //             type="submit"
                    //             onSubmit={updateData}
                    //             className="btnsumbit"
                    //             value="Apply for change "
                    //           />
                    //         </form>
                    //       </Popup>
                    //       {/* </i> */}
                    //     </td>
                    //   </tr>
                    // );
                  })}
                </thead>

               
              );
            })}
          </table>
        </div>
      ) : (
        <table className="table_user">
          <thead>
            <tr className="tr_user">
              <th>Name</th>
              <th>Email</th>
              <th>Supervisor</th>
              <th>Product Type</th>
              <th>NEED/ASSIST</th>
              <th>Department</th>
              <th>Date</th>
              <th>Remarks</th>
              <th>Status </th>
            </tr>
          </thead>

          <tbody className="trdiv">
            {data?.map((post) => {
              return (
                <tr key={post.issueToken}>
                  <td> {post.name} </td>

                  <td> {post.email} </td>
                  <td> {post.supervisor} </td>
                  <td> {post.productType} </td>
                  <td> {post.need}</td>
                  <td>{post.department} </td>
                  <td>{post.date} </td>
                  <td>{post.remarks} </td>
                  <td
                    style={{
                      color:
                        post.status === "Request Initiated!" ? "blue" : "green",
                    }}
                  >
                    {post.status}{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};
