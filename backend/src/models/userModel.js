import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING(20),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    lastname: {
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
    // Inheritance on the same table (CLIENT, ADMIN)
    user_type: {
      type: DataTypes.STRING(8),
    },
  },
  // Don't save fields createdAt and updatedAt
  { timestamps: false }
);
