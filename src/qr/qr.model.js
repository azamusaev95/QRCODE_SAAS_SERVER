import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Qr = sequelize.define(
  "Qr",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: { type: DataTypes.UUID, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false }, // "Ресторан", "Бар"
    publicId: { type: DataTypes.STRING, unique: true, allowNull: false }, // Код для ссылки
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  { tableName: "qrs", underscored: true, timestamps: true }
);

export default Qr;
