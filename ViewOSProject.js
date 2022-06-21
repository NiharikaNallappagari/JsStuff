import React from "react";
import { useLocation, useHistory } from "react-router-dom";

export default function ViewOSProject(){
   const location = useLocation();
   const history = useHistory();
  //state: { project: currentProjectDetails}
  const openSourceproject = location.state.openSourceproject;
  const projectClientName = location.state.projectClientDetails.projectClientName;
    return (
      <div id="project_details_page">
      <h3> Hello {projectClientName},  Here are the Project details</h3>
      <div id="projectDetails">
      <p>
         <span className="projectLabel">Open Source Project Name: </span>
         <span className="projectValue">{openSourceproject.openSourceProjectName}</span>
      </p>
      <p>
         <span className="projectLabel">Open Source Project License: </span>
         <span className="projectValue">{openSourceproject.openSourceProjectLicense}</span>
      </p>
      <p>
         <span className="projectLabel">Open Source Project Details: </span>
         <span className="projectValue">{openSourceproject.openSourceProjectDescription}</span>
      </p>
      <p>
         <span className="projectLabel">Open Source Project URL: </span>
         <span className="projectValue">{openSourceproject.openSourceProjectURL}</span>
      </p>
      <p>
         <span className="projectLabel">Open Source Project Created By: </span>
         <span className="projectValue">{openSourceproject.openSourceProjectCreatedBy}</span>
      </p>
      <p>
         <span className="projectLabel">Open Source Project Updated by: </span>
         <span className="projectValue">{openSourceproject.openSourceProjectUpdatedBy}</span>
      </p>
      <button id="back_button" onClick={()=>{
         	history.push({
               pathname: '/ViewAllOSProjects',
               state: { projectClientDetails: location.state.projectClientDetails }
            });
      }}>Back</button>
      </div>
  
      </div>
    );
  }