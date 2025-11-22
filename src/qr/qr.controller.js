import { Qr, User } from "../models/index.js";
import { nanoid } from "nanoid";
import QRCode from "qrcode";

export const createQr = async (req, res) => {
  try {
    const { userId, title } = req.body;

    // Генерируем уникальный ID (например: "xyz123")
    const publicId = nanoid(6);
    const link = `${process.env.FRONTEND_URL}/f/${publicId}`;

    // Создаем запись в БД
    const newQr = await Qr.create({ userId, title, publicId });

    // Генерируем картинку (Base64)
    const qrImage = await QRCode.toDataURL(link);

    res.status(201).json({ ...newQr.toJSON(), link, qrImage });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
