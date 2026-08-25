import { useEffect, useState } from "react";
import ProgramExpenseViewModal from "../../components/programExpense/ProgramExpenseViewModal";
import AdminLayout from "../../layouts/AdminLayout";
import ProgramExpenseForm from "../../components/programExpense/ProgramExpenseForm";
import ProgramExpenseFilter from "../../components/programExpense/ProgramExpenseFilter";
import {
  getAllProgramExpenses,
} from "../../services/programExpense.service";

const ProgramExpenseManagement = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [staffFilter, setStaffFilter] = useState("");
const [statusFilter, setStatusFilter] = useState("");

  const [selectedProgramId, setSelectedProgramId] =
    useState(null);

  const [showViewModal, setShowViewModal] =
    useState(false);

  // ========================================
  // LOAD PROGRAMS
  // ========================================

  const loadPrograms = async () => {
    try {
      setLoading(true);

      const response =
        await getAllProgramExpenses();

      console.log(
        "ALL PROGRAM EXPENSES:",
        response
      );

      setPrograms(response.data || []);
    } catch (error) {
      console.error(
        "Program Expense Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to load program expenses."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // INITIAL LOAD
  // ========================================

  useEffect(() => {
    loadPrograms();
  }, []);

  // ========================================
  // VIEW PROGRAM
  // ========================================

  const handleViewProgram = (id) => {
    console.log(
      "Selected Program ID:",
      id
    );

    setSelectedProgramId(id);
    setShowViewModal(true);
  };

  // filter
  const filteredPrograms = programs.filter((program) => {
  const staffMatch =
    !staffFilter ||
    program.staff?._id === staffFilter;

  const statusMatch =
    !statusFilter ||
    program.status === statusFilter;

  return staffMatch && statusMatch;
});

  return (
    <AdminLayout>

      <div className="p-4 md:p-6">

        {/* HEADER */}

        <div className="mb-6">

          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Program Expense
          </h1>

          <p className="text-gray-500 mt-1">
            Manage staff program expenses and
            approve or reject submitted expenses.
          </p>

        </div>
        <ProgramExpenseForm
  onSuccess={loadPrograms}
/>
{/* fileter */}
<ProgramExpenseFilter
  programs={programs}
  staffFilter={staffFilter}
  statusFilter={statusFilter}
  onStaffChange={setStaffFilter}
  onStatusChange={setStatusFilter}
  onClear={() => {
    setStaffFilter("");
    setStatusFilter("");
  }}
/>

        {/* PROGRAM LIST */}

        <div className="bg-white rounded-xl shadow-md overflow-hidden">

          <div className="p-4 md:p-6 border-b">

            <h2 className="text-lg md:text-xl font-semibold text-gray-800">
              Program Expense List
            </h2>

          </div>


          {loading ? (

            <div className="p-8 text-center text-gray-500">
              Loading programs...
            </div>

          ) : programs.length === 0 ? (

            <div className="p-8 text-center text-gray-500">
              No program expenses found.
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full min-w-[900px]">

                <thead className="bg-gray-50">

                  <tr>

                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                      Staff
                    </th>

                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                      Program
                    </th>

                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                      Date
                    </th>

                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                      Location
                    </th>

                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                      Advance
                    </th>

                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                      Spent
                    </th>

                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                      Remaining
                    </th>

                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y">

                  {filteredPrograms.map((program) => (

                    <tr
                      key={program._id}
                      className="hover:bg-gray-50"
                    >

                      {/* STAFF */}

                      <td className="px-4 py-3">

                        <div className="font-medium text-gray-800">
                          {program.staff?.name || "-"}
                        </div>

                        {program.staff?.employeeId && (
                          <div className="text-xs text-gray-500">
                            {program.staff.employeeId}
                          </div>
                        )}

                      </td>


                      {/* PROGRAM */}

                      <td className="px-4 py-3 font-medium text-gray-800">
                        {program.programName || "-"}
                      </td>


                      {/* DATE */}

                      <td className="px-4 py-3">

                        {program.programDate
                          ? new Date(
                              program.programDate
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )
                          : "-"}

                      </td>


                      {/* LOCATION */}

                      <td className="px-4 py-3">
                        {program.location || "-"}
                      </td>


                      {/* ADVANCE */}

                      <td className="px-4 py-3 font-semibold text-blue-600">

                        ₹
                        {Number(
                          program.advanceAmount || 0
                        ).toLocaleString("en-IN")}

                      </td>


                      {/* SPENT */}

                      <td className="px-4 py-3 font-semibold text-orange-600">

                        ₹
                        {Number(
                          program.totalExpense || 0
                        ).toLocaleString("en-IN")}

                      </td>


                      {/* REMAINING */}

                      <td className="px-4 py-3 font-semibold text-green-600">

                        ₹
                        {Number(
                          program.remainingAmount || 0
                        ).toLocaleString("en-IN")}

                      </td>


                      {/* STATUS */}

                      <td className="px-4 py-3">

                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                            program.status ===
                            "Completed"
                              ? "bg-green-100 text-green-700"
                              : program.status ===
                                "Settlement Pending"
                              ? "bg-orange-100 text-orange-700"
                              : program.status ===
                                "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {program.status ||
                            "Pending"}
                        </span>

                      </td>


                      {/* VIEW */}

                      <td className="px-4 py-3">

                        <button
                          type="button"
                          onClick={() =>
                            handleViewProgram(
                              program._id
                            )
                          }
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                        >
                          View
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>


        {/* ==================================
            VIEW MODAL
        ================================== */}

        <ProgramExpenseViewModal
          programId={selectedProgramId}
          isOpen={showViewModal}
          onClose={() => {
            setShowViewModal(false);
            setSelectedProgramId(null);
          }}
          onSuccess={loadPrograms}
        />

      </div>

    </AdminLayout>
  );
};

export default ProgramExpenseManagement;