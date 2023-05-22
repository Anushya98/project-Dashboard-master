import React, { useEffect, useState } from "react";
import axios from "axios";
import {Typography } from "@mui/material";
import CountUp from "react-countup";
import ActiveProjects from "./ActiveProjects.js";
import TaskDetails from "./task.js";
import "./dashmain.css"
import Chart from "./chart.js";
import UpcomingSchedule from "./upcoming-schedule.js"



const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  async function alldesigners() {
    const allUser = await axios(
      `http://localhost:5000/user`,
      {
        ...config,
        method: "GET",
      }
    );
   console.log({allUser})
    const user = allUser.data.designersCount[0].count;

  return user;
  }

  async function allUsers() {
    const allUser = await axios(
      `http://localhost:5000/user`,
      {
        ...config,
        method: "GET",
      }
    );
   // console.log({allUser})
    const user = allUser.data.newCount;

  return user;
  }

  async function allProjects() {
    const allProject = await axios(
      `http://localhost:5000/project`,
      {
        ...config,
        method: "GET",
      }
    );
    //console.log({allProject})
    const project = allProject.data.projectsCount

    return project;
  }
  
const TopTotal = () => {

  
    const [userCount, setUserCount] = useState();
    const [countAll, setCountAll] = useState();
    const [projectCount, setProjectCount] = useState();
    
     useEffect(() => {
        alldesigners().then((count) => setUserCount(count));
    }, []);
      //console.log({userCount});
      useEffect(() => {
        allUsers().then((allUser) => setCountAll(allUser));
    }, []);
      //console.log({countAll});
      useEffect(() => {
        allProjects().then((allProject) => setProjectCount(allProject));
    }, []);
       //console.log({projectCount})
   return (
    <div>
    <div class="container-fluid p-0">
          
          <div class="row">
           <div class="col-12">
             <div class="page-title-box d-sm-flex align-items-center justify-content-between">
          
          <h4 class="mb-2.5 sm-0"style={{fontSize:"0px",paddingLeft:"0.7rem", fontWeight:"400"}}>Users</h4>
        </div> 
         </div>
           </div>
           </div>
           <div  className="cards" style={{
             display:"flex"
           }}>
             <div className="cards" class="col-xl-4" >
                   <div class="card card-animate"  style={{borderRadius:"15px"}}>
                   <div className="Cardbox" >
                       <div class="card-body">
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fb3" class="bi bi-person-plus" viewBox="0 0 16 16">
                                    <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                    <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                                </svg>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium mb-3">New Users</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-2 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ countAll } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class=" mb-0">Users this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
               </div>
   
   
   
                          
   
                    <div className="cards" class="col-xl-4">
                   <div class="card card-animate"  style={{borderRadius:"15px"}}>
                   <div className="Cardbox1">
                       <div class="card-body">
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                               <svg xmlns="http://www.w3.org/2000/svg" style={{width:"24", height:"24"}} fill="#fb3"  class="bi bi-person" viewBox="0 0 15 15">
                                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                                </svg>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium mb-3">Controllers</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-2 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ userCount } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="mb-0">Controllers this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
               </div>
   
   
               <div class="col-xl-4">
                   <div class="card card-animate"  style={{borderRadius:"15px"}}>
                   <div className="Cardbox2">
                       <div class="card-body">
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                               <svg xmlns="http://www.w3.org/2000/svg" style={{width:"24", height:"24"}} fill="#fb3"  class="bi bi-person" viewBox="0 0 15 15">
                                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                                </svg>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium mb-3">Designers</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-2 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ userCount } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class=" mb-0">Designers this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
               </div>
   
    </div>    <div>
        <Chart/>
     </div>
     <div>
      <UpcomingSchedule />
    </div>
    <div>
      <TaskDetails />
    </div>   
    <div>
      <ActiveProjects />
    </div> 
    </div>
  );
};

export default TopTotal;