export const GartenPhotoModel = (sequelize, Sequelize) => {
  const GartenPhoto = sequelize.define("garten_photo", {
    garten_id: {
      type: Sequelize.INTEGER,
    },
    sort_order: {
      type: Sequelize.INTEGER,
    },
    path: {
      type: Sequelize.STRING,
    },
    create_date: {
      type: Sequelize.DATE,
      default: new Date(),
    }
  });
  return GartenPhoto;
}