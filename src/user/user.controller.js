import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Генерация токена (функция-помощник)
const generateToken = (id, email) => {
  return jwt.sign(
    { id, email },
    process.env.JWT_SECRET,
    { expiresIn: "24h" } // Токен живет 24 часа
  );
};

export const registerUser = async (req, res) => {
  try {
    const { email, password, businessName } = req.body;

    // 1. Валидация
    if (!email || !password || !businessName) {
      return res.status(400).json({ message: "Заполните все поля" });
    }

    // 2. Проверка, есть ли такой юзер
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Такой email уже зарегистрирован" });
    }

    // 3. Хеширование пароля (шифруем)
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // 4. Создание пользователя
    const newUser = await User.create({
      email,
      businessName,
      password: hashPassword,
    });

    // 5. Создаем токен сразу, чтобы юзер вошел автоматически
    const token = generateToken(newUser.id, newUser.email);

    return res.status(201).json({
      message: "Успешная регистрация",
      token, // Этот токен фронтенд сохранит (в localStorage)
      user: {
        id: newUser.id,
        email: newUser.email,
        businessName: newUser.businessName,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};

// Добавим и Логин сразу, пригодится
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ищем юзера
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Неверный email или пароль" });
    }

    // Сверяем пароль
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Неверный email или пароль" });
    }

    const token = generateToken(user.id, user.email);

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        businessName: user.businessName,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};
