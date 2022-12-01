
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import authService from '../context/auth.server';

import "./login.css";


export default function LoginF() {

  const navigate = useNavigate();
  const[email, setemail]=useState('')
  const[password, setpassword]=useState('')

  const handlelogin= async(e)=>{
    e.preventDefault();
    try{
      await authService.login(email,password).then(
        ()=>{
          navigate("/");
          window.location.reload();

        },
        (error)=>{
          alert("UserName And Password  is Incorrect")
          console.log(error)
            }
      );

    }catch (err){
      console.log(err);
    }

  };
  


  return (
    <div className='container'> 

      <div className='left'>


      <form onSubmit={handlelogin} className="form">
  
      <h3 className="form_margin">Log In </h3>
      <input type="text"
      placeholder='email' required
      value={email}
      className="form-field animation a3"
      onChange={(e)=>setemail(e.target.value)}/>
            <input type="password"
      placeholder='password' required
      value={password}
      className="form-field animation a4"
      onChange={(e)=>setpassword(e.target.value)}/>
       <button type="submit" className='animation a6'>Log in</button>
      </form>

      </div>
  
    </div>
  )
}


























// import React, { useRef, useState } from "react"
// import { Form, Button, Card, Alert } from "react-bootstrap"
// import { useAuth } from "../context/AuthContext";

// import { Link, useNavigate  } from "react-router-dom"

// export default function LoginF() {
//   const emailRef = useRef()
//   const passwordRef = useRef()
//   const { login } = useAuth()
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault()

//     try {
//       setError("")
//       setLoading(true)
//       await login(emailRef.current.value, passwordRef.current.value)
//       navigate('/');
//     } catch {
//       setError("Failed to log in")
//     }

//     setLoading(false)
//   }

//   return (
//     <>
//       <Card>
//         <Card.Body>
//           <h2 className="text-center mb-4">Log In</h2>
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
//             <Button disabled={loading} className="w-100" type="submit">
//               Log In
//             </Button>
//           </Form>
//           <div className="w-100 text-center mt-3">
//             <Link to="/forgot-password">Forgot Password?</Link>
//           </div>
//         </Card.Body>
//       </Card>
//       <div className="w-100 text-center mt-2">
//         Need an account? <Link to="/signup">Sign Up</Link>
//       </div>
//     </>
//   )
// }