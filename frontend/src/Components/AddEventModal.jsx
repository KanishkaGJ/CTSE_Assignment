import React, {useState} from "react";
import './css/AddEventModalStyles.css';
import axios from "axios";

export default function AddEventModal({ onClose }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [host, setHost] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [date, setDate] = useState("");
    

    const handleSubmit = async (e) => {
      e.preventDefault();
  
     
      const formattedDate = new Date(date).toISOString();
      const formattedStartTime = new Date(`${date}T${startTime}`).toISOString();
      const formattedEndTime = new Date(`${date}T${endTime}`).toISOString();
      
      try {
         
          await axios.post("http://localhost:8080/event/addEvent", {
              title,
              description,
              host,
              startTime: formattedStartTime,
              endTime: formattedEndTime,
              date: formattedDate
          });
          alert("Event added successfully");
      } catch (error) {
          console.error(error);
          alert("Error occurred while adding event");
      }
  };
  

  return (
    <div className="modal">
  <div className="modal-content">
    <span className="close" onClick={onClose}>&times;</span>
    <h2 className="title">Add New Event</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title of the Event:</label>
        <input type="text" id="title" name="title" onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" rows="4" onChange={(e) => setDescription(e.target.value)} required></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="host">Host:</label>
        <input type="text" id="host" name="host" onChange={(e) => setHost(e.target.value)} required/>
      </div>
      <div className="form-group">
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div className="form-group">
        <div className="time-row">
          <div className="time-column">
            <label htmlFor="startTime">Start Time:</label>
            <input type="time" id="startTime" name="startTime" onChange={(e) => setStartTime(e.target.value)} required />
          </div>
          <div className="time-column">
            <label htmlFor="endTime">End Time:</label>
            <input type="time" id="endTime" name="endTime" onChange={(e) => setEndTime(e.target.value)} required />
          </div>
        </div>
      </div>
      <button type="submit" className="submit-button">Add Event</button>
    </form>
  </div>
</div>


  );
};
