import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Detail } from "./detailModel.js";

export const Order = sequelize.define(
  "order",
  {
    code: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DOUBLE,
    },
    date_top: {
      type: DataTypes.DATEONLY,
    },
  },
  // Don't save fields createdAt and updatedAt
  { timestamps: false }
);

Detail.hasOne(Order, {
  foreignKey: "detail_code",
  sourceKey: "code",
});

Order.belongsTo(Detail, {
  foreignKey: "detail_code",
  targetId: "code",
});
