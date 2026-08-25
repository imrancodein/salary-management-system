
import { useEffect, useState } from "react";
import StaffLayout from "../../layouts/StaffLayout";
import { changePassword } from "../../services/auth.service";

import {
  getProfile,
  updateProfile,
} from "../../services/staff.service";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
const [photoPreview, setPhotoPreview] = useState(null);
// const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    phone: "",
    address: "",
    emergencyContact: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    loadProfile();
  }, []);

 const loadProfile = async () => {
  try {
    const response = await getProfile();

    const updatedUser = response.data;

    setProfile(updatedUser);

    setFormData({
      phone: updatedUser?.phone || "",
      address: updatedUser?.address || "",
      emergencyContact:
        updatedUser?.emergencyContact || "",
    });

    // Update localStorage user data
    const oldUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    const newUser = {
      ...oldUser,
      ...updatedUser,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(newUser)
    );

    // Tell StaffHeader that user data changed
    window.dispatchEvent(new Event("userUpdated"));
  } catch (error) {
    console.error("Profile Error:", error);
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
// handleUpdateProfile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const uploadData = new FormData();

uploadData.append("phone", formData.phone);
uploadData.append("address", formData.address);
uploadData.append(
  "emergencyContact",
  formData.emergencyContact
);

if (selectedPhoto) {
  uploadData.append("profilePhoto", selectedPhoto);
}
const response = await updateProfile(uploadData);

alert(response.message);

// Get updated user data
const updatedUser = response.data?.staff || response.data?.user;

if (updatedUser) {
  localStorage.setItem("user", JSON.stringify(updatedUser));

  // Update current tab/header immediately
  window.dispatchEvent(new Event("userUpdated"));
}

await loadProfile();

setActiveTab("profile");

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

 const handleChangePassword = async (e) => {
  e.preventDefault();

  if (
    !passwordData.currentPassword ||
    !passwordData.newPassword ||
    !passwordData.confirmPassword
  ) {
    alert("Please fill all password fields.");
    return;
  }

  if (
    passwordData.newPassword !==
    passwordData.confirmPassword
  ) {
    alert("New password and confirm password do not match.");
    return;
  }

  if (passwordData.newPassword.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }

  try {
    setSaving(true);

    const response = await changePassword({
      oldPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword,
      confirmPassword: passwordData.confirmPassword,
    });

    alert(response.message);

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setActiveTab("profile");

  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Failed to change password."
    );
  } finally {
    setSaving(false);
  }
};

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <StaffLayout>
        <div className="flex justify-center items-center min-h-[300px]">
          <p className="text-gray-500">
            Loading profile...
          </p>
        </div>
      </StaffLayout>
    );
  }

  if (!profile) {
    return (
      <StaffLayout>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <p className="text-red-500">
            Profile not found.
          </p>
        </div>
      </StaffLayout>
    );
  }

 const profilePhoto = profile.profilePhoto
  ? `http://localhost:5000${profile.profilePhoto}`
  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
      profile.name || "Staff"
    )}&background=2563eb&color=ffffff&size=200`;

  return (
    <StaffLayout>
      <div className="w-full max-w-5xl mx-auto">

        {/* PAGE TITLE */}
        <div className="mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            My Profile
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage your personal information and account
            settings.
          </p>
        </div>

        {/* PROFILE HEADER */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          <div className="p-5 sm:p-7">

            <div className="flex  sm:flex-row items-center sm:items-center gap-5">

              {/* PROFILE PHOTO */}
              <div className="flex-shrink-0">
                <label
  htmlFor="profilePhoto"
  className="relative block w-24 h-24 sm:w-28 sm:h-28 rounded-full cursor-pointer group"
>
  <img
    src={photoPreview || profilePhoto}
    alt={profile.name}
    className="w-full h-full rounded-full object-cover border-4 border-white shadow-md ring-2 ring-blue-100"
  />

  {/* Hover Overlay */}
  {/* <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
    <span className="text-white text-xs font-semibold">
      Change
    </span>
  </div> */}
</label>
                {activeTab === "edit" && (
  <div className="mt-3 text-center">
    <label
      htmlFor="profilePhoto"
      className="text-sm text-gray-600 hover:text-blue-600 hover:underline cursor-pointer"
    >
      Change Photo
    </label>

    <input
      id="profilePhoto"
      type="file"
      accept="image/jpeg,image/png,image/webp"
      className="hidden"
      onChange={(e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
          alert("Photo size must be less than 2MB.");
          return;
        }

        setSelectedPhoto(file);
        setPhotoPreview(URL.createObjectURL(file));
      }}
    />
  </div>
)}
              </div>

              {/* NAME + DESIGNATION */}
              <div className="sm:text-left">

                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  {profile.name || "-"}
                </h2>

                <p className="text-sm sm:text-base text-blue-600 font-medium mt-1">
                  {profile.designation ||
                    (profile.role === "staff"
                      ? "Staff"
                      : profile.role) ||
                    "-"}
                </p>

                {profile.department?.name && (
                  <p className="text-sm text-gray-500 mt-1">
                    {profile.department.name} Department
                  </p>
                )}

              </div>

            </div>
          </div>

          {/* TABS */}
          <div className="border-t border-gray-100">

            <div className="flex overflow-x-auto scrollbar-hide">

              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 min-w-[120px] px-4 py-4 text-sm font-semibold whitespace-nowrap transition ${
                  activeTab === "profile"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/40"
                    : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                Profile Info
              </button>

              <button
                onClick={() => setActiveTab("edit")}
                className={`flex-1 min-w-[120px] px-4 py-4 text-sm font-semibold whitespace-nowrap transition ${
                  activeTab === "edit"
                    ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/40"
                    : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                Edit Profile
              </button>

 <button
  type="button"
  onClick={() => setActiveTab("password")}
  className={`flex-1 min-w-[140px] px-4 py-4 text-sm font-semibold whitespace-nowrap transition ${
    activeTab === "password"
      ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/40"
      : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
  }`}
>
  Change Password
</button>

            </div>

          </div>
        </div>

        {/* TAB CONTENT */}
        <div className="mt-5">

          {/* ===================================== */}
          {/* PROFILE INFO */}
          {/* ===================================== */}

          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-7">

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Personal Information
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Your employment and personal details
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                {/* EMPLOYEE ID */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Employee ID
                  </p>

                  <p className="text-sm font-semibold text-gray-800 bg-gray-50 rounded-lg p-3">
                    {profile.employeeId || "-"}
                  </p>
                </div>

                {/* NAME */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Full Name
                  </p>

                  <p className="text-sm font-semibold text-gray-800 bg-gray-50 rounded-lg p-3">
                    {profile.name || "-"}
                  </p>
                </div>

                {/* EMAIL */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Email Address
                  </p>

                  <p className="text-sm font-semibold text-gray-800 bg-gray-50 rounded-lg p-3 break-all">
                    {profile.email || "-"}
                  </p>
                </div>

                {/* PHONE */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Phone Number
                  </p>

                  <p className="text-sm font-semibold text-gray-800 bg-gray-50 rounded-lg p-3">
                    {profile.phone || "-"}
                  </p>
                </div>

                {/* DEPARTMENT */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Department
                  </p>

                  <p className="text-sm font-semibold text-gray-800 bg-gray-50 rounded-lg p-3">
                    {profile.department?.name || "-"}
                  </p>
                </div>

                {/* DESIGNATION */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Designation
                  </p>

                  <p className="text-sm font-semibold text-gray-800 bg-gray-50 rounded-lg p-3">
                    {profile.designation ||
                      (profile.role === "staff"
                        ? "Staff"
                        : profile.role) ||
                      "-"}
                  </p>
                </div>

                {/* JOINING DATE */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Joining Date
                  </p>

                  <p className="text-sm font-semibold text-gray-800 bg-gray-50 rounded-lg p-3">
                    {formatDate(profile.joiningDate)}
                  </p>
                </div>

                {/* STATUS */}
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Status
                  </p>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        profile.status
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {profile.status
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </div>
                </div>

                {/* ADDRESS */}
                <div className="sm:col-span-2">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Address
                  </p>

                  <p className="text-sm font-semibold text-gray-800 bg-gray-50 rounded-lg p-3 min-h-[48px]">
                    {profile.address || "-"}
                  </p>
                </div>

                {/* EMERGENCY CONTACT */}
                <div className="sm:col-span-2">
                  <p className="text-xs font-medium text-gray-500 mb-1">
                    Emergency Contact
                  </p>

                  <p className="text-sm font-semibold text-gray-800 bg-gray-50 rounded-lg p-3">
                    {profile.emergencyContact || "-"}
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* ===================================== */}
          {/* EDIT PROFILE */}
          {/* ===================================== */}

          {activeTab === "edit" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-7">

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Edit Profile
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Update the information you are allowed to
                  change.
                </p>
              </div>

              <form
                onSubmit={handleUpdateProfile}
                className="space-y-5"
              >

                {/* PHONE */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>

                {/* ADDRESS */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your address"
                  />
                </div>

                {/* EMERGENCY CONTACT */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact
                  </label>

                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter emergency contact"
                  />
                </div>

                {/* BUTTON */}
                <div className="pt-2">

                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold px-6 py-3 rounded-lg transition"
                  >
                    {saving
                      ? "Saving..."
                      : "Save Changes"}
                  </button>

                </div>

              </form>
            </div>
          )}

          {/* ===================================== */}
          {/* CHANGE PASSWORD */}
          {/* ===================================== */}

          {activeTab === "password" && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 sm:p-7">

              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800">
                  Change Password
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Keep your account secure with a strong
                  password.
                </p>
              </div>

              <form
                onSubmit={handleChangePassword}
                className="max-w-xl space-y-5"
              >

                {/* CURRENT PASSWORD */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>

                  <input
                    type="password"
                    name="currentPassword"
                    value={
                      passwordData.currentPassword
                    }
                    onChange={handlePasswordChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter current password"
                  />
                </div>

                {/* NEW PASSWORD */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>

                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter new password"
                  />
                </div>

                {/* CONFIRM PASSWORD */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={
                      passwordData.confirmPassword
                    }
                    onChange={handlePasswordChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm new password"
                  />
                </div>

                {/* BUTTON */}
                <div className="pt-2">

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
                  >
                    Change Password
                  </button>

                </div>

              </form>
            </div>
          )}

        </div>
      </div>
    </StaffLayout>
  );
};

export default Profile;

