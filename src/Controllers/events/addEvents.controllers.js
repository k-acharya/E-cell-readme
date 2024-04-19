const { ApiError } = require("../../Utils/ApiError.js");
const { asyncHandler } = require("../../Utils/asyncHandler.js");
const Event = require("../../Models/UserModel.js")

const addEvents = asyncHandler(async (req, res, next) => {

    const { moduleName, organizers, eventName, venue, eventDetails } = req.body;

    if (!moduleName || !organizers || !eventName || !venue || !eventDetails) {
        throw new ApiError(400, "All fields are required.");
    }

    // const existedEvent = await Event.findOne({ eventName });

    // if(existedEvent){
    //     throw new ApiError(409, "Event already registered!")
    // }

    const newEvent = await Event.create({
        moduleName,
        organizers,
        eventName,
        venue,
        eventDetails
    })

    return res.status(201).json(
        new ApiResponse(200, newEvent, "Event Added Successfully!")
    );


});

const allEvents = asyncHandler(async (req, res) => {

    const events = await Event.find();

    return res.status(200).json(
        new ApiResponse(200, events, "Ok!")
    );
});

module.exports = {
    addEvents,
    allEvents
};
