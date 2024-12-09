export const ScheduleModel = (sequelize, Sequelize) => {
	const Schedule =  sequelize.define('schedule', {
		id: {
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4,
			primaryKey: true
		},
		date: Sequelize.DATEONLY,
		startTime: Sequelize.TIME,
		endTime: Sequelize.TIME,
		serviceId: Sequelize.UUID,
		teacherId: Sequelize.STRING,
		ownerId: Sequelize.STRING,
		maxParticipants: Sequelize.INTEGER,
		currentParticipants: Sequelize.INTEGER,
		status: Sequelize.ENUM('active', 'cancelled'),
		createdAt: Sequelize.DATE,
		updatedAt: Sequelize.DATE
	}, {
		timestamps: true
	});
	return Schedule;
}
