import { useState } from "react";
import { FaBars } from "react-icons/fa";

import Sidebar from "../components/admin/Sidebar";
import Header from "../components/admin/Header";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex-1 flex flex-col min-w-0">

        {/* Mobile Header */}
        <div className="md:hidden bg-white shadow h-16 px-4 flex items-center justify-between flex-shrink-0">

          <button
            onClick={() => setIsOpen(true)}
            className="text-2xl"
          >
            <FaBars />
          </button>

          <h2 className="font-bold text-lg">
            Admin Panel
          </h2>

          <div className="w-8" />

        </div>

        {/* Desktop Header */}
        <div className="flex-shrink-0">
          <Header />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;