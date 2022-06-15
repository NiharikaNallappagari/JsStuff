import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useState } from 'react';
import { useHistory } from "react-router-dom"
import axios from "axios";
import { useEffect } from "react";
import ProjectDetails from "./ProjectDetails";

// import { useNavigate } from "react-router-dom";
export default function VieworupdateOSP(props) {
	console.log(props)

	const [disabled, setDisabled] = useState(false);


	// const navigate = useNavigate();
	// const navigateToAddProject = () => {
	// 	navigate('/AddOSP');
	// }

	// const [disableButton, setDisableButton] = useState(true);
	// if(localStorage.getItem('clientRole')=="Approver") {
	// 	setDisableButton = false;
	// } 

	const [projectName, setProjectName] = useState('');
	const [projectLicense, setProjectLicense] = useState('');
	const [projectDescription, setProjectDescription] = useState('');
	const [projectUrl, setProjectUrl] = useState('');
	const [isViewClicked, setViewClicked] = useState(false);
	const [projectDetails, setProjectDetails] = useState();

	const handleProjectDetails = (project) => {
		setViewClicked(true);
		setProjectDetails({
			"projectId": project.projectId,
			"projectCreatedDate": project.projectCreatedDate,
			"projectUpdatedDate": project.projectUpdatedDate,
			"projectName": project.projectName,
			"projectLicense": project.projectLicense,
			"projectDescription": project.projectDescription,
			"projectURL": project.projectURL,
			"projectState": project.projectState,
			"projectCreatedBy": project.projectCreatedBy,
			"projectUpdatedBy": project.projectUpdatedBy
		});
	}
	const updatePage = title => {
		setViewClicked(title)
	}

	const handleApprove = (project) => {
		console.log("logged")
		console.log(project.projectName)
		console.log(project.projectLicense)
		console.log(project.projectDescription)
		console.log(project.projectUrl)
		const projectState = "Approved"
		console.log(projectState)

		axios.put("http://localhost:8080/updateProject",
			{
				projectId: project.projectId,
				projectName: project.projectName,
				projectLicense: project.projectLicense,
				projectDescription: project.projectDescription,
				projectUrl: project.projecturl,
				projectUpdatedBy: props.jsonData.clientId,
				projectState: projectState
			}).then(response => {
				console.log(response)
				history.push({
					pathname:'/vieworupdateOSP'
				});
			}).catch((error) => {
				console.log(error)
			});
	}

	const handleEdit = (project) => {
		console.log(project.projectName)
		console.log(project.projectLicense)
		console.log(project.projectDescription)
		console.log(project.projectUrl)

		history.push({
			pathname: '/EditOSP',
			state: { clientDetails: props.jsonData, projectDetails: project }
		});

	}

	const handleDeny = (project) => {
		console.log(project.projectName)
		console.log(project.projectLicense)
		console.log(project.projectDescription)
		console.log(project.projectUrl)
		const projectState = "Denied"
		console.log(projectState)

		axios.put("http://localhost:8080/updateProject",
			{
				projectId: project.projectId,
				projectName: project.projectName,
				projectLicense: project.projectLicense,
				projectDescription: project.projectDescription,
				projectUrl: project.projecturl,
				projectUpdatedBy: props.jsonData.clientId,
				projectState: projectState
			}).then(response => {
				console.log(response);
				<VieworupdateOSP jsonData={clientDetails} />
				
			}).catch((error) => {
				console.log(error)
			});
	}

	const handleCancel = (project) => {
		console.log(project.projectName)
		console.log(project.projectLicense)
		console.log(project.projectDescription)
		console.log(project.projectUrl)

		axios.delete("http://localhost:8080/deleteProject",
			{
				projectName: project.projectName,
				projectLicense: project.projectLicense,
				projectDescription: project.projectDescription,
				projectUrl: project.projecturl,
			}).then(response => {
				console.log(response)
			}).catch((error) => {
				console.log(error)
			});
	}
	// const handleEdit  = (project) => {
	// 	//e.preventDefault();
	// 	console.log(project)
	// 	history.push({
	// 		pathname:'/registrationsuccessfulpage'
	// 	});
	// }
	const [projects, setProjects] = useState([]);
	useEffect(() => {
		getAllProjects({});
	}, []);
	// function handleAddProject() {
	// 	const history = useHistory();
	//     history.push("/AddOSP");
	//   }

	const history = useHistory();
	const handleLogout = () => {
		localStorage.removeItem('email');
		localStorage.removeItem('clientName');
		localStorage.removeItem('clientRole');
		history.push("/")
	}
	const handleAddProject = () => {
		history.push({
			pathname: '/AddOSP',
			state: { clientDetails: props.jsonData }
		});

	}


	const isDisabled = (project) => {
		console.log(props.jsonData)
	}
	async function getAllProjects() {
		try {
			const projects = await axios.get("http://localhost:8080/getProjects/")
			console.log(projects.data);
			projects.data.forEach(element => {
				console.log(element);
				element.canChange = true;
			});
			setProjects(projects.data);

		}
		catch (error) {
			console.log("something wrong")
		}
	}
	return (
		<div>
			{!isViewClicked && (
				<div className="contain-table">
					<br />
					<button className='round-button' onClick={handleLogout}>Logout</button>
					<hr />
					<br />
					<button className='round-button' onClick={handleAddProject}>Add Project</button>
					<hr />
					<table className=" border shadow">
						{/* stripes-table */}
						<thead className="thead-dark">
							<tr>
								<th>Project Name</th>
								<th>Project State</th>
								<th colSpan={2} className="text-center">Actions</th>
							</tr>
						</thead>
						<tbody>
							{
								projects.map((project, i) => {
									return (
										<tr key={i}>
											<td>{project.projectName}</td>
											<td>{project.projectState}</td>

											<td className="text-right">
												<div>

													<button onClick={() => handleProjectDetails(project)}>View</button>


												</div>
												<button disabled={props.jsonData.clientId === project.projectUpdatedBy || props.jsonData.clientRole === "Requestor" || project.projectState === "Approved" || project.projectState === "Denied"} className="Button muted-button" onClick={() => handleApprove(project)}>Approve</button>
												<button disabled={props.jsonData.clientId === project.projectUpdatedBy || props.jsonData.clientRole === "Requestor" || project.projectState === "Approved" || project.projectState === "Denied"} className="Button muted-button" onClick={() => handleDeny(project)}>Deny</button>
												<button disabled={props.jsonData.clientId !== project.projectCreatedBy} className="Button muted-button" onClick={() => handleCancel(project)}>Cancel</button>
												<button disabled={props.jsonData.clientId !== project.projectCreatedBy} className="Button muted-button" onClick={() => handleEdit(project)}>Edit</button>

											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>

				</div>
			)}
			{isViewClicked && (
				<ProjectDetails project={projectDetails} details={updatePage} />
			)}
		</div>

	);

}