var express = require('express');
var router = express.Router();
const uses = require("../controllers/use.controller.js");

// Create a new Use
router.post("/", uses.create);


// Retrieve all Uses for a specific kitchen
router.get("/kitchen", uses.FinUseByDate);

// Retrieve all Uses
router.get("/", uses.findAll);


// Delete all Uses
router.get("/delAll", uses.delAll);

// Delete a Use with id
router.get("/delUse", uses.del);





module.exports = router;
