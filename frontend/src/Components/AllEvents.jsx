import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/AllEventsStyles.css";
import EventModal from "./EventModal";
import AddEventModal from "./AddEventModal";
import Navbar from "./NavBar";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "https://ctse-event-service-backend-d.azurewebsites.net/event/eventsList"
        );
        setEvents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, []);

  function formatTime(time) {
    return new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatDate(date) {
    const eventDate = new Date(date);
    const day = eventDate.getDate();
    const month = eventDate.toLocaleString("default", { month: "long" });
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
    return { day: `${day}${suffix}`, month };
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

  return (
    <div className="container">
      <Navbar />
      <div className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-overlay">
          <h1 className="hero-heading">Event Schedule</h1>
        </div>
      </div>
      <div className="background-grey">
        <button className="add-event-button" onClick={handleOpenAddEventModal}>
          Add Event to the Venue
        </button>
        <div className="event-list">
          {events.map((event) => (
            <div
              key={event._id}
              className="event"
              onClick={() => handleOpenModal(event)}
            >
              <div className="date-column">
                <div className="date-box">
                  <div className="day">{formatDate(event.date).day}</div>
                  <div className="month">{formatDate(event.date).month}</div>
                </div>
              </div>
              <div className="time-column">
                <div>
                  {formatTime(event.startTime)} - <br />
                  {formatTime(event.endTime)}
                </div>
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
          <EventModal event={selectedEvent} onClose={handleCloseModal} />
        </>
      )}
      {addEventModalOpen && (
        <>
          <div className="backdrop" onClick={handleCloseAddEventModal}></div>
          <AddEventModal onClose={handleCloseAddEventModal} />
        </>
      )}
    </div>
  );
}
