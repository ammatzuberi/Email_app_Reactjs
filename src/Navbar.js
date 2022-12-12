import { useEffect, useState } from "react";
import { json, Link, useMatch, useResolvedPath } from "react-router-dom";
import authService from "./context/auth.server";
import "./navbar.scss";
import "../src/components/login.css";
import { FiLogOut } from "react-icons/fi";

export default function Navbar() {
  var token = JSON.parse(localStorage.getItem("user"));
  const [posts, setPost] = useState();

  useEffect(() => {
    if (role == "user") {
      setPost(role);
    }
  });
  const logOut = () => {
    authService.logout();
  };

  // console.log(token.role)

  var role = token.role;
  // console.log(role)
  // setadminrole(role)
  return (
    <>
      <section className="navigation">
        <div className="nav-container">
          {posts ? (
            <nav className="nav">
              <ul className="ulform_status">
                <CustomLink to="/">ADD ISSUE</CustomLink>
                <CustomLink to="/CheckStatus">STATUS</CustomLink>
                <button className="logout" onClick={logOut}>
                  <FiLogOut className="logout_logo" />
                  <CustomLink to="login"> </CustomLink>
                </button>
              </ul>
            </nav>
          ) : (
            <nav className="nav">
              <ul className="nav-item">
                <CustomLink to="/CheckStatus" className="admin_signin">
                STATUS
                </CustomLink>
                <CustomLink to="/signup" className="admin_signin">
                  ADD USERS
                </CustomLink>
                <button className="logout" onClick={logOut}>
                  {" "}
                  <FiLogOut className="logout_logo" />
                  <CustomLink to="login"> </CustomLink>
                </button>
              </ul>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
