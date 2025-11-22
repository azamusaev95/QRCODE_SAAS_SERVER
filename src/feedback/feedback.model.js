import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Feedback = sequelize.define(
  "Feedback",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    qrId: { type: DataTypes.UUID, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false }, // 1-5
    rawText: { type: DataTypes.TEXT, allowNull: true },
    category: { type: DataTypes.STRING, defaultValue: "other" },
    sentiment: { type: DataTypes.STRING, defaultValue: "neutral" }, // AI заполнит позже
  },
  { tableName: "feedbacks", underscored: true, timestamps: true }
);

export default Feedback;
