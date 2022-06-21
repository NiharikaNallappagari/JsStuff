import React from "react";
import { useState } from 'react';
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

export default function AddOSProject() {
	const linkStyle = {
        marginright: "2000px",
        padding: "1100px",
        color: 'white'
      }

	  const location = useLocation();
	  console.log(location.pathname);
	  console.log(location.state);
    // States for project
const [openSourceProjectName, setOpenSourceProjectName] = useState('');
const [openSourceProjectLicense, setOpenSourceProjectLicense] = useState('');
const [openSourceProjectDescription, setOpenSourceProjectDescription] = useState('');
const [openSourceProjectURL, setOpenSourceProjectURL] = useState('');
//const [projectCreatedBy, ] = useState('');

const openSourceProjectCreatedBy = location.state.projectClientDetails.projectClientId;
const openSourceProjectUpdatedBy = location.state.projectClientDetails.projectClientId;

// showAlert = () => {
// 	Swal.fire({
// 		title: "Error",
// 		text: "All fields are mandatory",
// 		icon: "error",
// 		confirmButtonText: "true",
// 	  });
// }

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);


// Handling the Project name change
const handleOpenSourceProjectName = (e) => {
	setOpenSourceProjectName(e.target.value);
	setSubmitted(false);
};

// Handling the project license change
const handleOpenSourceProjectLicense = (e) => {
	setOpenSourceProjectLicense(e.target.value);
	setSubmitted(false);
};

// Handling the project description change
const handleOpenSourceProjectDescription = (e) => {
	setOpenSourceProjectDescription(e.target.value);
	setSubmitted(false);
};

// Handling the project URL change
const handleOpenSourceProjectURL = (e) => {
	setOpenSourceProjectURL(e.target.value);
	setSubmitted(false);
};

// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
	if (openSourceProjectName === '' || openSourceProjectLicense === '' || openSourceProjectDescription === '' || openSourceProjectURL === '') {
	return Swal.fire({
			icon: 'error',
			title: 'Error',
			text: "All fields are required",
			allowOutsideClick: false,
			showConfirmButton: true
		});	
	setError(true);
	} else {
	setSubmitted(true);
	setError(false);
	const openSourceProjectDetails = {openSourceProjectName, openSourceProjectLicense, openSourceProjectDescription, openSourceProjectURL, openSourceProjectCreatedBy, openSourceProjectUpdatedBy}
	console.log(openSourceProjectDetails)
	fetch("http://localhost:8080/addOSProject/", {
		method:"POST",
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify(openSourceProjectDetails)
	}).then(async res => {
		console.log("New project added")
        if(res.status === 200) {
			var my_link = "/ViewAllOSProjects"
			const res_1 = await Swal.fire({
				icon: 'success',
				title: 'success',
				text: "project addition successful",
				showCancelButton: false,
				confirmButtonColor: '#DD6B55',
				allowOutsideClick: false,
				confirmButtonText: 'Click here to view list of projects'
			});
			console.log("get list of projs");
			history.push({
				pathname: '/ViewAllOSProjects',
				state: { projectClientDetails: location.state.projectClientDetails }
			});	
		
		}
		else if(res.status === 400 || 404){
			// console.log("Project already exists")
			// history.push({
			// 	pathname:'/Projectcreationfailurepage'
			// });

			var my_link = "/ViewAllOSProjects"
			const res_2 = await Swal.fire({
				icon: 'success',
				title: 'success',
				text: "Project already exists.So project creation failed",
				showCancelButton: false,
				confirmButtonColor: '#DD6B55',
				allowOutsideClick: false,
				confirmButtonText: 'Click here to view list of projects'
			});
			console.log("get list of projects");
			history.push({
				pathname: '/ViewAllOSProjects',
				state: { projectClientDetails: location.state.projectClientDetails }
			});	
		}
		else {
			console.log("Internal error")
			// history.push({
			// 	pathname:'/internalservererror'
			// });

			var my_link = "/ViewAllOSProjects"
			const res_3 = await Swal.fire({
				icon: 'success',
				title: 'success',
				text: "Project addition failed due to some internal error",
				showCancelButton: false,
				confirmButtonColor: '#DD6B55',
				allowOutsideClick: false,
				confirmButtonText: 'Click here to view list of projects'
			});
			console.log("get list of projs");
			history.push({
				pathname: '/ViewAllOSProjects',
				state: { projectClientDetails: location.state.projectClientDetails }
			});	
		}
	})
}
};


let history = useHistory();

// Showing success message
const successMessage = () => {
	return (
	<div
		className="success"
		style={{
		display: submitted ? '' : 'none',
		}}>
		<h1>{openSourceProjectName} created successfully!!</h1>
	</div>
	);
};

// Showing error message if error is true
const errorMessage = () => {
	// return Swal.fire({
	// 		icon: 'error',
	// 		title: 'Error',
	// 		text: "All fields are required",
	// 		showConfirmButton: true
	// 	});
	
	return (
	<div
		className="error"
		style={{
		display: error ? '' : 'none',
		}}>
		<h1>Please enter all the fields</h1>
	</div>
	);
};

return (
	<div className="addbook">
		<Link to="/" style={linkStyle}>Logout</Link>
	<div>
		<h1>Add a Open Source Project</h1>
	</div>

	{/* Calling to the methods */}
	<div className="messages">
		{errorMessage()}
		{successMessage()}
	</div>

   
		{ /*Labels and inputs for add project*/ }

        <label className="label">Open Source Project Name</label>
		<input placeholder="Enter the Project name" onChange={handleOpenSourceProjectName} className="input"
		value={openSourceProjectName} type="text" required="required"/>
		<br/>

        <label className="label">Open Source Project License</label>
		<input placeholder="Enter the Project License" onChange={handleOpenSourceProjectLicense} className="input"
		value={openSourceProjectLicense} type="text" required="required"/>
		<br/>

        <label className="label">Open Source Project Description</label>
		<input placeholder="Enter the project Description" onChange={handleOpenSourceProjectDescription} className="input"
		value={openSourceProjectDescription} type="text" required="required"/>
		<br/>

        <label className="label">Open Source project URL</label>
		<input placeholder="Enter the project URL" onChange={handleOpenSourceProjectURL} className="input"
		value={openSourceProjectURL} type="text" required="required"/>
		<br/>

        <button onClick={handleSubmit} className="btn" type="submit">
		Submit
		</button>
    </div>
);
}