import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      unique: true,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
  type: String,
  required: true,
  trim: true,
},

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "staff"],
      default: "staff",
    },
    

   department: {
   type: mongoose.Schema.Types.ObjectId,
   ref:"Department"
},

    basicSalary: {
      type: Number,
      default: 0,
    },

    profilePhoto: {
      type: String,
      default: "",
    },


  // Status
  address: {
  type: String,
  default: "",
},

emergencyContact: {
  type: String,
  default: "",
},

bloodGroup: {
  type: String,
  default: "",
},

joiningDate: {
  type: Date,
  required: true,
},
    isFirstLogin: {
      type: Boolean,
      default: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
    resetPasswordToken: {
  type: String,
  default: null,
},

resetPasswordExpire: {
  type: Date,
  default: null,
},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;