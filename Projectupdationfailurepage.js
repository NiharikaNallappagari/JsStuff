import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
    marginright: "2000px",
    padding: "1100px",
    // textDecoration: "none",
    color: 'white'
  }

export default function Projectupdationfailurepage() {

    return (
        <div className="header">
            <Link to="/" style={linkStyle}>Logout</Link>
            <h1>Failed to update project as project doesn't exist in the OSP List</h1>
            <h4>In order to modify project details,Please go back to list of OSP projects page and Update accordingly <Link to='/ViewAllOSProjects'></Link></h4>
        </div>
    ); 
}