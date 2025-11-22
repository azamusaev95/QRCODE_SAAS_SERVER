import { User } from "../models/index.js";

export const registerUser = async (req, res) => {
  try {
    const { email, businessName } = req.body;
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: "Email busy" });

    const user = await User.create({ email, businessName });
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
