export const BidsModel = (sequelize, Sequelize) => {
	const Bids =  sequelize.define('bids', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
		},
		studentId: Sequelize.STRING,
		name: Sequelize.STRING,
		avatar_url: Sequelize.STRING,
		email: Sequelize.STRING,
		phone: Sequelize.STRING,
		eventId: Sequelize.STRING,
		status: Sequelize.ENUM('active', 'cancelled'),
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE
	}, {
		timestamps: true
	});
	return Bids;
}
