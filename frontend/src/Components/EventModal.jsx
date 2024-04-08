import React from "react";
import './css/EventModalStyles.css';

export default function EventModal ({ event, onClose }) {
  if (!event) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2 className="title">{event.title}</h2>
        <div className="description">{event.description}</div>
        <div className="horizontal-line"></div>
        <div className="time">
          <p className="date-time">Start Time: {new Date(event.startTime).toLocaleString()}</p>
          <p className="date-time">End Time: {new Date(event.endTime).toLocaleString()}</p>
        </div>
        <div className="host">
          <p className="date-time">Host: {event.host}</p>
          <p className="date-time">Date: {event.date}</p>
        </div>
      </div>
    </div>
  );
};
