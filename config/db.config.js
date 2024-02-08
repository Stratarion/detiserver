export const dbConfig = {
    HOST: "79.174.88.74",
    USER: "user1",
    PASSWORD: "Olepop45685@",
    DB: "db1",
    PORT: "17442",
    dialect: "mysql",
    dialectOptions: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
