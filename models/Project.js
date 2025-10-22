import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    // User ID (string, default to "anonymous")
    userId: { type: String, default: "anonymous" },

    // Project name (required)
    name: { type: String, required: true },

    // Optional description
    description: { type: String, default: "" },
  },
  {
    // Automatically add createdAt and updatedAt timestamps
    timestamps: true,
  }
);

// Export the model
const Project = mongoose.model("Project", projectSchema);

export default Project;
