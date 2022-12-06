const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
        },
        location: {
            type: DataTypes.STRING
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        organisatorId: {
            type: DataTypes.INTEGER
        }
    }, { timestamps: true });
    return Event;
};