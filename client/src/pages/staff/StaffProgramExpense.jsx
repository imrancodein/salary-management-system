import { useEffect, useState } from "react";
import StaffLayout from "../../layouts/StaffLayout";
import StaffProgramTable from "../../components/programExpense/StaffProgramTable";
import StaffProgramViewModal from "../../components/programExpense/StaffProgramViewModal";

import {
  getMyProgramExpenses,
} from "../../services/programExpense.service";

const StaffProgramExpense = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProgramId, setSelectedProgramId] =
    useState(null);

  const [showViewModal, setShowViewModal] =
    useState(false);

  // ========================================
  // LOAD MY PROGRAMS
  // ========================================

  const loadPrograms = async () => {
    try {
      setLoading(true);

      const response =
        await getMyProgramExpenses();

      console.log(
        "STAFF PROGRAMS:",
        response
      );

      setPrograms(response.data || []);
    } catch (error) {
      console.error(
        "Staff Program Expense Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  // ========================================
  // VIEW PROGRAM
  // ========================================

  const handleViewProgram = (id) => {
    setSelectedProgramId(id);
    setShowViewModal(true);
  };

  return (
    <StaffLayout>

      <div className="p-4 md:p-6">

        {/* HEADER */}

        <div className="mb-6">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Program Expense
          </h1>

          <p className="text-gray-500 mt-1">
            View your assigned programs and submit expenses.
          </p>

        </div>


        {/* PROGRAM TABLE */}

        <StaffProgramTable
          programs={programs}
          loading={loading}
          onView={handleViewProgram}
        />


        {/* VIEW MODAL */}

        <StaffProgramViewModal
          programId={selectedProgramId}
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedProgramId(null);
          }}
          onSuccess={loadPrograms}
        />

      </div>

    </StaffLayout>
  );
};

export default StaffProgramExpense;