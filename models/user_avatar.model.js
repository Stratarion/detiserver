export const UserAvatarModel = (sequelize, Sequelize) => {
  const UserAvatar = sequelize.define("user_avatar", {
    user_id: {
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
  return UserAvatar;
}