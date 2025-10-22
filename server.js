// server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/userRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

/* ─────────── Middleware ─────────── */

// Enable CORS for frontend
app.use(cors());



app.use(express.json());

app.use(morgan("dev"));

app.get("/", (_, res) => res.send("CipherStudio API is running"));

app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/projects", projectRoutes);

/* ─────────── 404 Handler ─────────── */
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Not Found – ${req.originalUrl}` });
});

/* ─────────── Start Server ─────────── */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
