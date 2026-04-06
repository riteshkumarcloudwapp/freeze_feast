import { Sequelize } from "sequelize";
import config from "../common/config/envConfig.js";

//db url
const DATABASE_URL = `mysql://${encodeURIComponent(config.DB_USER)}:${encodeURIComponent(
  config.DB_PASSWORD,
)}@${config.DB_HOST}/${config.DB_NAME}`;

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "mysql", // IMPORTANT → tells Sequelize we are using MySQL dialect
  //tells Sequelize which database type you are using.
  //mysql2 is a driver for mysql
  //Sequelize needs a driver package to connect to MySQL. ie is mysql2

  pool: {
    max: 5, // Maximum number of connections
    min: 0, // Minimum number of connections
    acquire: 30000, // Maximum time (ms) to get connection
    idle: 10000, // Maximum time (ms) connection can be idle
  },
});

export { sequelize, DATABASE_URL };
