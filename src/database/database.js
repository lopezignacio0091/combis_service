import mysql from "mysql2/promise";
import config from "../config";

const connection = mysql.createPool({
  connectionLimit: 10,
  host: config.host,
  database: config.database,
  user: config.user,
  password: config.password,
  waitForConnections: true,
  port:config.port,
  queueLimit: 0
});

const getConnection = () => {
  console.log(config)
  return connection;
};

module.exports = {
  getConnection,
}