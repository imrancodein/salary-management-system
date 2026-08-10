import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      required: true,
      unique: true,
    },

    type: {
      type: String,
      enum: [
        "National Holiday",
        "Festival",
        "NGO Holiday",
        "Optional Holiday",
      ],
      default: "National Holiday",
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Holiday",
  holidaySchema
);