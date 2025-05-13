import express from "express";
import fs from "fs/promises";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const USERS_FILE = path.join(__dirname, "../data/users.json");

const readUsers = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const writeUsers = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
};

router.post("/register", async (req, res) => {
  const { name, lastname, email, password } = req.body;

  if (!name || !lastname || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Password : minimum 6 characters
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const users = await readUsers();
    const exists = users.find((u) => u.email === email);
    if (exists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      lastname,
      email,
      password: hashedPassword,
      role: "user",
    };
    users.push(newUser);
    await writeUsers(users);

    const token = jwt.sign({ email, role: "user" }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err });
  }
});

router.post("/login", async (req, res) => {
  const { username, email, password } = req.body;

  // Admin login
  if (username && password) {
    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.json({ token });
    } else {
      return res.status(401).json({ message: "Invalid admin credentials" });
    }
  }

  // Customer login
  if (email && password) {
    try {
      // Trim the email and password fields to prevent space-related issues
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      const users = await readUsers();
      const user = users.find((u) => u.email === trimmedEmail);

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(
        trimmedPassword,
        user.password
      );
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { email: trimmedEmail, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ message: "Login failed", error: err });
    }
  }

  return res.status(400).json({ message: "Missing login fields" });
});

export default router;
