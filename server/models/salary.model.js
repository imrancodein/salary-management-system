import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    staff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    month: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    basicSalary: {
      type: Number,
      required: true,
      default: 0,
    },

    bonus: {
      type: Number,
      default: 0,
    },

    deduction: {
      type: Number,
      default: 0,
    },

    netSalary: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Paid", "Unpaid"],
      default: "Unpaid",
    },
    paymentDate: {
  type: Date,
},

paymentMode: {
  type: String,
  enum: ["Cash", "Bank", "UPI", "Cheque"],
},

paidBy: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
},

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Salary", salarySchema);