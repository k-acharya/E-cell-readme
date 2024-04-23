const { ApiError, ApiResponse } = require("../../Utils/ApiError.js");
const { asyncHandler } = require("../../Utils/asyncHandler.js");
const { Events } = require("../../Models/Events.models.js")

const addEvents = asyncHandler(async (req, res, next) => {

   try {
    const { moduleName, organizers, eventName, venue, eventDetails } = req.body;

    if (!moduleName || !organizers || !eventName || !venue || !eventDetails) {
        throw new ApiError(400, "All fields are required.");
    }

    const existedEvent = await Events.findOne({ eventName });

    if(existedEvent){
        throw new ApiError(409, "Event already registered!")
    }

    const newEvent = await Events.create({
        moduleName,
        organizers,
        eventName,
        venue,
        eventDetails
    })

    return res.status(201).json(
        {
            msg:"Event added successfully.",
            data:newEvent
        }
    );

   } catch (error) {
    res.json({
        error
    }).status(500)
   }

});

const allEvents = asyncHandler(async (req, res) => {

    const events = await Events.find();

    return res.status(200).json(
        {
            msg:"Ok!",
            data:events
        }
    );
});

module.exports = {
    addEvents,
    allEvents
};
