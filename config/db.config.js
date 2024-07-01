export const dbConfig = {
    HOST: "server38.hosting.reg.ru",
    USER: "u2506423_olepopo",
    PASSWORD: "olepop456852",
    DB: "u2506423_app_vol",
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
