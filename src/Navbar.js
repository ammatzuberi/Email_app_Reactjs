import { useEffect, useState } from "react";
import { json, Link, useMatch, useResolvedPath } from "react-router-dom"
import "./navbar.scss";


export default function Navbar() {
  var token=JSON.parse(localStorage.getItem("user"));
  const [posts, setPost] = useState();
  useEffect(()=>{
    if(role=="user"){
      setPost(role)
    }
  })

  // console.log(token.role)


  var role= token.role
  // console.log(role)
  // setadminrole(role)
  return (
  
<>
<section className="navigation">

<div className="nav-container">


{posts?(








    <nav  className="nav">
        

      {/* <Link to="/" className="site-title">
       E&E
      </Link> */}
      <ul className="ulform_status">
        <CustomLink to="/">Add Issue</CustomLink>
        <CustomLink to="/CheckStatus">Status</CustomLink>
      </ul>
    </nav>
    ):(



  <nav  className="nav">
        

      {/* <Link to="/" className="site-title">
       E&E
      </Link> */}
      <ul className="nav-item">
       
        <CustomLink to="/signup" className="admin_signin">Add Users</CustomLink>
      </ul>
    </nav>
    )}
    </div>  
    </section>
    </>
  )

}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}