import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/AllEventsStyles.css';
import EventModal from "./EventModal";

export default function AllEvents() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get("http://localhost:8080/event/eventsList");
          setEvents(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchEvents();
    }, []);

    function formatTime(time) {
      return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    const handleOpenModal = (event) => {
      setSelectedEvent(event);
      setModalOpen(true);
    };

    const handleCloseModal = () => {
      setSelectedEvent(null);
      setModalOpen(false);
    };

    return(
      <div className="container">
      <div className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-overlay">
          <h1>Event Schedule</h1>
        </div>
      </div>
      <button className="add-event-button">Add Event to the Venue</button>
      <div className="event-list">
        {events.map(event => (
          <div key={event._id} className="event" onClick={() => handleOpenModal(event)}>
            <div className="time-column">
              <div>{formatTime(event.startTime)} - {formatTime(event.endTime)}</div>
            </div>
            <div className="title-description-column">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </div>
            <div className="host-column">{event.host}</div>
          </div> 
        ))}
      </div>
      {modalOpen && (
          <EventModal
            event={selectedEvent}
            onClose={handleCloseModal}
          />
        )}
    </div>
    
    )
}