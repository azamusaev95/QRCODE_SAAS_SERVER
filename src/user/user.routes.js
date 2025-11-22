import { Router } from "express";
import { registerUser, loginUser } from "./user.controller.js"; // <-- Добавь loginUser

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser); // <-- Новый роут

// router.get('/profile', ...) — сделаем позже с проверкой токена

export default router;
