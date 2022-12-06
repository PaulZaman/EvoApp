const { Event, User, Participation, Op } = require("../models");
/* END db initialization */

// Create and Save a new Event
exports.create = async (req, res) => {
	console.log(req.body)
	// Validate request
	if (!req.body.name || !req.body.date || !req.body.location || !req.body.organisatorId) {
		res.status(400).send({
			message: "Event must have a name, date, and location  !"
		});
		return;
	}

	// verify if event alreay exists
	const condition = {
		name: req.body.name,
		organisatorId: req.body.organisatorId
	}
	let existence;
	try {
		existence = await Event.findAll({ where: condition })
	}
	catch {
		res.status(500).send({
			message:
				err.message || "Some error occurred while searching for events."
		});
		return;
	}

	if (existence.length > 0) {
		res.status(400).send({
			message: "Event already exists !"
		});
		return;
	}

	// Create an Event
	const event = {
		name: req.body.name,
		description: req.body.description,
		date: req.body.date,
		location: req.body.location,
		organisatorId: req.body.organisatorId
	};

	// Save event in the database
	Event.create(event)
		.then(data => {
			res.send(data);
			createParticipation(data.id, req.body.participants);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Event."
			});
		});
};

// Retrieve all Events from the database.
exports.findAll = (req, res) => {
	Event.findAll({
		include: [
			{
				model: Participation,
				include: [{ model: User, attributes: ['firstname', 'lastname'] }],
				attributes: ['accepted']
			},

		],
		attributes: ["name", "description", "date", "location", "organisatorId"]
	})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving events."
			});
		});
};

// Find a single Event with an id
exports.findOne = (req, res) => {
	const id = req.query.id;
	Event.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Event with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Event with id=" + id
			});
		});
};

// Delete a Event with the specified id in the request
exports.delete = (req, res) => {
	const id = req.query.id;

	Event.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Event was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Event with id=" + id
			});
		});
};

// Delete all Events from the database.
exports.deleteAll = (req, res) => {
	Event.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.send({ message: `${nums} Event were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all events."
			});
		});
};

// Get most recent event
exports.getRecent = (req, res) => {
	Event.findAll({
		order: [
			['date', 'ASC']
		],
		limit: 1
	})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving events."
			});
		});
}

// create participation instances
async function createParticipation(eventId, participants) {
	// find id's corresponding to the names of the participants
	let participantsIds = [];
	//condition = { firstname: participants[i].firstname, lastname: participants[i].lastname }
	condition = {}
	if (participants) {
		for (let i = 0; i < participants.length; i++) {
			let participant = await User.findOne({ where: condition });
			participantsIds.push(participant.id);
		}
	}

	// create new Participation instances
	for (let i = 0; i < participantsIds.length; i++) {
		const participation = {
			userId: participantsIds[i],
			eventId: eventId,
			accepted: false
		}
		try {
			await Participation.create(participation);
		}
		catch {
			console.log("error creating participation");
		}
	}
}

// get all events in chronological order
exports.getChronological = (req, res) => {
	Event.findAll({
		order: [
			['date', 'ASC']
		],
		include: [
			{
				model: Participation,
				include: [{ model: User, attributes: ['firstname', 'lastname'] }],
				attributes: ['accepted']
			},

		],
		attributes: ["name", "description", "date", "location", "organisatorId"]

	})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving events."
			});
		});
}
