import React from "react";
import { Link } from "react-router-dom";


export default function Bookdeletionfailurepage() {

    const linkStyle = {
        marginright: "2100px",
        padding: "1100px",
        // textDecoration: "none",
        color: 'white'
      }
    return (
        <div className="header">
            <h1><Link to = '/' style={linkStyle}>Logout</Link></h1>
            <h1>Project deletion failed!!! Project doesn't exists in the OSP list</h1>
            <h4>Please try edit if u want to modify/add project details <Link to='/ViewAllOSProjects'>BookStore</Link></h4>
        </div>
    );
}