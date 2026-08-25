import mongoose from "mongoose";

const programExpenseSchema = new mongoose.Schema(
  {
    // Staff assigned to the program
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Program information
    programName: {
      type: String,
      required: true,
      trim: true,
    },

    programDate: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    // Amount given by Admin
    advanceAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Only APPROVED expenses will be counted
    totalExpense: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Advance - approved expenses
    remainingAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Amount returned by staff
    returnedAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    returnedDate: {
      type: Date,
      default: null,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "In Progress",
        "Settlement Pending",
        "Completed",
      ],
      default: "Pending",
    },

    // Admin who created the program
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProgramExpense = mongoose.model(
  "ProgramExpense",
  programExpenseSchema
);

export default ProgramExpense;