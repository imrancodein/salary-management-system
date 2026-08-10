import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const seedAdmin = async () => {
  try {
    // Check if admin already exists
    const admin = await User.findOne({ role: "admin" });

    if (admin) {
      console.log("✅ Super Admin already exists");
      return;
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // Create Admin
    await User.create({
      employeeId: "SMS000",
      name: "Super Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      isFirstLogin: false,
      status: true,
    });

    console.log("✅ Super Admin Created Successfully");
  } catch (error) {
    console.log("❌ Error Creating Super Admin");
    console.log(error.message);
  }
};

export default seedAdmin;