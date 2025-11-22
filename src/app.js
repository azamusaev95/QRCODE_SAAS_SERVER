import express from "express";
import cors from "cors";
import { sequelize } from "./models/index.js";

import userRoutes from "./user/user.routes.js";
import qrRoutes from "./qr/qr.routes.js";
import feedbackRoutes from "./feedback/feedback.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// 👇 ИЗМЕНЕНИЕ ЗДЕСЬ: Явная настройка CORS
app.use(
  cors({
    origin: "*", // Разрешаем запросы с любого сайта (для тестов)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Разрешенные методы
    allowedHeaders: ["Content-Type", "Authorization"], // Разрешаем передачу токена
    credentials: true, // Разрешаем куки/заголовки безопасности
  })
);
// 👆 КОНЕЦ ИЗМЕНЕНИЙ

app.use(express.json());

// Роуты
app.use("/api/user", userRoutes);
app.use("/api/qr", qrRoutes);
app.use("/api/feedback", feedbackRoutes);

app.get("/", (req, res) => res.send("API is running..."));

// Запуск
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("✅ DB Connected & Synced");

    // 👇 ДОБАВИЛ '0.0.0.0' — это важно для Docker/Railway, чтобы сервер был доступен извне
    app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server on port ${PORT}`));
  } catch (e) {
    console.error("❌ DB Error:", e);
  }
};

start();
