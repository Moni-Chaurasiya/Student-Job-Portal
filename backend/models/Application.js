import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    position: { type: String, required: true },
    status: {
      type: String,
      enum: ["In Progress", "Under Review", "Completed", "Rejected"],
      default: "In Progress",
    },
    skills: [String],
    education: [
      {
        degree: String,
        college: String,
        yearOfPassing: Number,
        percentage: Number,
      },
    ],
    experience: [
      {
        company: String,
        position: String,
        duration: String,
        description: String,
      },
    ],
    coverMessage: String,
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
