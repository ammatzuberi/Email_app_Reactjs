import { useState } from "react";
import authService from "../context/auth.server";
import { useNavigate } from "react-router-dom";

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

          navigate('/login');
          window.location.reload();

        },
      (error)=>{
        console.log(error);

      }
      );

    }catch  (err){
   
        console.log(err)
      
    }
  };

  return (
    <div>
      <form onSubmit={handlesubmit}>
        <h3>Sign Up</h3>
        <input type="text" placeholder="Enter Email"
        value={email}
        onChange={(e)=>setemail(e.target.value)}
        />
        <input type="password"
        placeholder="password"
        value={password}  
        onChange={(e)=>setpassword(e.target.value)}
        />
        <button type="submit" >Sign Up</button>
        
      </form>
    </div>
  );
};
export default Signup;

// import React, { useRef, useState } from "react";
// import { Form, Button, Card, Alert } from "react-bootstrap";
// import { Link,useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Signup() {

//     const emailRef = useRef()
//   const passwordRef = useRef()
//   const passwordConfirmRef = useRef()
//   const { signup } = useAuth()
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate()

//   async function handleSubmit(e) {
//     e.preventDefault()

//     if (passwordRef.current.value !== passwordConfirmRef.current.value) {
//       return setError("Passwords do not match")
//     }

//     try {
//       setError("")
//       setLoading(true)
//       await signup(emailRef.current.value, passwordRef.current.value)
//       navigate('/');
//     } catch {
//       setError("Failed to create an account")
//     }

//     setLoading(false)
//   }

//   return (
//     <>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Sign Up</h2>

//           {error && <Alert variant="danger">{error}</Alert>}
//           <Form onSubmit={handleSubmit}>
//             <Form.Group id="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" ref={emailRef} required />
//             </Form.Group>
//             <Form.Group id="password">
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" ref={passwordRef} required />
//             </Form.Group>
//             <Form.Group id="password-confirm">
//               <Form.Label>Password Confirmation</Form.Label>
//               <Form.Control type="password" ref={passwordConfirmRef} required />
//             </Form.Group>
//             <Button disabled={loading} className="w-100" type="submit">
//               Sign Up
//             </Button>
//           </Form>
//         </Card.Body>
//       </Card>
//       <div className="w-100 text-center mt-2">
//         Already have an account? <Link to="/login">Log In</Link>
//       </div>
//     </>
//   )
// }