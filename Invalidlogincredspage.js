import React from "react";
import { Link } from "react-router-dom";


export default function Invalidlogincredspage() {

    return (
        <div className="header">
            <h1>User credentials invalid</h1>
            <h4>Please try to login with valid credentials <Link to='/login'>Login</Link></h4>
        </div>
    );
}