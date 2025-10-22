// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import './config/db.js'; 
// Routes
import fileRoutes from "./routes/fileRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

/* ─────────── Middleware ─────────── */

// Enable CORS for frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // allows cookies and authorization headers
  })
);

// Handle preflight requests for all routes
app.options("*", cors());

app.use(express.json()); 
app.use(morgan("dev")); 

/* ─────────── API Routes ─────────── */
app.get("/", (_, res) => res.send("CipherStudio API is running"));

app.use("/api/files", fileRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/users", userRoutes);

/* ─────────── 404 Handler ─────────── */
app.use((req, res, next) => {
  res
    .status(404)
    .json({ success: false, message: `Not Found – ${req.originalUrl}` });
});

/* ─────────── Error Handler ─────────── */
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
});

/* ─────────── Start Server ─────────── */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
