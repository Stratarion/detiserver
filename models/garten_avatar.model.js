export const GartenAvatarModel =  (sequelize, Sequelize) => {
  const GartenAvatar = sequelize.define("garten_avatar", {
    garten_id: {
      type: Sequelize.INTEGER,
    },
    path: {
      type: Sequelize.STRING,
    },
    create_date: {
      type: Sequelize.DATE,
      default: new Date(),
    },
  });
  return GartenAvatar;
};