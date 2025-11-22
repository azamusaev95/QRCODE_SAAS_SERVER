import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    businessName: { type: DataTypes.STRING, allowNull: false },
    plan: { type: DataTypes.STRING, defaultValue: "free" },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: "users", underscored: true, timestamps: true }
);

export default User;
