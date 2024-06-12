export const OrganisationModel = (sequelize, Sequelize) => {
  const Organisation = sequelize.define("organisation", {
    name: {
        type: Sequelize.STRING
    },
    maxCount: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    isSchool: {
        type: Sequelize.BOOLEAN
    },
    phone: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    schoolType: {
        type: Sequelize.STRING
    },
    theme: {
        type: Sequelize.STRING
    },
    repetitionType: {
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
    geo1: {
        type: Sequelize.DOUBLE
    },
    geo2: {
        type: Sequelize.DOUBLE
    },
    createdAt: {
        type: Sequelize.DATE,
        default: new Date(),
    },
  });
  return Organisation;
};
