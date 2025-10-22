// routes/fileRoutes.js
import express from "express";
import {
  createFile,
  getFilesByProject,
  updateFile,
  deleteFile,
} from "../controllers/fileController.js";
// import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All file operations are private
router.post("/",  createFile);
router.get("/:projectId",  getFilesByProject);
router.put("/:id",  updateFile);
router.delete("/:id",  deleteFile);

export default router;
