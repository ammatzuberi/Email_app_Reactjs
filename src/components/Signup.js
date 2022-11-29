import { useState } from "react";
import authService from "../context/auth.server";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Signup = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
      await authService.signup(email, password).then(
        (response)=>{
                // check for token and user already exists with 200
            alert("Sign up successfully", response);

          // navigate('/login');
          window.location.reload();

        },
      (error)=>{
        alert("User  Already Exist..")
        console.log(error);

      }
      );

    }catch  (err){
   
        console.log(err)
      
    }
  };

  return (
    <div className="container">
      
      <div className="left_signup">

      
      <form onSubmit={handlesubmit} className="form"> 
        <h3 className="form_margin">Add New Users</h3>
        
        <input type="email" placeholder="Enter Email"
        value={email}
        className="form-field animation a3"
        onChange={(e)=>setemail(e.target.value)}
        />
        <input type="password"
        placeholder="password"
        value={password}  
        className="form-field animation a4"
        onChange={(e)=>setpassword(e.target.value)}
        />
        <button type="submit" className='animation a6' >Add </button>
        
      </form>
      </div>
      <div className="right"></div>
  
    </div>
  );
};
export default Signup;

