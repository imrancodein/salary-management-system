import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const StaffHeader = ({ setIsOpen }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bg-white shadow px-4 md:px-6 py-4 flex justify-between items-center">

      {/* Left */}
      <div className="flex items-center gap-4">

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-2xl"
        >
          <FaBars />
        </button>

        <div>
          <h2 className="text-xl md:text-2xl font-bold">
            Welcome, {user?.name}
          </h2>

          <p className="text-gray-500 text-sm md:text-base">
            Staff Dashboard
          </p>
        </div>

      </div>

      {/* Right */}
    
<div className="flex items-center gap-4">

  {/* Date */}
<div className="block text-right">
    <p className="text-sm font-semibold text-gray-800">
      {new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </p>

    <p className="text-xs text-gray-500">
      {new Date().toLocaleDateString("en-IN", {
        weekday: "long",
      })}
    </p>
  </div>

  {/* Profile */}
  <button
    type="button"
    onClick={() => navigate("/staff/profile")}
     className="cursor-pointer"
    className="flex items-center gap-3 group"
  >

    <img
      src={
        user?.profilePhoto
          ? `http://localhost:5000${user.profilePhoto}`
          : `https://ui-avatars.com/api/?name=${encodeURIComponent(
              user?.name || "Staff"
            )}&background=2563eb&color=ffffff`
      }
      alt={user?.name || "Staff"}
      className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-500 transition"
    />

    {/* <div className="hidden md:block text-left">
      <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600">
        {user?.name}
      </p>

      <p className="text-xs text-gray-500">
        Staff
      </p>
    </div> */}

  </button>

</div>
    </div>
  );
};

export default StaffHeader;