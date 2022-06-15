import React from "react";
import { useState } from 'react';
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Swal from 'sweetalert2';

export default function EditOSP() {
	const linkStyle = {
        marginright: "2000px",
        padding: "1100px",
        color: 'white'
      }

	  const location = useLocation();
	  console.log(location.pathname);
	  console.log(location.state);
    // States for project
const [projectId, setProjectId] = useState('');
const [projectName, setProjectName] = useState('');
const [projectLicense, setProjectLicense] = useState('');
const [projectDescription, setProjectDescription] = useState('');
const [projectURL, setProjectURL] = useState('');
const [clientDetails, setClientDetails] = useState(location.state.clientDetails);
const [projectDetails, setProjectDetails] = useState({...location.state.projectDetails});
const projectCreatedBy = projectDetails.projectCreatedBy;
const projectUpdatedBy = projectDetails.projectUpdatedBy;
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
const handleProjectDetails = (e) => {

	 const hold = {...projectDetails}
	hold[e.target.name] = e.target.value;
	setProjectDetails(hold);
	setSubmitted(false);
};
/*const handleGetProjects = () => {
	history.push({
		pathname: '/VieworupdateOSP',
		state: { clientDetails: props.jsonData}
	});

}*/
// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
	if (projectDetails.projectName === '' || projectDetails.projectLicense === '' || projectDetails.projectDescription === '' || projectDetails.projectURL === '') {
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
	
	fetch("http://localhost:8080/updateProject/", {
		method:"PUT",
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify(projectDetails)
	}).then(res => {
		console.log("project updated")
        if(res.status === 200) {
			var my_link = "/vieworupdateOSP"
			return Swal.fire({
				icon: 'success',
				title: 'success',
				text: "project updated successfully",
				showConfirmButton: false,
				showCancelButton: false,
				html: `<a href="${my_link}">Click here to view list of projects!</a>`
				//html: '<button className="Button" onClick={handleGetProjects}>view list of projects</button>'
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
		<input name="projectName" placeholder="Enter the Project name" onChange={handleProjectDetails} className="input"
		value={projectDetails.projectName} type="text" required="required"/>
		<br/>

        <label className="label">ProjectLicense</label>
		<input name="projectLicense" placeholder="Enter the Project License" onChange={handleProjectDetails} className="input"
		value={projectDetails.projectLicense} type="text" required="required"/>
		<br/>

        <label className="label">ProjectDescription</label>
		<input name="projectDescription" placeholder="Enter the project Description" onChange={handleProjectDetails} className="input"
		value={projectDetails.projectDescription} type="text" required="required"/>
		<br/>

        <label className="label">projectURL</label>
		<input name="projectURL" placeholder="Enter the project URL" onChange={handleProjectDetails} className="input"
		value={projectDetails.projectURL} type="text" required="required"/>
		<br/>

        <button onClick={handleSubmit} className="btn" type="submit">
		Submit
		</button>
	</addproject>
    </div>
);
}