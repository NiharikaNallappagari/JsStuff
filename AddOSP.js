import React from "react";
import { useState } from 'react';
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

export default function AddOSP() {
	const linkStyle = {
        marginright: "2000px",
        padding: "1100px",
        color: 'white'
      }

	  const location = useLocation();
	  console.log(location.pathname);
	  console.log(location.state);
    // States for project
const [projectName, setProjectName] = useState('');
const [projectLicense, setProjectLicense] = useState('');
const [projectDescription, setProjectDescription] = useState('');
const [projectURL, setProjectURL] = useState('');
//const [projectCreatedBy, ] = useState('');

const projectCreatedBy = location.state.clientDetails.clientId;
const projectUpdatedBy = location.state.clientDetails.clientId;

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
const handleProjectName = (e) => {
	setProjectName(e.target.value);
	setSubmitted(false);
};

// Handling the project license change
const handleProjectLicense = (e) => {
	setProjectLicense(e.target.value);
	setSubmitted(false);
};

// Handling the project description change
const handleProjectDescription = (e) => {
	setProjectDescription(e.target.value);
	setSubmitted(false);
};

// Handling the project URL change
const handleProjectURL = (e) => {
	setProjectURL(e.target.value);
	setSubmitted(false);
};
const handleGetProjects = () => {
	history.push({
		pathname: '/VieworupdateOSP',
		props: { jsonData: location.state.clientDetails}
	});

}
// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
	if (projectName === '' || projectLicense === '' || projectDescription === '' || projectURL === '') {
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
	const projectDetails = {projectName, projectLicense, projectDescription, projectURL, projectCreatedBy, projectUpdatedBy}
	console.log(projectDetails)
	fetch("http://localhost:8080/createProject/", {
		method:"POST",
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify(projectDetails)
	}).then(res => {
		console.log("New project added")
        if(res.status === 200) {
			var my_link = "/vieworupdateOSP"
			return Swal.fire({
				icon: 'success',
				title: 'success',
				text: "project addition successful",
				showConfirmButton: false,
				showCancelButton: false,
				//html: `<a href="${my_link}">Click here to view list of projects!</a>`
				html:'<Link to={my_link} onClick={handleGetProjects}>Click here to view list of projects!</Link>'
			});	
			// history.push({
			// 	pathname:'/bookcreationsuccessfulpage'
			// });
		}
		else if(res.status === 400 || 404){
			console.log("Project already exists")
			history.push({
				pathname:'/bookcreationfailurepage'
			});
		}
		else {
			console.log("Internal error")
			history.push({
				pathname:'/internalservererror'
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
		<h1>{projectName} created successfully!!</h1>
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

        <label className="label">ProjectName</label>
		<input placeholder="Enter the Project name" onChange={handleProjectName} className="input"
		value={projectName} type="text" required="required"/>
		<br/>

        <label className="label">ProjectLicense</label>
		<input placeholder="Enter the Project License" onChange={handleProjectLicense} className="input"
		value={projectLicense} type="text" required="required"/>
		<br/>

        <label className="label">ProjectDescription</label>
		<input placeholder="Enter the project Description" onChange={handleProjectDescription} className="input"
		value={projectDescription} type="text" required="required"/>
		<br/>

        <label className="label">projectURL</label>
		<input placeholder="Enter the project URL" onChange={handleProjectURL} className="input"
		value={projectURL} type="text" required="required"/>
		<br/>

        <button onClick={handleSubmit} className="btn" type="submit">
		Submit
		</button>
	</addproject>
    </div>
);
}