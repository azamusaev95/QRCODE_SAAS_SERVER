import { Router } from "express";
import { createQr } from "./qr.controller.js";
const router = Router();
router.post("/create", createQr);
export default router;
