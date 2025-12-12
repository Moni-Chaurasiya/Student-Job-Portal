import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    applicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    taskNumber: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    instructions: String,
    resourceUrl: String,
    deadline: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Submitted", "Completed"],
      default: "Pending",
    },
    assignedAt: { type: Date, default: Date.now },
    submittedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
