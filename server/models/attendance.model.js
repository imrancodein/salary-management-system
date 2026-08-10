import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
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

    checkIn: {
      type: Date,
      default: null,
    },

    checkOut: {
      type: Date,
      default: null,
    },

    workingHours: {
      type: Number,
      default: 0,
    },

    status: {
  type: String,
  enum: [
    "Present",
    "Late",
    "Half Day",
    "Absent",
  ],
  default: "Present",
},

   location: {
  type: {
    type: String,
    enum: ["Office", "Field"],
    default: "Office",
  },

  latitude: {
    type: Number,
    default: null,
  },

  longitude: {
    type: Number,
    default: null,
  },

  address: {
    type: String,
    default: "",
  },

  distance: {
    type: Number,
    default: 0,
  },
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Attendance", attendanceSchema);