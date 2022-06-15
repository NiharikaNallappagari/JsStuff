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
            <Link to="/vieworupdateOSP">Update/View Projects</Link>
            <Link to="/" style={linkStyle}>Logout</Link>
            <h1>Welcome to open source project home page</h1>
            <h4>In order to add a Project <Link to='/addOSP'>Add a OSP project</Link></h4>
        </div>
    );
}
export default OSPHomePage;