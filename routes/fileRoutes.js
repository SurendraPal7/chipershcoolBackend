// routes/fileRoutes.js
import express from "express";
import {
  createFile,
  getFilesByProject,
  updateFile,
  deleteFile,
} from "../controllers/fileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All file operations are private
router.post("/", protect, createFile);
router.get("/:projectId", protect, getFilesByProject);
router.put("/:id", protect, updateFile);
router.delete("/:id", protect, deleteFile);

export default router;
