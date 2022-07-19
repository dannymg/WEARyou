import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Payment = sequelize.define(
  "payment",
  {
    code: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    card: {
      type: DataTypes.STRING(16),
    },
    payment_date: {
      type: DataTypes.DATEONLY,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    description: {
      type: DataTypes.STRING(200),
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
  },
  // Don't save fields createdAt and updatedAt
  { timestamps: false }
);
