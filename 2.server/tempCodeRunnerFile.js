import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory user database (for demonstration)
const users = []; // This will store both regular users and admins

// Admin username and password (this should be stored securely in a real application)
const adminUsername = process.env.ADMIN_USERNAME || "admin";
const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

// Register endpoint (for creating an account)
app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Add new user to "database"
  users.push({ username, password, role: "user" });

  // Generate a JWT token for the new user
  const token = jwt.sign({ role: "user", username }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.json({ token });
});

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  // Check for admin credentials
  if (username === adminUsername && password === adminPassword) {
    const token = jwt.sign(
      { role: "admin", username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  }

  // Check for regular user credentials
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    const token = jwt.sign(
      { role: "user", username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return res.json({ token });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

// Protected route that requires authentication (Example: Homepage)
app.get("/api/home", verifyToken, (req, res) => {
  res.json({ message: "Welcome to the homepage!", user: req.user });
});

// Example of a protected route only accessible by admin
app.get("/api/admin", verifyToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  res.json({ message: "Welcome, Admin!", user: req.user });
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
