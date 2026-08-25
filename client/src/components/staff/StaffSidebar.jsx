import {
  FaHome,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaClipboardList,
  FaUser,
  FaSignOutAlt,
  FaTimes,
  FaCalendarAlt,
  
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const StaffSidebar = ({ isOpen, setIsOpen }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const menus = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/staff/dashboard",
    },
    {
      title: "Attendance",
      icon: <FaCalendarCheck />,
      path: "/staff/attendance",
    },
    {
      title: "Salary Slip",
      icon: <FaMoneyBillWave />,
      path: "/staff/salary",
    },
    {
  title: "Leave",
  icon: <FaCalendarAlt/>,
  path: "/staff/leave",
},
    {
      title: "EOD",
      icon: <FaClipboardList />,
      path: "/staff/eod",
    },
   {
      title: "Holiday",
      icon: < FaCalendarAlt />,
      path: "/staff/holiday",
    },
    {
  title: "Program-expense",
  icon: <FaMoneyBillWave />,
  path: "/staff/program-expenses",
},
    {
      title: "Profile",
      icon: <FaUser />,
      path: "/staff/profile",
    },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static
          top-0 left-0
          h-screen
          w-64
          bg-blue-700
          text-white
          p-5
          shadow-2xl
          z-50
          transform
          transition-transform
          duration-300
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">MDSS</h1>

            <p className="text-blue-200 text-sm">
              Staff Panel
            </p>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-2xl"
          >
            <FaTimes />
          </button>
        </div>

        {/* Menu */}
        <ul className="space-y-2">
          {menus.map((menu, index) => (
            <li key={index}>
              <NavLink
                to={menu.path}
                onClick={() => {
                  setTimeout(() => {
                    setIsOpen(false);
                  }, 100);
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "bg-white text-blue-700 shadow-lg font-semibold"
                      : "hover:bg-blue-600"
                  }`
                }
              >
                {menu.icon}
                <span>{menu.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="absolute bottom-6 left-5 right-5 flex items-center gap-3 bg-red-500 hover:bg-red-600 transition-all duration-300 p-3 rounded-lg"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </>
  );
};

export default StaffSidebar;