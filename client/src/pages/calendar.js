import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './calendar.css';

const token = localStorage.getItem("token");


const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  

const inputEmptyState = {
  eventName: "",
  eventCategory: "",
  eventDate: "",
  status: "",
  createdBy: "",
  description: ""
}

const Calendars = () => {
  const [showEventForm, setShowEventForm] = useState(false);
    const [value, onChange] = useState(new Date());
    const [input, setInput] = useState(inputEmptyState);

    const handleChange = (e) => {
      setInput((prev) => {
        console.log(e.target.name, e.target.value, { ...prev, [e.target.name]: e.target.value })
        return { ...prev, [e.target.name]: e.target.value };
      });
    };


    const handleDateClick = date => {
      setShowEventForm(true);
      console.log(date);
      setInput((prev) => {
        return { ...prev, eventDate : date };
      });
      };

  console.log({ showEventForm, input });

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/events ", input )
    .then(res => {
    console.log(res);
  }).catch (err => console.log(err))
  setInput(() => inputEmptyState); 
};

  const handleClose = () => {
    setInput(() => inputEmptyState);
    setShowEventForm(false);
  }
  
  //calendar.addEventListener('dateClick', handleDateClick);

  return (    
    <div style={{height: "450px", marginTop: "-3%"}}>
      <h2>Calendar</h2>
      <Calendar onChange={onChange} value={value} onClickDay={handleDateClick} style={{ width: '100%'}} />
      {
        showEventForm && (
          <div className="form-modal">
            <div className="form-modal-content">
              <h2>New Event</h2>
              <Form
              method = "POST" 
              onSubmit={handleSubmit} 
              //className="in-box"
              name="inputform"
              >
                <Form.Group className="mb-3" >
                  <Form.Label>Event Name</Form.Label>
                  <Form.Control name="eventName" onChange={handleChange} value={input.eventName}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label>Event Category</Form.Label>
                  <Form.Control name="eventCategory" onChange={handleChange} value={input.eventCategory} />
                </Form.Group>

                {/* <Form.Group className="mb-3" >
                  <Form.Label>Event Date</Form.Label>
                  <Form.Control name="eventDate" onChange={handleChange} />
                </Form.Group> */}

                <Form.Group className="mb-3" >
                  <Form.Label>Event Status</Form.Label>
                  <Form.Control name="status" onChange={handleChange} value={input.status}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label>Created By</Form.Label>
                  <Form.Control name="createdBy" onChange={handleChange} value={input.createdBy}/>
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label>Description</Form.Label>
                  <Form.Control name="description" onChange={handleChange} value={input.description} />
                </Form.Group>
                <Button variant="primary" name="submit" type="submit" style={{background:"linear-gradient(130deg,#c22ed0,#5ffae0)"}}>
                  Submit
                </Button>
                <Button onClick={handleClose} style={{background:"linear-gradient(130deg,#c22ed0,#5ffae0)"}}>Close</Button>
              </Form>        
            </div>
          </div>
        )
      }
    </div>
  );
}

export default Calendars;