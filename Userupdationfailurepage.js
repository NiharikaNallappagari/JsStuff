import React from "react";
import { Link } from "react-router-dom";


export default function Userupdationfailurepage() {

    return (
        <div className="header">
            <h1>User details updation failed</h1>
            <h4>Please try again after with valid details!!!! <Link to='/login'>Login</Link></h4>
        </div>
    );
}