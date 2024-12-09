export const ServicesModel = (sequelize, Sequelize) => {
	const Services = sequelize.define('services', {
		id: {
				type: Sequelize.UUID,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
		},
		name: Sequelize.STRING,
		description: Sequelize.TEXT,
		type: Sequelize.ENUM('sport', 'development'),
		price: Sequelize.FLOAT,
		duration: Sequelize.INTEGER,
		maxStudents: Sequelize.INTEGER,
		organizationId: Sequelize.UUID,
		userId: Sequelize.UUID,
		createrName: Sequelize.STRING,
		address: Sequelize.STRING,
		createrAvatar: Sequelize.STRING,
		ageFrom: Sequelize.INTEGER,
		ageTo: Sequelize.INTEGER,
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
	}, {
		timestamps: true,
	});
	return Services;
}
