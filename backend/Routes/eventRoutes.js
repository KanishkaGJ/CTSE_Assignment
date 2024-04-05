const express = require("express");

const{
    addNewEvent,
    viewAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
} = require("../Controllers/eventController");

const router = express.Router();    

router.post("/addEvent", addNewEvent);

router.get("/eventsList", viewAllEvents);

router.get("/getEvent/:id", getEventById);

router.put("/eventUpdate/:id", updateEvent);

router.delete("/eventDelete/:id", deleteEvent);

module.exports = router;