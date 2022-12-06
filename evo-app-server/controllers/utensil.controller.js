/* BEGIN db initialization */
const { Op } = require('Sequelize');
const dbConfig = require("../db.config.js");
const Sequelize = require("sequelize");
const connection = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle
	}
});
const Utensil = require("../models/utensil.model")(connection, Sequelize);
/* END db initialization */

// Create and Save a new Utensil
exports.create = (req, res) => {

	// Validate request
	if (!req.body.name || !req.body.kitchenNumber) {
		res.status(400).send({
			message: "Utensil must contain a name and a kitchen number !"
		});
		return;
	}

	// Create a User
	const utensil = {
		name: req.body.name,
		kitchenNumber: req.body.kitchenNumber,
	};

	// Save User in the database
	Utensil.create(utensil)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Utensil."
			});
		});

};

// Retrieve all Utensils from the database.
exports.findAll = (req, res) => {
	Utensil.findAll()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving Utensils."
			});
		});
};

// Find a single Utensil with an id
exports.findOne = (req, res) => {
	const id = req.query.id;

	Utensil.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Utensil with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Utensil with id=" + id
			});
		});
};

// Delete a Utensil with the specified id in the request
exports.delete = (req, res) => {
	const id = req.params.id;

	Utensil.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Utensil was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete Utensil with id=${id}. Maybe Utensil was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Utensil with id=" + id
			});
		});
};

// Delete all Utensils from the database.
exports.deleteAll = (req, res) => {
	Utensil.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.send({ message: `${nums} Utensils were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all Utensils."
			});
		});
};
