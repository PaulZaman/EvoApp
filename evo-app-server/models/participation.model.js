const { Sequelize, DataTypes, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
	const Participation = sequelize.define("participation", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		userId: {
			type: DataTypes.INTEGER,
		},
		eventId: {
			type: DataTypes.INTEGER,
		},
		accepted: {
			type: DataTypes.BOOLEAN,
		}
	}, { timestamps: true });

	return Participation;
};