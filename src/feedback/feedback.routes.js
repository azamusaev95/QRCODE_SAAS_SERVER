import { Router } from "express";
import { submitFeedback } from "./feedback.controller.js";
const router = Router();
router.post("/submit/:publicId", submitFeedback);
export default router;
