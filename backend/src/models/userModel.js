import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING(20),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(50),
    },
    birth_date: {
      type: DataTypes.DATEONLY,
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    // Array: Only available in PostgreSQL
    direction: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    email: {
      type: DataTypes.STRING(254),
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
  },
  { timestamps: true }
);
