import React, { useState } from "react";
import "./css/AddEventModalStyles.css";
import axios from "axios";

export default function EditEventModal({ event, onClose }) {
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [host, setHost] = useState(event.host);
  const [startTime, setStartTime] = useState(getTimeString(event.startTime));
  const [endTime, setEndTime] = useState(getTimeString(event.endTime));
  const [date, setDate] = useState(getDateString(event.date));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedDate = new Date(date).toISOString();
    const formattedStartTime = new Date(`${date}T${startTime}`).toISOString();
    const formattedEndTime = new Date(`${date}T${endTime}`).toISOString();

    try {
      await axios.put(
        `https://ctse-backend.azurewebsites.net/event/eventUpdate/${event._id}`,
        {
          title,
          description,
          host,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          date: formattedDate,
        }
      );
      alert("Event updated successfully");

      onClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Error occurred while updating event");
    }
  };

  // Function to convert Date to string format 'HH:MM'
  function getTimeString(timeString) {
    const time = new Date(timeString);
    return `${time.getHours()}:${time
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  }

  // Function to convert Date to string format 'YYYY-MM-DD'
  function getDateString(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 className="title">Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title of the Event:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="host">Host:</label>
            <input
              type="text"
              id="host"
              name="host"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <div className="time-row">
              <div className="time-column">
                <label htmlFor="startTime">Start Time:</label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="time-column">
                <label htmlFor="endTime">End Time:</label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
          <button type="submit" className="submit-button">
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
}
