export const dbConfig = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "",
    DB: "start",
    PORT: "3306",
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
