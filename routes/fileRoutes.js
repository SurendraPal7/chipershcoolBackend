import express from "express";
import {
  createFile,
  getFilesByProject,
  updateFile,
  deleteFile,
} from "../controllers/fileController.js";

const router = express.Router();

router.post("/",  createFile);
router.get("/:projectId",  getFilesByProject);
router.put("/:id",  updateFile);
router.delete("/:id",  deleteFile);

export default router;
