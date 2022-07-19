import Sequelize from "sequelize";

export const sequelize = new Sequelize("wearyou", "postgres", "1234", {
  host: "localhost",
  dialect: "postgres",
});
