import { dbConfig } from "../config/db.config.js";
import { Sequelize } from "sequelize";
import { UserModel } from "./user.model.js";
import { OrganisationModel } from "./organisation.model.js";
import { ReviewModel } from "./review.model.js";
import { ServicesModel } from "./services.model.js";
import { ScheduleModel } from "./schedule.model.js";
import { BidsModel } from "./bids.model.js";
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
db.user = UserModel(sequelize, Sequelize);
db.organisation = OrganisationModel(sequelize, Sequelize);
db.review = ReviewModel(sequelize, Sequelize);
db.services = ServicesModel(sequelize, Sequelize);
db.schedule = ScheduleModel(sequelize, Sequelize);
db.bids = BidsModel(sequelize, Sequelize);

export default db;
