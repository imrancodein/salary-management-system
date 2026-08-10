import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../../services/auth.service";

const ChangePassword = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("Token:", localStorage.getItem("token"));
    try {
      setLoading(true);

      const response = await changePassword(formData);

      alert(response.message);

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">

      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center mb-2">
          Change Password
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Welcome {user?.name}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            name="oldPassword"
            placeholder="Temporary Password"
            value={formData.oldPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border rounded-lg p-3"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default ChangePassword;