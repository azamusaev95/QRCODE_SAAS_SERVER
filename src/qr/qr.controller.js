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

export const getQrsByUser = async (req, res) => {
  try {
    const { userId } = req.params; // Берем ID из URL

    const qrs = await Qr.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]], // Сначала новые
    });

    // Добавляем полную ссылку к каждому объекту (картинку не генерим, это тяжело для списка)
    // Фронтенд сам может сгенерировать картинку из ссылки или запросить отдельно
    const result = qrs.map((qr) => ({
      ...qr.toJSON(),
      link: `${process.env.FRONTEND_URL}/f/${qr.publicId}`,
    }));

    res.json(result);
  } catch (e) {
    console.error("Get QRs Error:", e);
    res.status(500).json({ error: "Не удалось загрузить список" });
  }
};

// 2. Получить ОДИН QR код по его ID (например, для редактирования или скачивания)
export const getQrById = async (req, res) => {
  try {
    const { id } = req.params;

    const qr = await Qr.findByPk(id);

    if (!qr) {
      return res.status(404).json({ message: "QR код не найден" });
    }

    // Тут можно сгенерировать картинку, так как это один элемент
    const link = `${process.env.FRONTEND_URL}/f/${qr.publicId}`;
    const qrImage = await QRCode.toDataURL(link);

    res.json({
      ...qr.toJSON(),
      link,
      qrImage,
    });
  } catch (e) {
    console.error("Get One QR Error:", e);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

// 3. Удалить QR (бонус, точно пригодится)
export const deleteQr = async (req, res) => {
  try {
    const { id } = req.params;
    await Qr.destroy({ where: { id } });
    res.json({ message: "Успешно удалено" });
  } catch (e) {
    res.status(500).json({ error: "Не удалось удалить" });
  }
};
