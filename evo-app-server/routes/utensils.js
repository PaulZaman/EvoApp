var express = require('express');
var router = express.Router();
const utensils = require("../controllers/utensil.controller.js");

// Create a new User
router.post("/", utensils.create);

// Retrieve all Users
router.get("/", utensils.findAll);

// find particular user by id
router.get("/find", utensils.findOne);

router.get("/del", utensils.deleteAll);

module.exports = router;

