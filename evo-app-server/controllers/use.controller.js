const { Use, Utensil, User, Op } = require("../models");

// Create and Save a new Use
exports.create = async (req, res) => {
	// Validate request
	if (!req.body.start || !req.body.end || !req.body.utensilname || !req.body.userId) {
		res.status(400).send({
			message: "To create a Use, must have 'userId', 'utensilname', 'start', and 'end'!"
		});
		return;
	}
	// verify if dates overlap
	const utensil = await Utensil.findAll({ where: { name: req.body.utensilname } });
	const condition = {
		utensilId: utensil[0].dataValues.id,
		start: { [Op.lte]: new Date(req.body.end) },
		end: { [Op.gte]: new Date(req.body.start) }
	}
	let overlapping;
	try {
		overlapping = await Use.findAll({ where: condition })
	}
	catch {
		res.status(500).send({
			message:
				"Some error occurred while searching for uses of utensil."
		});
		return;
	}

	if (overlapping.length > 0) {
		res.status(400).send({
			message: "The dates overlap with another Use!"
		});
		return;
	}


	// Create a use
	const use = {
		start: req.body.start,
		end: req.body.end,
		utensilId: utensil[0].dataValues.id,
		userId: req.body.userId
	};

	// Save Use in the database
	Use.create(use).then(data => { res.send(data) }).catch(err => {
		console.log(err)
		res.status(500).send({
			message:
				err.message || "Some error occurred while creating the Use."
		});
	});

};

// retrieve all uses from database
exports.findAll = (req, res) => {
	Use.findAll()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving uses."
			});
		});

}

// delete all uses from database
exports.delAll = (req, res) => {
	Use.destroy({ where: {}, truncate: false })
		.then(nums => {
			res.send({ message: `${nums} Uses were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all uses."
			});
		});
}

// delete a use from database
exports.del = (req, res) => {
	const id = req.query.id;

	Use.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Use was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete Use with id=${id}. Maybe Use was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Use with id=" + id
			});
		});
}

// get all uses for a date
exports.FinUseByDate = (req, res) => {
	const startDate = new Date(req.query.dt + " 00:00:00");
	const endDate = new Date(req.query.dt + " 23:59:59");
	// remove 4 hours to get UTC time
	startDate.setHours(startDate.getHours() - 4);
	endDate.setHours(endDate.getHours() - 4);
	Use.findAll({
		include: [
			{ model: User, attributes: ['firstname', 'lastname', 'id'] },
			{ model: Utensil, attributes: ['name'] }
		],
		attributes: ['start', 'end', 'id'],
		// add condition for start to be between startDate and endDate
		where: {
			start: { [Op.between]: [startDate, endDate] }
		}
	})
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving uses."
			});
		});
}

