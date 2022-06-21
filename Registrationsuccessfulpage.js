import React from "react";
import { Link } from "react-router-dom";


export default function Registrationfailurepage() {

    return (
        <div className="header">
            <h1>User registration successfull</h1>
            <h4>Please login!!!! <Link to='/login'>Login</Link></h4>
        </div>
    );
}