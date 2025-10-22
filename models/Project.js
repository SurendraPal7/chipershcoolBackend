import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: { type: String, default: "anonymous" },

    name: { type: String, required: true },

    description: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
