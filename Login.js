import React from 'react';
import { useState } from "react";
import axios from "axios";

import VieworupdateOSP from "./vieworupdateOSP";

const Login = () => {


	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState();
	const [responeData, setResponeData] = useState();

	const handleSubmit = () => {
		console.log("logged")
		axios.post("http://localhost:8080/validateClient",
			{
				email: email,
				password: password
			}).then(response => {
				setLoginStatus(response.status)
				setResponeData(response.data)
				console.log(response)
			}).catch((error) => {
				setLoginStatus(error.status)
				setResponeData(error.data) // change based on json reponse
			});
		// setLoginStatus(200)
	}

	return (
		<div>
			{loginStatus != 200 && (
				<div>
				{/* <form> */}
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={email}
						onChange={(event) => { setEmail(event.target.value) }}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={password}
						onChange={(event) => { setPassword(event.target.value) }}
						required
					/>
					<button type="submit" onClick={handleSubmit} >Login</button>
				{/* </form> */}
				</div>
			 )}
			{loginStatus == 200 && (
				<VieworupdateOSP jsonData={responeData} />
			)}
		</div>
	);
}

export default Login;