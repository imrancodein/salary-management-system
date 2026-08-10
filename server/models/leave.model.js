import mongoose from "mongoose";

const leaveSchema = new mongoose.Schema(
  {
   staff: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
},

    leaveType: {
      type: String,
      enum: ["Casual", "Sick", "Earned"],
      required: true,
    },

    fromDate: {
      type: String,
      required: true,
    },

    toDate: {
      type: String,
      required: true,
    },

    totalDays: {
      type: Number,
      required: true,
    },

    reason: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    adminRemark: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Leave", leaveSchema);