import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Order } from "./orderModel.js";
import { User } from "./userModel.js";

export const Notification = sequelize.define(
  "notification",
  {
    // Notification has the same code than the Order
    code: {
      type: DataTypes.STRING(10),
      primaryKey: true,
    },
    date_notification: {
      type: DataTypes.DATEONLY,
    },
    state: {
      type: DataTypes.STRING(10),
    },
  },
  // Don't save fields createdAt and updatedAt
  { timestamps: false }
);

Order.hasOne(Notification, {
  foreignKey: "code",
  sourceKey: "code",
});

Notification.belongsTo(Order, {
  foreignKey: "code",
  targetId: "code",
});

// User.hasMany(Notification, {
//   foreignkey: "username",
//   sourceKey: "username",
// });

Notification.belongsTo(User, {
  foreignKey: "username",
  targetId: "username",
});
