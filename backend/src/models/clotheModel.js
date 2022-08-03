import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Clothe = sequelize.define(
  "clothe",
  {
    code: {
      type: DataTypes.STRING(5),
      primaryKey: true,
    },
    brand: {
      type: DataTypes.STRING(30),
    },
    color: {
      type: DataTypes.STRING(20),
    },
    size: {
      type: DataTypes.STRING(20),
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    iva: {
      type: DataTypes.BOOLEAN,
    },
    clothe_type: {
      type: DataTypes.STRING(25),
    },

    // Array: Only available in PostgreSQL
    target_public: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  { timestamps: true }
);
