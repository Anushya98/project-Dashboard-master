import React, { useEffect, useState } from "react"
// import DonutChart from "react-donut-chart";
import axios from "axios";
import Donutchart from "./Donutchart.js";


const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

const Charts = () => {
    const [chartData, setChartData] = useState([])
    const [chartData1, setChartData1] = useState([])
    const [chartData2, setChartData2] = useState([])
    const [chartData3, setChartData3] = useState([])
    

    useEffect(() => {
        axios.get("http://localhost:5000/project", config).then((res => {
            setChartData(res.data.totalActive)
            setChartData1(res.data.completed)
            setChartData2(res.data.projectOverdue)
            setChartData3(res.data.canceledProject)
            // console.log("Completed Project", res.data.completedProject)
            // console.log("Total Project", res.data.totalProject)
            // console.log("Overdue Project", res.data.projectOverdue)
            // console.log("Canceled Project", res.data.canceledProject)
        }));
    }, []);

    const data = [
        {
          label: "Active",
          value: chartData
        },
        {
          label: "Completed",
          value: chartData1
        },
        {
          label: "Overdue",
          value: chartData2
        },
        {
            label: "Canceled",
            value: chartData3
          }
      ];
      //console.log(data);
      
      return (

        <div style={{marginTop:"50px"}}> 
        <div class="col-xl-12">
 <div class="card card-height-50">
     <div class="card-header align-items-center d-flex" >
         <h4 class="card-title mb-0 flex-grow-1">Projects Status</h4>
         <div class="flex-shrink-0">
         </div>
     </div>
     {/* <!-- end card header --> */}

     <div class="card-body" >
      <div style={{display:"flex", justifyContent:"center", alignItems:"center",height:"220px"}}> 
     <Donutchart />
     
     </div>
         <div class="mt-3">
             <div class="d-flex justify-content-between border-bottom border-bottom-dashed ">
                 <p class="fw-medium mb-0">
                  <svg style={{marginRight:"15px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12" margin="10">
                  <path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#09249c"></path>
                 </svg>
                   Active Projects</p>
                 <p className="card-figure">{chartData}</p>
             </div>
             {/* <!-- end --> */}
             <div class="d-flex justify-content-between border-bottom border-bottom-dashed "> <p class="fw-medium mb-0 ">
             <svg  style={{marginRight:"15px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
              <path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#7978E9">
              </path></svg>
               Completed Projects</p>
                 <div>
                 <p className="card-figure pink-accent">{chartData1}</p>
                 </div>
             </div>
             {/* <!-- end --> */}
             <div class="d-flex justify-content-between border-bottom border-bottom-dashed ">
                 <p class="fw-medium mb-0">
                 <svg  style={{marginRight:"15px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12"><path fill="none" d="M0 0h24v24H0z"></path>
                 <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#53cfbf">
                  </path></svg>
                 Overdue Projects </p>
                 <div>
                 <p className="card-figure green-accent"> {chartData2}</p>
                 </div>
             </div>
             {/* <!-- end --> */}
             <div class="d-flex justify-content-between ">
                 <p class="fw-medium mb-0"> <svg style={{marginRight:"15px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
                  <path fill="none" d="M0 0h24v24H0z"></path><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#9D0191">
                  </path></svg>
                  Cancelled Projects</p>
                 <div>
                 <p className="card-figure green-accent"> {chartData3}</p>
                 </div>
             </div>
             {/* <!-- end --> */}
         </div>
     </div>
     {/* <!-- end cardbody --> */}
 </div>
 {/* <!-- end card --> */}
</div>
</div>
);
}

export default Charts;