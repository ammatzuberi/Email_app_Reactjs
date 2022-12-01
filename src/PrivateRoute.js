import React from "react";
import { redirect } from "react-router-dom";



function  PrivateRoute(props){
const Cmp =props.cmp 
let userName = localStorage.getItem("name")
? localStorage.getItem("name")
: "";
if(!userName)
return <div>{!userName? <Cmp/>:redirect("/")}

</div>
}
export default PrivateRoute;