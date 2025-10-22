import express from "express";
import {
  saveProject,
  getProjectById,
  getProjectsByUser,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.post("/save", saveProject);
router.get("/:id", getProjectById);
router.get("/user/:userId", getProjectsByUser);
router.delete("/:id", deleteProject);

export default router;
