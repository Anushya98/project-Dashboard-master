import React, { useEffect, useState } from "react";
import axios from "axios";
import {Typography } from "@mui/material";
import CountUp from "react-countup";
import ReactPaginate from 'react-paginate';
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai"; 
import { IconContext } from "react-icons";
import "./pagination.css"


const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  
  async function allTasks() {
    const allTask = await axios(
      `http://localhost:5000/task`,
      {
        ...config,
        method: "GET",
      }
    );
    //console.log({allTask})
    const task = allTask.data.onGoingTasks[0].count;
console.log(task)
  return task;
  }

  async function completedTasks() {
    const tasks = await axios(
      `http://localhost:5000/task`,
      {
        ...config,
        method: "GET",
      }
    );
   console.log({tasks})
    const task = tasks.data.completedTasks[0].count;

  return task;
  }

  async function overdueTasks() {
    const tasks = await axios(
      `http://localhost:5000/task`,
      {
        ...config,
        method: "GET",
      }
    );
    //console.log({tasks})
    const task = tasks.data.overdueTasks[0].count;

  return task;
  }

  async function taskList() {
    const tasks = await axios(
      `http://localhost:5000/task`,
      {
        ...config,
        method: "GET",
      }
    );
    // console.log({tasks})
    const task = tasks.data.tasks;
    

  return task;
  }

  async function getCurrentUser() {
    const currentUser = await axios(`http://localhost:5000/user/current`, {
      ...config,
      method: "GET",
    });
  
    const data = currentUser.data;
    return data;
  }
  
const TaskDetails = () => {

  
    const [taskCount, setTaskCount] = useState();
    const [currentUser, setCurrentUser] = useState(null);
    const [countAll, setCountAll] = useState();
    const [overdueCount, setOverdueCount] = useState();
    const [taskLists, setTaskLists] = useState();
    const [currentPage, setCurrentPage] = useState(0);

    const tasksPerPage = 5;

    let displayedTasks = [];
    let pageCount = 0;
    if (taskLists) {
      pageCount = Math.ceil(taskLists.length / tasksPerPage);
      displayedTasks = taskLists.slice(currentPage * tasksPerPage, (currentPage + 1) * tasksPerPage);
    }

    
     useEffect(() => {
        allTasks().then((tasks) => setCountAll(tasks));
    }, []);
      // console.log({countAll});
      useEffect(() => {
        completedTasks().then((allTask) => setTaskCount(allTask))
        // .then(async () => {
        //   const currentUser = await getCurrentUser();
        //   setCurrentUser(currentUser);
        // });
    }, []);
      // console.log({taskCount});
      useEffect(() => {
        overdueTasks().then ((tasks) => setOverdueCount(tasks));
    }, []);
      //console.log({overdueCount})
      useEffect(() => {
        taskList().then((tasks) => setTaskLists(tasks));
    }, []);
      //console.log({taskLists})

   return (
    <div style={{paddingRight:"15px", paddingLeft:"15px"}}>
       <div class="container-fluid p-0" style={{ marginTop:"30px", width:"100%"}}>
          
          <div class="row" >
           <div class="col-12">
             <div class="page-title-box d-sm-flex align-items-center justify-content-between">
          
          <h4 class="mb-2.5 sm-0 " style={{fontSize:"30px",paddingLeft:"0.7rem", fontWeight:"400"}}>Tasks</h4>
        </div> 
         </div>
           </div>
           </div>
           <div className="task">
           <div style={{display:"flex", flexDirection:"column", width:"auto",justifyContent:"space-between",rowGap:"1rem"}}>
             <div className="cards"  >
                   <div class="card card-animate"  style={{borderRadius:"15px"}}>
                    <div className="Cardbox">
                       <div class="card-body">
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fb3" class="bi bi-clipboard2" viewBox="0 0 16 16">
                                    <path d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1h-.5Z"/>
                                      <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z"/>
                                  </svg>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-normal mb-3"> Total Task</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-2 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ countAll } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="mb-0">Total task this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
               </div>
   

               <div className="cards" >
                   <div class="card card-animate"  style={{borderRadius:"15px"}}>
                    <div className="Cardbox1"> 
                       <div class="card-body">
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fb3" class="bi bi-clipboard2-check" viewBox="0 0 16 16">
                                      <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
                                      <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/>
                                      <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3Z"/>
                                  </svg>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium mb-3"> Task Completed</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-2 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ taskCount } duration={ 2.75 } separator=","/>
                                       </h4>                               
                                   </div>
                                   <p class="mb-0">Task Completed this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
               </div>



               <div className="cards" >
                   <div class="card card-animate"  style={{borderRadius:"15px"}}>
                    <div className=" Cardbox2">
                       <div class="card-body">
                           <div class="d-flex align-items-center">
                               <div class="avatar-sm flex-shrink-0">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" class="bi bi-clock" viewBox="0 0 16 16">
                                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                                  </svg>
                               </div>
                               <div class="flex-grow-1 ms-3">
                                   <p class="text-uppercase fw-medium mb-3"> Task Overdue</p>
                                   <div class="d-flex align-items-center mb-3">
                                       <h4 class="fs-2 flex-grow-1 mb-0">
                                       <i class="ri-arrow-down-s-line fs-13 align-middle me-1"></i>
                                       <CountUp start={ 0 } end={ overdueCount } duration={ 2.75 } separator="," />
                                       </h4>                               
                                   </div>
                                   <p class="mb-0">Task Overdue this month</p>
                               </div>
                           </div>
                       </div>
                       {/* <!-- end card body --> */}
                   </div>
               </div>
               {/* <!-- end col --> */}
               </div>
               </div>
               <div className="cards">
               <div class="col-xl-12"  className="Tasktable">
                            <div class="card" >
                                <div class="card-header align-items-center d-flex">
                                    <h4 class="card-title mb-0 flex-grow-1 py-1 ">My Tasks</h4>
                                    <div class="flex-shrink-0">
                                        <div class="dropdown card-header-dropdown">
                                            <a class="text-reset dropdown-btn" href="#" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span>All Tasks <i class="mdi mdi-chevron-down ms-1"></i></span>
                                            </a>
                                            <div class="dropdown-menu dropdown-menu-end">
                                                <a class="dropdown-item" href="#">All Tasks</a>
                                                <a class="dropdown-item" href="#">Completed </a>
                                                <a class="dropdown-item" href="#">Inprogress</a>
                                                <a class="dropdown-item" href="#">Pending</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- end card header --> */}
                                <div class="card-body">
                       <div class="table-responsive table-card">
                           <table class="table table-nowrap table-centered align-middle">
                               <thead class="bg-light text-muted">
                               <tr>
                                       <th scope="col">{""}</th>
                                       <th scope="col">Name</th>
                                      
                                       <th scope="col" >DeadLine</th>
                                       <th scope="col">Assignee</th>
                                       <th scope="col">Status</th>
                                   </tr>
      </thead> 
                                                           
      <tbody >
      {displayedTasks && displayedTasks.map((task) => (
            <tr key={task._id}>
            <td><input type="checkbox" value="" id="checkTask1"/></td>
                <td>{task.taskName}</td>
                <td>{task.dueDate}</td>
                <td>{task.allocatedTo ? task.allocatedTo.name : 'N/A'}</td>
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
    </div>
    </div>
  );
};

export default TaskDetails;

