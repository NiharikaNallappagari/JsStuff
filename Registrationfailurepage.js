import React from "react";
import { Link } from "react-router-dom";


export default function Registrationfailurepage() {

    return (
        <div className="header">
            <h1>User is already registered</h1>
            <h4>Please login with your credentials!!!! <Link to='/login'>Login</Link></h4>
        </div>
    );
}