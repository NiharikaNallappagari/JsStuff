import {useState} from "react";
import axios from "axios";
import ProjectDetails from "./ProjectDetails";
import VieworupdateOSP from "./vieworupdateOSP";

const Login=()=>{
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginStatus, setLoginStatus] = useState();
	const [responeData, setResponeData] = useState();
	const [isViewClicked, setViewClicked] = useState(false);
	const [projectDetails, setProjectDetails] = useState();

	const handleSubmit = ()=>{
		console.log("logged")
		// axios.post("http://localhost:8080/validateClient",
		// {
		// 		email: email,
		// 		password: password
		// }).then(response=>{
		// 	setLoginStatus(response.status)
		// 	setResponeData(response.data)
		// }).catch((error)=>{
		// 	setLoginStatus(response.status)
		// 	setResponeData(error) // change based on json reponse
		// });
			setLoginStatus(200)
	}
	const handleProjectDetails = (event) =>{
		setViewClicked(true);
		setProjectDetails({
    "projectName":"eclipseToolProj",
    "projectLicense": "Eclipse",
    "projectDescription": "Open source eclipse project",
    "projectURL": "www.eclipse.com",
    "projectState": "InProcess",
    "projectCreatedBy": 2,
    "projectUpdatedBy": 2
});
	}
	const updatePage = title => {
	   setViewClicked(title)
	}
	return(
		<div>
			{ !isViewClicked && (
				<button  onClick={(event)=>{
					handleProjectDetails()
				}}>View</button>
			) }
			{ isViewClicked && (
				<ProjectDetails project={projectDetails} details={updatePage}/>
			) }
		</div>
	);
}

export default Login;
