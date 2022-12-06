var express = require('express');
var router = express.Router();
const event = require("../controllers/event.controller.js");

// Create a new Event
router.post("/", event.create);

// get Events
router.get("/", event.findAll);

// get Event most recent
router.get("/recent", event.getRecent);

// get Event in chronological order
router.get("/chronological", event.getChronological);

// find particular event by id
router.get("/find", event.findOne);

// Delete a Event with the specified id in the request
router.get("/del", event.delete);

// Delete all Events from the database.
router.get("/delAll", event.deleteAll);





module.exports = router;