import React from "react";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useHistory } from "react-router-dom"

export default function Register() {

// States for registration
const [projectClientName, setClientName] = useState('');
const [projectClientEmail, setClientEmail] = useState('');
const [projectClientRole, setClientRole] = useState('');
const [projectClientPassword, setClientPassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

// Handling the Client name change
const handleClientName = (e) => {
	setClientName(e.target.value);
	setSubmitted(false);
};


// Handling the client email change
const handleClientEmail = (e) => {
	setClientEmail(e.target.value);
	setSubmitted(false);
};

// Handling the client role change
const handleClientRole = (e) => {
	setClientRole(e.target.value);
	setSubmitted(false);
};


// Handling the client password change
const handleClientPassword = (e) => {
	setClientPassword(e.target.value);
	setSubmitted(false);
};

// Handling the form submission
const handleSubmit = (e) => {
	e.preventDefault();
	if (projectClientName === ''|| projectClientEmail === '' || projectClientRole === '' || projectClientPassword === '') {
	setError(true);
	} else {
	setSubmitted(true);
	setError(false);
	const clientDetails = {projectClientName, projectClientEmail, projectClientRole, projectClientPassword}
	console.log(clientDetails)
	fetch("http://localhost:8080/registerProjectClient/", {
		method:"POST",
		headers: {"Content-Type": "application/json"},
		body:JSON.stringify(clientDetails)
	}).then(res => {
		console.log("New client registration successful")
        if(res.status === 200) {
			history.push({
				pathname:'/registrationsuccessfulpage'
			});
		}
		else if(res.status === 404) {
			console.log("User already registered")
			history.push({
				pathname:'/registrationfailurepage'
			});
		}
		else if(res.status === 500 || res.status === 400) {
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
		<h1>Client {projectClientName} successfully registered!!</h1>
	</div>
	);
};

// Showing error message if error is true
const errorMessage = () => {
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
	<div className="register">
	<div>
		<h1 className="h1">Client Registration</h1>
	</div>

	{/* Calling to the methods */}
	<div className="messages">
		{errorMessage()}
		{successMessage()}
	</div>

	<register>
		{/* Labels and inputs for register data */}
		<label className="label">Client Name</label>	
		<input placeholder="Enter Client Name" onChange={handleClientName} className="input"
		value={projectClientName} type="text" required="required"/>
		<br/>
		<br/>

		<label className="label">Client Email</label>
		<input placeholder="Enter Client Email" onChange={handleClientEmail} className="input"
		value={projectClientEmail} type="email" required="required"/>
		<br/>
		<br/>

        <label className="label">Client Role</label>
		<select onChange={handleClientRole} className="input" defaultValue= "Select Role">
			<option defaultValue>Select Role</option>
		    <option value="Requester">Requester</option>
			<option value="Approver">Approver</option>
		</select>
		<br/>
		<br/>

		<label className="label">client Password</label>
		<input placeholder="Enter the Client password" onChange={handleClientPassword} className="input"
		value={projectClientPassword} type="text" required="required"/>
		<br/>
		<br/>

		<button onClick={handleSubmit} className="btn" type="submit">
		Register
		</button>
	</register>
    <div className="footer">
                <h4>Already have an account ? <Link to='/login'>please login</Link></h4>
            </div>
	</div>
);
}