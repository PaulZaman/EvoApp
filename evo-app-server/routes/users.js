var express = require('express');
var router = express.Router();
const users = require("../controllers/user.controller.js");
const auth = require("../controllers/auth.controller.js");

// Create a new User
router.post("/", users.create);

// Retrieve all Users
router.get("/", users.findAll);

// find particular user by id
router.get("/find", users.findOne);

//find user by email
router.post("/findbyemail", users.findByEmail);

// delete a user
router.get("/del", users.deleteAll);


// Authentication routes
router.post("/login", auth.login);
router.post("/login/check", async (req, res) => {
	let isLoggedIn = await auth.isLoggedIn(req, res)
	if (isLoggedIn) {
		res.send(JSON.stringify({ isLoggedIn: true }))
	} else {
		res.send(JSON.stringify({ isLoggedIn: false }))
	}
});

module.exports = router;

