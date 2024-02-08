export const BackFeedModel = (sequelize, Sequelize) => {
    const BackFeed = sequelize.define("back_feed", {
      creator: {
        type: Sequelize.INTEGER,
      },
      rate: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      garten_id: {
        type: Sequelize.INTEGER,
      },
      create_date: {
        type: Sequelize.DATE,
        default: new Date(),
      },
    });
    return BackFeed;
  }