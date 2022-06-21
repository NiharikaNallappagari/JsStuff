import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom"
import axios from "axios";

// import { useNavigate } from "react-router-dom";
export default function ViewAllOSProjects() {
	const location = useLocation();
	const history = useHistory();
	const [disabled, setDisabled] = useState(false)

	const jsonData = location.state.projectClientDetails; 
	//state: { clientDetails: response.data }
	console.log("new jsonData  "+	jsonData)

	// const navigate = useNavigate();
	// const navigateToAddProject = () => {
	// 	navigate('/AddOSP');
	// }

	// const [disableButton, setDisableButton] = useState(true);
	// if(localStorage.getItem('clientRole')=="Approver") {
	// 	setDisableButton = false;
	// } 

	const [openSourceProjectName, setOpenSourceProjectName] = useState('');
	const [openSourceProjectLicense, setOpenSourceProjectLicense] = useState('');
	const [openSourceProjectDescription, setOpenSourceProjectDescription] = useState('');
	const [openSourceProjectURL, setOpenSourceProjectURL] = useState('');
	const [isViewClicked, setViewClicked] = useState(false);
	//const [projectDetails, setProjectDetails] = useState();

	const handleProjectDetails = (project) => {
		//setViewClicked(true);
		const currentOpenSourceProjectDetails = {
			"openSourceProjectId": project.openSourceProjectId,
			"openSourceProjectCreateDate": project.openSourceProjectCreateDate,
			"openSourceProjectUpdatedDate": project.openSourceProjectUpdatedDate,
			"openSourceProjectName": project.openSourceProjectName,
			"openSourceProjectLicense": project.openSourceProjectLicense,
			"openSourceProjectDescription": project.openSourceProjectDescription,
			"openSourceProjectURL": project.openSourceProjectURL,
			"openSourceProjectState": project.openSourceProjectState,
			"openSourceProjectCreatedBy": project.openSourceProjectCreatedBy,
			"openSourceProjectUpdatedBy": project.openSourceProjectUpdatedBy
		};
		history.push({
			pathname: '/ViewOSProject',
			state: { openSourceproject: currentOpenSourceProjectDetails, projectClientDetails:jsonData }
		});
	}
	const updatePage = title => {
		setViewClicked(title)
	}

	const handleApprove = (project) => {
		console.log("logged")
		console.log(project.openSourceProjectName)
		console.log(project.openSourceProjectLicense)
		console.log(project.openSourceProjectDescription)
		console.log(project.openSourceProjectURL)
		const openSourceProjectState = "Approved"
		console.log(openSourceProjectState)

		axios.put("http://localhost:8080/updateOSProject",
			{
				openSourceProjectId: project.openSourceProjectId,
				openSourceProjectName: project.openSourceProjectName,
				openSourceProjectLicense: project.openSourceProjectLicense,
				openSourceProjectDescription: project.openSourceProjectDescription,
				openSourceProjectURL: project.openSourceProjectURL,
				openSourceProjectUpdatedBy: jsonData.projectClientId,
				openSourceProjectState: openSourceProjectState
			}).then(response => {
				console.log(response)
				const hold = [...projects];
				hold.forEach(currentOpenSourceProject=>{
					if(currentOpenSourceProject.openSourceProjectId==project.openSourceProjectId) currentOpenSourceProject.openSourceProjectState = 'Approved'
				})
				setProjects(hold)

				
			}).catch((error) => {
				console.log(error)
			});
	}

	const handleEdit = (project) => {
		console.log(project.openSourceProjectName)
		console.log(project.openSourceProjectLicense)
		console.log(project.openSourceProjectDescription)
		console.log(project.openSourceProjectURL)

		history.push({
			pathname: '/EditOSProject',
			state: { projectClientDetails: jsonData, openSourceProjectDetails: project }
		});

	}

	const handleDeny = (project) => {
		console.log(project.openSourceProjectName)
		console.log(project.openSourceProjectLicense)
		console.log(project.openSourceProjectDescription)
		console.log(project.openSourceProjectURL)
		const openSourceProjectState = "Denied"
		console.log(openSourceProjectState)

		axios.put("http://localhost:8080/updateOSProject",
			{
				openSourceProjectId: project.openSourceProjectId,
				openSourceProjectName: project.openSourceProjectName,
				openSourceProjectLicense: project.openSourceProjectLicense,
				openSourceProjectDescription: project.openSourceProjectDescription,
				openSourceProjectURL: project.openSourceProjectURL,
				openSourceProjectUpdatedBy: jsonData.clientId,
				openSourceProjectState: openSourceProjectState
			}).then(response => {
				console.log(response);
				const hold = [...projects];
				hold.forEach(currentOpenSourceProject=>{
					if(currentOpenSourceProject.openSourceProjectId==project.openSourceProjectId) currentOpenSourceProject.openSourceProjectState = 'Denied'
				})
				setProjects(hold)

			}).catch((error) => {
				console.log(error)
			});
	}

	const handleCancel = (project) => {
		console.log(project.openSourceProjectName)
		console.log(project.openSourceProjectLicense)
		console.log(project.openSourceProjectDescription)
		console.log(project.openSourceProjectURL)

		axios.delete("http://localhost:8080/deleteOSProject",
			{ data:{
				openSourceProjectId: project.openSourceProjectId,
				openSourceProjectName: project.openSourceProjectName,
				openSourceProjectLicense: project.openSourceProjectLicense,
				openSourceProjectDescription: project.openSourceProjectDescription,
				openSourceProjectURL: project.openSourceProjectURL
			}
				
			}).then(response => {
				console.log(response)
				const hold = [];
				projects.forEach(currentOpenSourceProject=>{
					if(currentOpenSourceProject.openSourceProjectId!==project.openSourceProjectId) 
					hold.push(currentOpenSourceProject)
				})
				setProjects(hold)
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
	const [projectsAfterDelete, setProjectsAfterDelete] = useState([]);
	useEffect(() => {
		getAllProjects({});
	}, []);
	// function handleAddProject() {
	// 	const history = useHistory();
	//     history.push("/AddOSP");
	//   }

	const handleLogout = () => {
		localStorage.removeItem('email');
		localStorage.removeItem('clientName');
		localStorage.removeItem('clientRole');
		history.push("/")
	}
	const handleAddProject = () => {
		history.push({
			pathname: '/AddOSProject',
			state: { projectClientDetails: jsonData }
		});

	}


	const isDisabled = (project) => {
		console.log(jsonData)
	}
	async function getAllProjects() {
		try {
			const projects = await axios.get("http://localhost:8080/getOSProjectsList/")
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
											<td>{project.openSourceProjectName}</td>
											<td>{project.openSourceProjectState}</td>
											<td className="text-right">
												<div>
													<button onClick={() => handleProjectDetails(project)}>View</button>
												</div>
												<button disabled={jsonData.projectClientId === project.openSourceProjectUpdatedBy || jsonData.projectClientRole === "Requester" || project.openSourceProjectState === "Approved" || project.openSourceProjectState === "Denied"} className="Button muted-button" onClick={() => handleApprove(project)}>Approve</button>
												<button disabled={jsonData.projectClientId === project.openSourceProjectUpdatedBy || jsonData.projectClientRole === "Requester" || project.openSourceProjectState === "Approved" || project.openSourceProjectState === "Denied"} className="Button muted-button" onClick={() => handleDeny(project)}>Deny</button>
												<button disabled={jsonData.projectClientId !== project.openSourceProjectCreatedBy || project.openSourceProjectState === "Approved" || project.openSourceProjectState === "Denied"} className="Button muted-button" onClick={() => handleCancel(project)}>Cancel</button>
												<button disabled={jsonData.projectClientId !== project.openSourceProjectCreatedBy || project.openSourceProjectState === "Approved" || project.openSourceProjectState === "Denied"} className="Button muted-button" onClick={() => handleEdit(project)}>Edit</button>
											</td>
										</tr>
									)
								})
							}
						</tbody>
					</table>

				</div>


	);

}