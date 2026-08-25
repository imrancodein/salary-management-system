import {
  FaTachometerAlt,
  FaUsers,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaClipboardList,
  FaSignOutAlt,
  FaBuilding,
  FaTimes,
  FaCalendarAlt,
  FaFileInvoiceDollar,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  const menus = [
    {
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin/dashboard",
    },
    {
      title: "Staff Management",
      icon: <FaUsers />,
      path: "/admin/staff",
    },
    {
      title: "Department",
      icon: <FaBuilding />,
      path: "/admin/departments",
    },
    {
      title: "Attendance",
      icon: <FaCalendarCheck />,
      path: "/admin/attendance",
    },
    {
      title: "Salary",
      icon: <FaMoneyBillWave />,
      path: "/admin/salary",
    },
    {
      title: "Leave Management",
      icon: <FaClipboardList />,
      path: "/admin/leaves",
    },
    {
      title: "EOD",
      icon: <FaClipboardList />,
      path: "/admin/eod",
    },
    {
      title: "Holiday",
      icon: <FaCalendarAlt />,
      path: "/admin/holiday",
    },
    {
      title: "program-expense",
      icon: <FaFileInvoiceDollar />,
      path: "/admin/program-expense",
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <aside
        className={`fixed md:static top-0 left-0 z-50
        h-screen w-64
        bg-blue-700 text-white p-5
        transform transition-transform duration-300
        ${
          isOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              HRMS
            </h1>

            <p className="text-sm text-blue-200 mt-1">
              MANVIYA DRISTIKON SEWA SAMITI
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
            <NavLink
              key={index}
              to={menu.path}
              onClick={() => setIsOpen(false)}
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
      </aside>
    </>
  );
};

export default Sidebar;