const { User, Op } = require("../models");

// Create and Save a new User
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.kitchenNumber || !req.body.roomnumber) {
        res.status(400).send({
            message: "User must have firstname, lastname, kitchennumber, roomnumber and email !"
        });
        return;
    }

    // Check whether email already exists
    let sameEmail;
    try {
        sameEmail = await User.findOne({ where: { email: req.body.email } })
    }
    catch {
        res.status(500).send({
            message:
                err.message || "Some error occurred while searching for user with the same email."
        });
        return;
    }

    console.log(sameEmail)

    if (sameEmail) {
        res.status(400).send({
            message: "User already exists !"
        });
        return;
    }

    // Create a User
    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        kitchenNumber: req.body.kitchenNumber,
        roomnumber: req.body.roomnumber,
        password: req.body.password
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });

};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.findAll({ attributes: ['firstname', 'lastname'] })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.query.id;

    User.findByPk(id, { attributes: ['firstname', 'lastname', "kitchenNumber", "roomnumber"] })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + id
            });
        });
};

// Find a user by email
exports.findByEmail = async (req, res) => {
    const email = req.body.email;
    var condition = email ? { email: { [Op.eq]: email } } : null;

    var result;
    await User.findOne({ where: condition })
        .then(data => {
            result = data
        })
        .catch(data => {
            result = data
        })
    return result
}

// Update a User by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating User with id=" + id
            });
        });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete User with id=${id}. Maybe User was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Users were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all users."
            });
        });
};