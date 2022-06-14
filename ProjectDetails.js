

const ProjectDetails = (props)=>{
  console.log(props)
  return (
    <div id="project_details_page">
    <h3> Hello client_name_comes_here Here are the Project details</h3>
    <div id="projectDetails">
    <p>
       <span className="projectLabel">Project Name</span>
       <span className="projectValue">{props.project.projectName}</span>
    </p>
    <p>
       <span className="projectLabel">Project License</span>
       <span className="projectValue">{props.project.projectLicense}</span>
    </p>
    <p>
       <span className="projectLabel">Project Details</span>
       <span className="projectValue">{props.project.projectDescription}</span>
    </p>
    <p>
       <span className="projectLabel">Project URL</span>
       <span className="projectValue">{props.project.projectURL}</span>
    </p>
    <p>
       <span className="projectLabel">Project Created By</span>
       <span className="projectValue">{props.project.projectCreatedBy}</span>
    </p>
    <p>
       <span className="projectLabel">Project Updated by</span>
       <span className="projectValue">{props.project.projectUpdatedBy}</span>
    </p>
    <button id="back_button" onClick={()=>{props.details(false)}}>Back</button>
    </div>

    </div>
  )
}

/**
<label>Project Name:</label>
<input type="text"> {props.project.projectName}</input>
<label>Project Details:</label>
{
    "projectName":"eclipseToolProj",
    "projectLicense": "Eclipse",
    "projectDescription": "Open source eclipse project",
    "projectURL": "www.eclipse.com",
    "projectState": "InProcess",
    "projectCreatedBy": 2,
    "projectUpdatedBy": 2
}
<input type="text"> {props.project.projectDescription}</input>
**/
export default ProjectDetails;
