import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { User } from "./userModel.js";

export const Account = sequelize.define(
  "account",
  {
    // Just one account for every email
    email: {
      type: DataTypes.STRING(254),
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(20),
    },
  },
  // Don't save fields createdAt and updatedAt
  { timestamps: false }
);

// Relationships
Account.hasOne(User, {
  foreignKey: "email",
  sourceKey: "email",
});

User.belongsTo(Account, {
  foreignKey: "email",
  targetId: "email",
});
