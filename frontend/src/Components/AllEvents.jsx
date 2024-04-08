import React, { useState, useEffect } from "react";
import axios from "axios";
import './css/AllEventsStyles.css';
import EventModal from "./EventModal";
import AddEventModal from "./AddEventModal"; 

export default function AllEvents() {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [addEventModalOpen, setAddEventModalOpen] = useState(false); 
  
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

    const handleOpenAddEventModal = () => {
      setAddEventModalOpen(true);
    };

    const handleCloseAddEventModal = () => {
      setAddEventModalOpen(false);
    };

    return(
      <div className="container">
      <div className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-overlay">
          <h1 className="hero-heading">Event Schedule</h1>
        </div>
      </div>
      <div className="background-grey">
      <button className="add-event-button" onClick={handleOpenAddEventModal}>Add Event to the Venue</button>
      <div className="event-list">
        {events.map(event => (
          <div key={event._id} className="event" onClick={() => handleOpenModal(event)}>
            <div className="time-column">
              <div>{formatTime(event.startTime)} - <br/>{formatTime(event.endTime)}</div>
            </div>
            <div className="title-description-column">
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </div>
            <div className="host-column">
            <div className="host-name">{event.host}</div>
            </div>
          </div> 
        ))}
      </div>
      </div>
      {modalOpen && (
        <>
          <div className="backdrop" onClick={handleCloseModal}></div>
          <EventModal
            event={selectedEvent}
            onClose={handleCloseModal}
          />
        </>
      )}
      {addEventModalOpen && (
        <>
          <div className="backdrop" onClick={handleCloseAddEventModal}></div>
          <AddEventModal
            onClose={handleCloseAddEventModal}
          />
        </>
      )}
    </div>
    
    )
}
