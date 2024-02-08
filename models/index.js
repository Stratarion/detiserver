import { dbConfig } from "../config/db.config.js";
import { Sequelize } from "sequelize";
import { TutorialModel } from "./tutorial.model.js";
import { PostModel } from "./post.model.js";
import { UserModel } from "./user.model.js";
import { UserAvatarModel } from "./user_avatar.model.js";
import { GartenModel } from "./gartens.model.js";
import { GartenAvatarModel } from "./garten_avatar.model.js";
import { GartenPhotoModel } from "./garten_photo.model.js";
import { BackFeedModel } from "./back_feed.model.js";
import { BackFeedPhotoModel } from "./back_feed_photo.js";
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    underscored: false,
    freezeTableName: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
    timestamps: true
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.tutorials = TutorialModel(sequelize, Sequelize);
db.posts = PostModel(sequelize, Sequelize);
db.user = UserModel(sequelize, Sequelize);
db.garten = GartenModel(sequelize, Sequelize);
db.user_avatar = UserAvatarModel(sequelize, Sequelize);
db.garten_avatar = GartenAvatarModel(sequelize, Sequelize);
db.garten_photo = GartenPhotoModel(sequelize, Sequelize);
db.back_feed = BackFeedModel(sequelize, Sequelize);
db.back_feed_photo = BackFeedPhotoModel(sequelize, Sequelize);
export default db;
