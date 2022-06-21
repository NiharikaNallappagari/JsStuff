import React from "react";
import { useState } from 'react';
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

export default function EditOSProject() {
	const linkStyle = {
        marginright: "2000px",
        padding: "1100px",
        color: 'white'
      }

	  const location = useLocation();
	  console.log(location.pathname);
	  console.log(location.state);
    // States for project
const [openSourceProjectId, setOpenSourceProjectId] = useState('');
const [openSourceProjectName, setOpenSourceProjectName] = useState('');
const [openSourceProjectLicense, setOpenSourceProjectLicense] = useState('');
const [openSourceProjectDescription, setOpenSourceProjectDescription] = useState('');
const [openSourceProjectURL, setOpenSourceProjectURL] = useState('');
const [projectClientDetails, setProjectClientDetails] = useState(location.state.projectClientDetails);
const [openSourceProjectDetails, setOpenSourceProjectDetails] = useState({...location.state.openSourceProjectDetails});
const openSourceProjectCreatedBy = openSourceProjectDetails.openSourceProjectCreatedBy;
const openSourceProjectUpdatedBy = openSourceProjectDetails.openSourceProjectUpdatedBy;
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
const handleOpenSourceProjectDetails = (e) => {

	 const hold = {...openSourceProjectDetails}
	hold[e.target.name] = e.target.value;
	setOpenSourceProjectDetails(hold);
	setSubmitted(false);
};

// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
	if (openSourceProjectDetails.openSourceProjectName === '' || openSourceProjectDetails.openSourceProjectLicense === '' || openSourceProjectDetails.openSourceProjectDescription === '' || openSourceProjectDetails.openSourceProjectURL === '') {
	return Swal.fire({
			icon: 'error',
			title: 'Error',
			text: "All fields are required",
			showConfirmButton: true
		});	
	setError(true);
	} else {
	setSubmitted(true);
	setError(false);
	
	fetch("http://localhost:8080/updateOSProject/", {
		method:"PUT",
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify(openSourceProjectDetails)
	}).then(async res => {
		console.log("project updated")
        if(res.status === 200) {
			var my_link = "/ViewAllOSProjects"
			const res_1 = await Swal.fire({
				icon: 'success',
				title: 'success',
				text: "project updated successfully",
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
			// history.push({
			// 	pathname:'/bookcreationsuccessfulpage'
			// });
		}
		else if(res.status === 400 || 404){
			// console.log("Project already exists")
			// history.push({
			// 	pathname:'/projectcreationfailurepage'
			// });

			var my_link = "/ViewAllOSProjects"
			const res_2 = await Swal.fire({
				icon: 'success',
				title: 'success',
				text: "project updation failed because project doesn't exist",
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
			// console.log("Internal error")
			// history.push({
			// 	pathname:'/internalservererror'
			// });

			var my_link = "/ViewAllOSProjects"
			const res_3 = await Swal.fire({
				icon: 'success',
				title: 'success',
				text: "Internal server error occured during project update.so,please try again later",
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

    <addproject>
		{ /*Labels and inputs for add project*/ }

        <label className="label">Project Name</label>
		<input name="openSourceProjectName" placeholder="Enter the Project name" onChange={handleOpenSourceProjectDetails} className="input"
		value={openSourceProjectDetails.openSourceProjectName} type="text" required="required"/>
		<br/>

        <label className="label">Project License</label>
		<input name="openSourcrProjectLicense" placeholder="Enter the Project License" onChange={handleOpenSourceProjectDetails} className="input"
		value={openSourceProjectDetails.openSourceProjectLicense} type="text" required="required"/>
		<br/>

        <label className="label">Project Description</label>
		<input name="openSourceProjectDescription" placeholder="Enter the project Description" onChange={handleOpenSourceProjectDetails} className="input"
		value={openSourceProjectDetails.openSourceProjectDescription} type="text" required="required"/>
		<br/>

        <label className="label">project URL</label>
		<input name="openSourceProjectURL" placeholder="Enter the project URL" onChange={handleOpenSourceProjectDetails} className="input"
		value={openSourceProjectDetails.openSourceProjectURL} type="text" required="required"/>
		<br/>

        <button onClick={handleSubmit} className="btn" type="submit">
		Submit
		</button>
	</addproject>
    </div>
);
}