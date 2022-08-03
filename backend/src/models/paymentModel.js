import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Order } from "./orderModel.js";

export const Payment = sequelize.define(
  "payment",
  {
    // Notification has the same code than the Order
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
  { timestamps: true }
);

Order.hasOne(Payment, {
  foreignKey: "code",
  sourceKey: "code",
});

Payment.belongsTo(Order, {
  foreignKey: "code",
  targetId: "code",
});
