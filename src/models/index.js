import sequelize from "../config/db.js";
import User from "../user/user.model.js";
import Qr from "../qr/qr.model.js";
import Feedback from "../feedback/feedback.model.js";

// Связи
User.hasMany(Qr, { foreignKey: "userId", as: "qrs" });
Qr.belongsTo(User, { foreignKey: "userId", as: "user" });

Qr.hasMany(Feedback, { foreignKey: "qrId", as: "feedbacks" });
Feedback.belongsTo(Qr, { foreignKey: "qrId", as: "qr" });

export { sequelize, User, Qr, Feedback };
