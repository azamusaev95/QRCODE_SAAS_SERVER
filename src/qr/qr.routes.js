import { Router } from "express";
import {
  createQr,
  getQrsByUser,
  getQrById,
  deleteQr,
} from "./qr.controller.js";

const router = Router();

// POST /api/qr/create
router.post("/create", createQr);

// GET /api/qr/list/:userId — Получить список (для Дашборда)
router.get("/list/:userId", getQrsByUser);

// GET /api/qr/:id — Получить один конкретный (детали)
router.get("/:id", getQrById);

// DELETE /api/qr/:id — Удалить
router.delete("/:id", deleteQr);

export default router;
