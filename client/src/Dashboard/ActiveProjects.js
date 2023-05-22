import React, { useEffect, useState } from "react";
import axios from "axios";
import {Typography } from "@mui/material";
import CountUp from "react-countup";
import { format } from  "date-fns";
import Charts from "./donut-chart.js";
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; 
import { IconContext } from "react-icons";
import "./pagination.css";

const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  async function allProjects() {
    const allProject = await axios(
      `http://localhost:5000/project`,
      {
        ...config,
        method: "GET",
      }
    );
    //console.log({allProject})
    const project = allProject.data.onGoingProjects[0].count;

  return project;
  }

  async function completedProject() {
    const projects = await axios(
      `http://localhost:5000/project`,
      {
        ...config,
        method: "GET",
      }
    );
    //console.log({projects})
    const project = projects.data.completedProjects[0].count;

  return project;
  }

  async function overdueProjects() {
    const projects = await axios(
      `http://localhost:5000/project`,
      {
        ...config,
        method: "GET",
      }
    );
    //console.log({projects})
    const project = projects.data.overdueProjects[0].count;

  return project;
  }

  async function projectList() {
    const projects = await axios(
      `http://localhost:5000/project`,
      {
        ...config,
        method: "GET",
      }
    );
    //console.log({projects})
    const project = projects.data.inProgressProjects;

  return project;
  }

  async function getCurrentUser() {
    const currentUser = await axios(`http://localhost:5000/user/current`, {
      ...config,
      method: "GET",
    });
  
    const data = currentUser.data;
    return data;
  }
  
const ProjectDetails = () => {

  
    const [projectCount, setProjectCount] = useState();
    const [currentUser, setCurrentUser] = useState(null);
    const [countAll, setCountAll] = useState();
    const [overdueCount, setOverdueCount] = useState();
    const [projectLists, setProjectLists] = useState();
    const [currentPage, setCurrentPage] = useState(0);

   // console.log("all states", {projectCount, currentUser, countAll, overdueCount, projectLists, currentPage})

    const projectsPerPage = 5;

    let displayedProjects = [];
    let pageCount = 0;
    if (projectLists) {
      pageCount = Math.ceil(projectLists.length / projectsPerPage);
      displayedProjects = projectLists.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage);
    }
    
     useEffect(() => {
        allProjects().then((projects) => setCountAll(projects));
    }, []);
      console.log({countAll});
      useEffect(() => {
        completedProject().then((allProject) => setProjectCount(allProject))
        // .then(async () => {
        //   const currentUser = await getCurrentUser();
        //   setCurrentUser(currentUser);
        // });
    }, []);
     // console.log({projectCount});
      useEffect(() => {
        overdueProjects().then((projects) => setOverdueCount(projects));
    }, []);
      //console.log({overdueCount})
      useEffect(() => {
        projectList().then((projects) => setProjectLists(projects));
    }, []);
     console.log({projectLists})
   return (
    <div>
    <div class="container-fluid p-0" style={{ marginTop:"30px" }}>
          
          <div class="row" style={{position:"relative"}}>
           <div class="col-12">
             <div class="page-title-box d-sm-flex align-items-center justify-content-between">
          
          <h4 class="mb-2.5 sm-0"style={{fontSize:"30px",paddingLeft:"0.7rem", fontWeight:"400"}}>Projects</h4>
        </div> 
         </div>
           </div>
           </div>

           <div>
        <div className="cards" style={{
             display:"flex", flexWrap:"wrap"
            
           }}>
           
             <div class="col-xl-4">
             
                   <div class="card card-animate" style={{borderRadius:"15px"}}>
                   <div className="Cardbox">
                       <div class="card-body" style={{ padding: "15px" }}>
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fb3" class="bi bi-file-earmark-check" viewBox="0 0 16 16">
                                      <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
                                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                                  </svg>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium mb-3">Total Projects Completed</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-2 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ projectCount } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="mb-0">Completed project this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
               </div>

               <div class="col-xl-4">
                   <div class="card card-animate" style={{borderRadius:"15px"}}>
                    <div className="Cardbox1">
                       <div class="card-body" style={{ padding: "15px" }}>
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fb3" class="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                                      <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
                                  </svg>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium mb-3">Total Ongoing Projects</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-2 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ countAll } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="mb-0">Ongoing project this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
               </div>


               <div class="col-xl-4">
                   <div class="card card-animate" style={{borderRadius:"15px"}}>
                    <div className="Cardbox2">
                       <div class="card-body" style={{ padding: "15px" }}>
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" class="bi bi-clock" viewBox="0 0 16 16">
                                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                  </svg>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium mb-3">Total Overdue Projects</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-2 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ overdueCount } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="mb-0">Overdue project this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
               </div>
       
               </div>
               <div >
               <div className="project">
                <div>
               <div   class= "col-xl-12" style={{ marginTop:"50px" }}>
               
                            <div class="card card-height-100">
                                <div class="card-header d-flex align-items-center" >
                                    <h4 class="card-title flex-grow-1 mb-0">Active Projects</h4>
                                    <div class="flex-shrink-0">
                                        <a href="javascript:void(0);" class="btn btn-soft-info btn-sm">Export Report</a>
                                    </div>
                                </div>
                              {/* <!-- end cardheader --> */}
                                  <div class="card-body">
                                  <div class="table-responsive table-card">
                                  <table class="table table-nowrap table-centered align-middle">
                                            <thead class="bg-light text-muted">
                                                <tr>
                                                    <th scope="col">Project Name</th>
                                                   
                                                    <th scope="col" >Due Date</th>
                                                    <th scope="col">Status</th>
                                              </tr>
                                              {/* <!-- end tr --> */}
                                          </thead>    
                                      
                                                <tbody >
                                                          {displayedProjects && displayedProjects.map((task) => (
                                                              <tr key={task._id}>
                                                              <td>{task.title}</td>
                                                              <td>{format(new Date(task.dueDate2), "dd MMM, yyyy")}</td>
                                                              <td>{task.state}</td>
                                                              </tr>
                                                                 ))}
                                                  </tbody>
</table>
<ReactPaginate
   previousLabel={
    <IconContext.Provider value={{ color: "#8e48d4", size: "36px" }}>
      <AiFillLeftCircle />
    </IconContext.Provider>
  }
  nextLabel={
    <IconContext.Provider value={{ color: "#8e48d4", size: "36px" }}>
      <AiFillRightCircle />
    </IconContext.Provider>
  }
    breakLabel={'...'}
    breakClassName={'break-me'}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={({ selected }) =>
    setCurrentPage(selected)}
    containerClassName={"pagination"}
    pageClassName={"page-item"}
    activeClassName={"page-active"}
  /> 
                                             </div>
                                         </div>
                                     </div>
                                
                           </div> 
                           
                          </div>
                          <div>
<Charts />
</div> 
</div>
</div>

                                
        
</div>
  </div>
  );
};

export default ProjectDetails;