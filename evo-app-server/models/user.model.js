const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        firstname: {
            type: DataTypes.STRING
        },
        lastname: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        roomnumber: {
            type: DataTypes.INTEGER
        },
        kitchenNumber: {
            type: DataTypes.INTEGER
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }

    }, { timestamps: true });

    return User;
};