const { Sequelize, DataTypes, Model } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
	const Use = sequelize.define("use", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		start: {
			type: DataTypes.DATE
		},
		end: {
			type: DataTypes.DATE
		},
		userId: {
			type: DataTypes.INTEGER,
		},
		utensilId: {
			type: DataTypes.INTEGER,
		}

	}, { timestamps: true });

	return Use;
};