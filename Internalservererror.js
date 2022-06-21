import React from "react";
import { Link } from "react-router-dom";


export default function internalservererror() {

    return (
        <div className="header">
            <h1>internal server error</h1>
            <h4>Please try again after sometime!!!! <Link to='/'>Home</Link></h4>
        </div>
    );
}