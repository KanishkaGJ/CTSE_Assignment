import React, { useState } from "react";
import "./css/EventModalStyles.css";
import axios from "axios";
import EditEventModal from "./EditEventModal"; // Import the EditEventModal component

export default function EventModal({ event, onClose }) {
  const [showEditModal, setShowEditModal] = useState(false);

  // Function to format the time from a Date object
  const formatTime = (timeString) => {
    const time = new Date(timeString);
    return time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Function to format the date as '16th April 2024'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
    return `${day}${suffix} ${month} ${year}`;
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(
          `https://ctse-event-service-backend-d.azurewebsites.net/event/eventDelete/${event._id}`
        );
        alert("Event deleted successfully.");
        onClose();
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2 className="title">{event.title}</h2>
        <div className="description">{event.description}</div>
        <div className="horizontal-line"></div>
        <div className="event-details">
          <div className="time">
            <p className="date-time">
              Start Time: {formatTime(event.startTime)}
            </p>
            <p className="date-time">End Time: {formatTime(event.endTime)}</p>
          </div>
          <div className="host-date">
            <div className="host">
              <p className="date-time">Host: {event.host}</p>
            </div>
            <div className="date">
              <p className="date-time">Date: {formatDate(event.date)}</p>
            </div>
          </div>
        </div>
        <div className="horizontal-line"></div>
        <div className="buttons-container">
          <button className="edit-button" onClick={handleEditClick}>
            Edit Event
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete Event
          </button>
        </div>
      </div>
      {showEditModal && (
        <EditEventModal event={event} onClose={() => setShowEditModal(false)} />
      )}
    </div>
  );
}
