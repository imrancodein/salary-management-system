import mongoose from "mongoose";

const eodSchema = new mongoose.Schema(
  {
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    todayWork: {
      type: String,
      required: true,
      trim: true,
    },

    tomorrowPlan: {
      type: String,
      default: "",
      trim: true,
    },

    // Admin ne manually add kiya hai ya nahi
    isManual: {
      type: Boolean,
      default: false,
    },

    // Kis admin ne edit/add kiya
    editedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Admin Remarks
    remarks: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("EOD", eodSchema);