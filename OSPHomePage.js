import React from "react";
import { Link } from "react-router-dom";

    const OSPHomePage = (props) => {

    const linkStyle = {
        marginright: "2000px",
        padding: "1000px",
        color: 'white'
      }

    return (
        <div>
            <br/>
            <button className='round-button'>View/update Project</button>
            <br/>
            <br/>
            <Link to="/ViewAllOSProjects">Update/View Projects</Link>
            <Link to="/" style={linkStyle}>Logout</Link>
            <h1>Welcome to open source Tracking System</h1>
            <h4>In order to add a Open Source Project <Link to='/addOSProject'>Add a Open Source project</Link></h4>
        </div>
    );
}
export default OSPHomePage;