export const SectionModel = (sequelize, Sequelize) => {
  const Section = sequelize.define("section", {
    name: {
        type: Sequelize.STRING
    },
    maxCount: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    costInfo: {
        type: Sequelize.STRING
    },
    owner_id: {
        type: Sequelize.INTEGER
    },
    creater_id: {
        type: Sequelize.INTEGER
    },
    address: {
        type: Sequelize.STRING
    },
    awatar_id: {
        type: Sequelize.INTEGER
    },
    phone: {
        type: Sequelize.STRING
    },
    second_phone: {
        type: Sequelize.STRING
    },
    director_name: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE,
        default: new Date(),
    },
  });
  return Section;
};
