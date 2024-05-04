const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
    moduleName: {
        type: String,
        required: true,
        index: true
    },
    eventName: {
        type: String,
        required: true,
        index: true
    },
    organizers: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    eventDetails: {
        type: String,
        required: true,
    },
}, { timestamps: true }
)

const Events = mongoose.model(("Events"), eventsSchema)
module.exports={
    Events
}