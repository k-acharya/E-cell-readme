const { Router } = require("express");
const { addEvents, allEvents } = require("../Controllers/events/addEvents.controllers.js");

const router = Router();

router.route("/add").post(
    addEvents
);
router.route("/fetch").get(
    allEvents
);

module.exports = router;
