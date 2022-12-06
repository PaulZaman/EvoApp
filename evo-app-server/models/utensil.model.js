const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	const Utensil = sequelize.define("utensil", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING
		},
		kitchenNumber: {
			type: DataTypes.INTEGER
		}
	}, { timestamps: false });
	return Utensil;
};