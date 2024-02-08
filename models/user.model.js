export const UserModel = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    title: {
      type: Sequelize.STRING
    },
    lastOnline: {
      type: Sequelize.DATE,
      default: new Date(),
    },
    totalTime: {
      type: Sequelize.INTEGER,
    },
    isOrganisation: {
      type: Sequelize.BOOLEAN,
    },
    avatar_id: {
      type: Sequelize.INTEGER,
    },
    image: {
      type: Sequelize.BLOB,
    },
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
      default: new Date(),
    },
  });
  return User;
};