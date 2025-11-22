import { Feedback, Qr } from "../models/index.js";

export const submitFeedback = async (req, res) => {
  try {
    const { publicId } = req.params;
    const { rating, text } = req.body;

    const qrPoint = await Qr.findOne({ where: { publicId } });
    if (!qrPoint) return res.status(404).json({ message: "QR not found" });

    // Простая логика тональности (заглушка под AI)
    const sentiment =
      rating >= 4 ? "positive" : rating <= 2 ? "negative" : "neutral";

    const feedback = await Feedback.create({
      qrId: qrPoint.id,
      rating,
      rawText: text,
      sentiment,
    });

    res.status(201).json({ message: "Saved", feedback });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
