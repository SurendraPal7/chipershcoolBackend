import File from "../models/File.js";

export const createFile = async (req, res, next) => {
  try {
    const { projectId, parentId = null, name, type = "file", content = "" } =
      req.body;

    if (!projectId || !name)
      return res
        .status(400)
        .json({ success: false, message: "projectId & name are required" });

    const file = await File.create({ projectId, parentId, name, type, content });
    res.status(201).json({ success: true, data: file });
  } catch (error) {
    console.error("Create file error:", error);
    next(error);
  }
};

export const getFilesByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const files = await File.find({ projectId }).lean();
    res.json({ success: true, data: files });
  } catch (error) {
    console.error("Get files error:", error);
    next(error);
  }
};

export const updateFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const file = await File.findByIdAndUpdate(id, updates, { new: true });

    if (!file)
      return res
        .status(404)
        .json({ success: false, message: "File not found" });

    res.json({ success: true, data: file });
  } catch (error) {
    console.error("Update file error:", error);
    next(error);
  }
};

export const deleteFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    await File.findByIdAndDelete(id);
    res.json({ success: true, message: "File deleted successfully" });
  } catch (error) {
    console.error("Delete file error:", error);
    next(error);
  }
};
