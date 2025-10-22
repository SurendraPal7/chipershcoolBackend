// routes/userRoutes.js
import express from "express";

const router = express.Router();

// In-memory users array
let users = [];

// POST /api/users/register
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
    password, // storing plain password for simplicity (not recommended in production)
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

export default router;
