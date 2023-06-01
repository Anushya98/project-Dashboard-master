import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import './upcoming.css';

const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  

const UpcomingSchedule = () => {
    const [upcoming, setUpcoming] = useState([])
    const [value, onChange] = useState(new Date());
    

    useEffect(() => {
        axios.get("http://localhost:5000/events", config).then((res => {
            setUpcoming(res.data.specEvents)
            console.log("Events data", res.data.specEvents)
        }));
    }, []);



    const handleDateClick = date => {
        axios
          .get(`http://localhost:5000/events/${date.toISOString()}`, config)
          .then(res => {
        
          });
      };
  
  //calendar.addEventListener('dateClick', handleDateClick);

  return (
    <div   class= "col-xl-12" style={{ marginTop:"30px" }}>
    <div class="card card-height-100">
        <div class="card-header d-flex align-items-center" >
            <h4 class="card-title flex-grow-1 mb-0"> Upcoming Schedule</h4>
            </div>
      <Calendar onChange={onChange} value={value} onClickDay={handleDateClick} style={{ width: '100%'}} />
    </div>
    </div>
  );
}

export default UpcomingSchedule;