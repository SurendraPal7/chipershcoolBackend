import Project from "../models/Project.js";
import File from "../models/File.js";
import mongoose from "mongoose";

// Save or Update Project
export const saveProject = async (req, res, next) => {
  try {
    const { projectId, name, files } = req.body;
    const userId = req.user?._id || req.body.userId || "anonymous";

    let project;

    if (projectId) {
      if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ success: false, message: "Invalid projectId" });
      }

      project = await Project.findById(projectId);
      if (!project)
        return res.status(404).json({ success: false, message: "Project not found" });

      project.name = name || project.name;
      await project.save();
    } else {
      project = await Project.create({ name, userId });
    }

    if (Array.isArray(files)) {
      await File.deleteMany({ projectId: project._id });
      await File.insertMany(
        files.map((f) => ({
          projectId: project._id,
          parentId: f.parentId || null,
          name: f.name,
          type: f.type || "file",
          content: f.content || "",
          s3Key: f.s3Key || null,
        }))
      );
    }

    res.json({
      success: true,
      message: "Project saved successfully",
      projectId: project._id,
    });
  } catch (error) {
    console.error("Save project error:", error);
    next(error);
  }
};

// Get Project by ID
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid projectId" });

    const project = await Project.findById(id).lean();
    if (!project)
      return res.status(404).json({ success: false, message: "Project not found" });

    const files = await File.find({ projectId: id }).lean();

    res.json({ success: true, data: { project, files } });
  } catch (error) {
    console.error("Get project error:", error);
    next(error);
  }
};

// Get All Projects by User
export const getProjectsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const projects = await Project.find({ userId }).lean();
    res.json({ success: true, data: projects });
  } catch (error) {
    console.error("Get user projects error:", error);
    next(error);
  }
};

// Delete Project
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ success: false, message: "Invalid projectId" });

    await File.deleteMany({ projectId: id });
    await Project.findByIdAndDelete(id);

    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete project error:", error);
    next(error);
  }
};
