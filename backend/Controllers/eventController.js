const Event = require("../Models/Event");


//insert new user
const addNewEvent = async(req, res)=>{
    const {title, description, host, startTime, endTime} = req.body;

    const newEvent = new Event({
        title, 
        description,
        host,
        startTime,
        endTime
    });

    newEvent.save().then(()=>{
        res.json("Event Added");
    }).catch((err)=>{
        console.log(err);
    })

};

//read all the events
const viewAllEvents = async(req, res)=>{
    Event.find().then((events) => {
        res.json(events)
    }).catch((err) => {
        console.log(err)
    })
};

//get user by id
const getEventById = async(req, res)=>{
    let eventId = req.params.id;

    const user = await Event.findById(eventId)
    .then((event) => {
        res.status(200).send({status: "Event fetched", event});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error in fetching event", error: err.message});
    })

};

///update details of event
const updateEvent = async(req, res)=>{
    let eventId = req.params.id;

    const {title, description, host, startTime, endTime} = req.body;

    const updateEvent = {
        title, 
        description,
        host,
        startTime,
        endTime
    }

    //check if the event to be updated exists
    const update = await Event.findByIdAndUpdate(eventId, updateEvent)
    .then(() => {
        res.status(200).send({status: "Event Updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status : "Error in updating event", error: err.message});
    })
};

//delete a event record 
const deleteEvent = async(req, res)=>{
    let eventId = req.params.id;

    await Event.findByIdAndDelete(eventId)
    .then(() => {
        res.status(200).send({status: "Event Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error in deleting event", error: err.message});
    })
};



exports.addNewEvent = addNewEvent;
exports.viewAllEvents = viewAllEvents;
exports.getEventById = getEventById;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;

