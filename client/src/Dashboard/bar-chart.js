import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const token = localStorage.getItem("token");
const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
const BarChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // Replace with your API URL
      const response = await fetch("http://localhost:5000/project", config);
      const data = await response.json();
      const completedData = new Array(12).fill(0);
      data.countByMonth.forEach(item => {
      completedData[item._id - 1] = item.count;
});
const activeData = new Array(12).fill(0);
      data.countByActive.forEach(item => {
      activeData[item._id - 1] = item.count;
});
    //  console.log(data)

      // Process the data and update the chart's data
      setChartData({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],

        datasets: [
          {
            label: "Active Projects",
            data: activeData,
            backgroundColor: "#7DA0FA",
            borderColor: "#7DA0FA",
            borderWidth: 0.5,
            
          },
          {
            label: "Completed Projects",
            data: completedData,
            backgroundColor: "#4B49AC",
            borderColor: "#4B49AC",
            borderWidth: 0.5,
          },
        ],
      });
       //console.log(chartData);
      //console.log(completedData)
      //console.log(activeData)
    };
    
    fetchData();
    
  }, []);

  
  return (
    <div className="App">
      <div style={{ maxWidth: "100%", marginTop: "2%" }}>
        <Bar
          data={chartData}
          height={350}
          width={"100%"}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              position: 'bottom',
              labels: {
                fontSize: 13,
                usePointStyle: true
              },
            },
          }}
          />
        </div>
        </div>
      );
      }
      
      export default BarChart;