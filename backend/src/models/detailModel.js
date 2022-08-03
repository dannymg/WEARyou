import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Clothe } from "./clotheModel.js";

export const Detail = sequelize.define(
  "detail",
  {
    code: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    clothes: {
      type: DataTypes.STRING(5),
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);

// Relationships
///////////////////////////////////////////////////////////////////////////////////////////
Clothe.hasMany(Detail, {
  foreignKey: "clothes",
  sourceKey: "code",
});

Detail.belongsTo(Clothe, {
  foreignKey: "clothes",
  targetId: "code",
});
