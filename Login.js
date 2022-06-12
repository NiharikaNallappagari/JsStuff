import React, {useState} from "react";
// import { useState } from 'react';
// import { useHistory } from "react-router-dom";
// import { Redirect } from 'react-router';
// import axios from "axios";
// import About from "./About";
import VieworupdateOSP from "./vieworupdateOSP";

const Login=()=>{


	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState();
	const [responeData, setResponeData] = useState();

	const handleSubmit = ()=>{
		console.log("logged")
		axios.post("http://localhost:8080/validateClient",
		{
				email: email,
				password: password
		}).then(response=>{
			setLoginStatus(response.status)
			setResponeData(response.data)
		}).catch((error)=>{
			setLoginStatus(response.status)
			setResponeData(error) // change based on json reponse
		});
	}

	return(
					<div>
					{loginStatus != 200 && (
						<form onSubmit={handleSubmit()}>
							<input
							type="email"
							name="email"
							placeholder="Email"
							value={email}
							onChange={(event)=>{setEmail(event.target.value)}}
							required
							/>
							<input
							type="password"
							name="password"
							placeholder="Password"
							value={password}
							onChange={(event)=>{setPassword(event.target.value)}}
							required
							/>
							<button type="submit" >Login</button>
						</form>
					)}
						{loginStatus == 200 && (
							<VieworupdateOSP jsonData={responeData} />
						)}
					</div>
	);
}

export default Login;
