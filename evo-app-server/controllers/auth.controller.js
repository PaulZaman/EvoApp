const users = require("./user.controller.js");
const sessions = require("./session.controller");

exports.login = async (req, res) => {
	let user = await users.findByEmail(req, res);
	if (user) {
		user = user.dataValues
		// if the user exists and password matches
		if (user && user.id && user.password == req.body.password) {

			// search for a session for this user
			let session = await sessions.findByUserId(user.id)

			// if there is a session, check if it's expired
			let isTokenExpired = session ? (new Date(session.validUntil) - new Date() <= 0) : true
			var token = ""

			// if the session exists and is not expired, go on
			// else, create a session
			if (session && !isTokenExpired) {
				console.log("use existing")
				token = session.token
			} else {
				console.log("create new")
				session = await sessions.create(user.id)
				if (session) {
					token = session.token
				}
			}
			res.send(JSON.stringify({ token: token, id: user.id }))
		}
	} else {
		res.status(403).send({ error: "Access denied" })
	}
}

exports.isLoggedIn = async (req, res) => {
	var token = req.body.token
	console.log(token)
	if (token) {
		let session = await sessions.findByToken(token)
		if (session) {
			let isTokenExpired = (new Date(session.validUntil) - new Date()) <= 0
			console.log(session.validUntil, isTokenExpired)
			if (session && !isTokenExpired) {
				console.log("all good!")
				return true
			}
			console.log("token expired!")
			return false
		}
		console.log("no session!")
		return false
	}
	console.log("no token!")
	return false
}