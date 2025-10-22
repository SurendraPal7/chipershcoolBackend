// routes/userRoutes.js
import express from "express";

const router = express.Router();

// In-memory users array
let users = [];

// ✅ POST /api/users/register
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already registered" });
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password, // storing plain password for simplicity
  };

  users.push(newUser);

  res.status(201).json({
    data: {
      id: newUser.id,
      name: newUser.name,
    },
    message: "User registered successfully",
  });
});

// ✅ POST /api/users/login (👉 add this route)
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      token: "fake-jwt-token", // you can later replace this with real JWT
    },
    message: "Login successful",
  });
});

export default router;
