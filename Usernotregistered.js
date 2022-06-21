import React from "react";
import { Link } from "react-router-dom";


export default function Usernotregistered() {

    return (
        <div className="header">
            <h1>User not registered with us !!!!</h1>
            <h4>Please register <Link to='/register'>Register</Link></h4>
        </div>
    );
}