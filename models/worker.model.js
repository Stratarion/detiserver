export const WorkerModel = (sequelize, Sequelize) => {
    const Worker = sequelize.define("worker", {
      name: {
        type: Sequelize.STRING
      },
      org_id: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      }
    });
    return Worker;
  };