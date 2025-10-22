import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    projectId: { type: String, required: true },
    parentId: { type: String, default: null },
    name: { type: String, required: true },
    type: { type: String, enum: ["file", "folder"], required: true },
    content: { type: String, default: "" },
    s3Key: { type: String, default: null },
  },
  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);
export default File;
