import Sequelize from "sequelize";

const database = process.env.DB_NAME || "wearyou_db";
const username = process.env.DB_USERNAME || "wearyou_user";
const password = process.env.DB_PASSWORD || "";
const host = process.env.DB_HOST || "localhost";

export const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "postgres",
});
