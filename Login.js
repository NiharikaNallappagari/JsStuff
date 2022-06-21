import React from 'react';
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"
import ViewAllOSProjects from "./ViewAllOSProjects";

const Login = () => {
	const history = useHistory();

	const [projectClientEmail, setProjectClientEmail] = useState("");
	const [projectClientPassword, setProjectClientPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState();
	const [responeData, setResponeData] = useState();

	const handleSubmit = () => {
		console.log("logged")
		axios.post("http://localhost:8080/validateProjectClient/",
			{
				projectClientEmail: projectClientEmail,
				projectClientPassword: projectClientPassword
			}).then(response => {
				setLoginStatus(response.status)
				setResponeData(response.data)
				
				console.log(response)
				history.push({
					pathname: '/ViewAllOSProjects',
					state: { projectClientDetails: response.data }
				});
			}).catch((error) => {
				setLoginStatus(error.status)
				setResponeData(error.data) // change based on json reponse
				console.log(error.response.data)
				if(error.response.data === "Invalid Credentials")
					history.push("/invalidlogincredspage")
			});
		// setLoginStatus(200)
	}

	return (
				<div>
				{/* <form> */}
					<input
						type="email"
						name="projectClientEmail"
						placeholder="Project Client Email"
						value={projectClientEmail}
						onChange={(event) => { setProjectClientEmail(event.target.value) }}
						required
					/>
					<input
						type="password"
						name="projectClientPassword"
						placeholder="Project Client Password"
						value={projectClientPassword}
						onChange={(event) => { setProjectClientPassword(event.target.value) }}
						required
					/>
					<button type="submit" onClick={handleSubmit} >Login</button>
				{/* </form> */}
		</div>
	);
}

export default Login;