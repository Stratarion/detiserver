export const ReviewModel = (sequelize, Sequelize) => {
	const Organisation = sequelize.define("review", {
		content: {
			type: Sequelize.STRING
		},
		createrId: {
			type: Sequelize.INTEGER
		},
		orgId: {
			type: Sequelize.INTEGER
		},
		createrName: {
			type: Sequelize.STRING
		},
		createrAvatar: {
			type: Sequelize.STRING
		},
		rating: {
			type: Sequelize.INTEGER
		},
		repliesCount: {
			type: Sequelize.INTEGER
		},
		likesCount: {
			type: Sequelize.INTEGER
		},
		createdAt: {
			type: Sequelize.DATE,
			default: new Date(),
		},
	});
	return Organisation;
};
  