export const ShedulleModel = (sequelize, Sequelize) => {
  const Shedulle = sequelize.define('shedulle', {
    time_start: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    time_end: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lesson: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    worker: {
      type: Sequelize.STRING,
    },
    org_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    date_start: {
      type: Sequelize.DATE,
    },
    date_end: {
      type: Sequelize.DATE,
    },
    group_size: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }

  });
  return Shedulle;
};