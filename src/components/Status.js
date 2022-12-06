import React, { useEffect, useRef } from "react";
import Popup from "reactjs-popup";
import Navbar from "../Navbar";
import "./Track.css";
import axios from "axios";
import { useSortBy } from "react-table";
import { FaUser } from "react-icons/fa";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { useState } from "react";

import "../table.scss";
import { Modal, ModalHeader, Row, Col, ModalBody } from "reactstrap";
import { color } from "@mui/system";
import { Collapse } from "bootstrap";

const url = "http://localhost:5000/issue/getUserIssues";
const update_url = "http://localhost:5000/issue/updateIssueStatus";
const delete_url = "http://localhost:5000/issue/deleteIssue";

var editdata;
var Delete_data;

export const Status = () => {
  var tkn = JSON.parse(localStorage.getItem("user"));
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

  const [table_collapse, settable_collapse] = useState(false);
  const [show, setShow] = useState(false);

  const [modal, setmodel] = useState(false);

  const [DeleteModal, setDeleteModal] = useState(false);
  const [admindata, setadmindata] = useState([]);

  const [EditUser, setEditUser] = useState("");
  const [datatoggle, setdatatoggle] = useState(null);

  const [updatedata, setupdatedata] = useState({
    email: "",
    issueToken: "",
    status: "",
  });
  const [DeleteData, setDeleteData] = useState({
    email: "",
    issueToken: "",
  });
  // get all the data from  json file and  show data in the website..
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

    setadmindata(data);
    setEditUser(data);
  };

  //

  // console.log(index_data);
  console.log(admindata);

  var collapse = document.getElementsByClassName("main_email");

  for (var i = 0; i < collapse.length; i++) {
    console.log(collapse.length);

  }

  const toggle = (index_show) => {
    if (datatoggle == index_show) {
      return setdatatoggle(null);
    }
    setdatatoggle(index_show);
  };

  // delete a issue from the database api..
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
    });
  };
  // edit a issue by the admin and make change to the existing issue .. in database
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

  return (
    <>
      <Navbar />

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
            {/* sorting  the email and show the email   to the website sorted  */}
            {/*   filter  the lenght is for if the lenght exist display only ...  that data*/}

            {admindata
              .sort((a, b) => (a.email > b.email ? 1 : -1))
              .filter((item) => item.data.length)

              .map((post, index) => {
                return (
                  <thead key={index}>
                    {index == 0 ? (
                      <tr className="tr_admin">
                        <th>EMAIL</th>
                        <th>NAME</th>

                        <th>SUPERVISOR</th>
                        <th>PRODUCT TYPE</th>
                        <th>NEED/ASSIST</th>
                        <th>DEPARTMENT</th>
                        <th>DATE</th>
                        <th>TOKEN</th>
                        <th>REMARKS</th>
                        <th>STATUS </th>
                        <th>ACTIONS </th>
                      </tr>
                    ) : (
                      <></>
                    )}

                    <tr className="main_email" onClick={() => toggle(index)}>
                      <td
                        colSpan="11"
                        className="email_td"
                        onClick={() => settable_collapse(!table_collapse)}
                        style={{ height: "20px" }}
                      >
                        <span className="email_span">
                          <FaUser style={{ marginRight: "10px" }} />

                          {post.email}
                        </span>
                        <span className="number">{post.data.length}</span>
                        {!table_collapse ? (
                          <FaCaretDown style={{ float: "right" }} />
                        ) : (
                          <FaCaretUp style={{ float: "right" }} />
                        )}
                      </td>
                    </tr>

                    {post.data.map((newdata) => {
                      return (
                        <tr
                          key={newdata.issueToken}
                          className={
                            datatoggle === index
                              ? "admin_data"
                              : "admin_data hide-me"
                          }
                        >
                          <td className="email_td">{newdata.email}</td>
                          <td  className="email_td">{newdata.name}</td>
                          <td className="email_td">{newdata.supervisor}</td>
                          <td className="email_td">{newdata.productType}</td>
                          <td className="email_td">{newdata.need}</td>
                          <td className="email_td">{newdata.department}</td>
                          <td className="email_td">{newdata.date}</td>
                          <td className="email_td">{newdata.issueToken}</td>
                          <td className="email_td">{newdata.remarks}</td>
                          <td  className="email_td"
                            style={{
                              color:
                                newdata.status === "Request Initiated!"
                                  ? "red"
                                  : "green",
                            }}
                          >
                            {newdata.status}
                          </td>
                          <td id={newdata.issueToken}  className="email_td">
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
                  </thead>
                );
              })}
          </table>
        </div>
      ) : (
        // user table show.......
        <table className="usertable">
          <thead>
            <tr className="tr_admin">
              <th>NAME</th>
              <th>EMAIL</th>

              <th>SUPERVISOR</th>
              <th>PRODUCT TYPE</th>
              <th>NEED/ASSIST</th>
              <th>DEPARTMENT</th>
              <th>DATE</th>

              <th>REMARKS</th>
              <th>STATUS </th>
            </tr>
          </thead>

          <tbody className="trdiv">
            {data?.map((post) => {
              return (
                <tr key={post.issueToken} className="admin_data">
                  <td className="user_td"> {post.name} </td>

                  <td className="user_td" > {post.email} </td>
                  <td className="user_td"> {post.supervisor} </td>
                  <td className="user_td"> {post.productType} </td>
                  <td className="user_td"> {post.need}</td>
                  <td className="user_td">{post.department} </td>
                  <td className="user_td">{post.date} </td>
                  <td className="user_td">{post.remarks} </td>
                  <td
                 className="user_td"
                    style={{
                      color:
                        post.status === "Request Initiated!" ? "blue" : "green",
                    }}
                  >
                    {post.status}
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
