import mongoose from "mongoose";

const programExpenseItemSchema = new mongoose.Schema(
  {
    // Main Program
    programExpense: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProgramExpense",
      required: true,
    },

    // Staff who submitted the expense
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Expense date
    expenseDate: {
      type: Date,
      required: true,
    },

    // Expense category
    category: {
      type: String,
      required: true,
      trim: true,
    },

    // Expense description
    description: {
      type: String,
      required: true,
      trim: true,
    },

    // Expense amount
    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Admin approval status
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    // Reason/comment by Admin
    adminRemark: {
      type: String,
      default: "",
      trim: true,
    },

    // Admin who approved/rejected
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    // Approval/rejection date
    verifiedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ProgramExpenseItem = mongoose.model(
  "ProgramExpenseItem",
  programExpenseItemSchema
);

export default ProgramExpenseItem;