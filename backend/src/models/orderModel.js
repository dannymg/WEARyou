import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Detail } from "./detailModel.js";
import { Payment } from "./paymentModel.js";

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
    estate: {
      type: DataTypes.STRING(10),
    },
  },
  // Don't save fields createdAt and updatedAt
  { timestamps: false }
);

Payment.hasOne(Order, {
  foreignKey: "payment_code",
  sourceKey: "code",
});

Order.belongsTo(Payment, {
  foreignKey: "payment_code",
  targetId: "code",
});

Detail.hasOne(Order, {
  foreignKey: "detail_code",
  sourceKey: "code",
});

Order.belongsTo(Detail, {
  foreignKey: "detail_code",
  targetId: "code",
});
