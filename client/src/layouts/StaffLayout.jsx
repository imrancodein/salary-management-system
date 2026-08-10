import { useState } from "react";
import StaffSidebar from "../components/staff/StaffSidebar";
import StaffHeader from "../components/staff/StaffHeader";
import { useNavigate } from "react-router-dom";
const StaffLayout = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">

      <StaffSidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="flex-shrink-0">
          <StaffHeader
            setIsOpen={setIsOpen}
          />
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>

      </div>

    </div>
  );
};

export default StaffLayout;