const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    host:{
        type: String,
        required: true
    },
    startTime:{
        type: Date,
        
    },
    endTime:{
        type: Date,
        
    },
    date:{
        type: Date,
        
    }
})

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;