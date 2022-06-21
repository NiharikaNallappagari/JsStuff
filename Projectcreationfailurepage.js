import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
    marginright: "2000px",
    padding: "1100px",
    // textDecoration: "none",
    color: 'white'
  }

export default function Projectcreationfailurepage() {

    return (
        <div className="header">
            <Link to="/" style={linkStyle}>Logout</Link>
            <h1>Project creation failed!!!! Project already exists </h1>
            <h4>Please try edit project if u want to modify project details <Link to='/ViewAllOSProjects'></Link></h4>
        </div>
    );
}