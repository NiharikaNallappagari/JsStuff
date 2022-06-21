import React from "react";
import { Link } from "react-router-dom";

function Home() {
    const linkStyle = {
        // margin: "1rem",
        // marginright: "2000px",
        // padding: "200px",
        padding: "10px 20px",
        // border: "1px solid green",
        // opacity: "0.3",
        // textDecoration: "none",
        color: 'red'

      }

    return (
        <div className="App">
              <Link to="/about" style={linkStyle}>About</Link>
              <Link to="/login" style={linkStyle}>Login</Link>
              <Link to="/register" style={linkStyle}>Register</Link>
              <about message="Data from first component"/>
            <header className="Homepage-header">
            <h1> Welcome to Open Source Project</h1>
            </header>
        </div>
    );
}
export default Home;