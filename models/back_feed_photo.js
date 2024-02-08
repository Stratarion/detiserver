export const BackFeedPhotoModel = (sequelize, Sequelize) => {
  const BackFeedPhoto = sequelize.define("back_feed_photo", {
    back_feed_id: {
      type: Sequelize.INTEGER,
    },
    path: {
      type: Sequelize.STRING,
    },
    sort_order: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      type: Sequelize.DATE,
      default: new Date(),
    },
  });
  return BackFeedPhoto;
};