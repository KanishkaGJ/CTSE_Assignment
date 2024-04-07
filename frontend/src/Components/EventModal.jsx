import React from "react";
import './css/EventModalStyles.css';

export default function EventModal ({ event, onClose }) {
  if (!event) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{event.title}</h2>
        <p>{event.description}</p>
        <p>Host: {event.host}</p>
        <p>Start Time: {new Date(event.startTime).toLocaleString()}</p>
        <p>End Time: {new Date(event.endTime).toLocaleString()}</p>
      </div>
    </div>
  );
};


