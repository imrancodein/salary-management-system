import { useEffect, useState } from "react";
import {
  FaTimes,
  FaCheck,
  FaBan,
  FaSpinner,
} from "react-icons/fa";

import {
  getProgramExpenseById,
  updateExpenseStatus,
} from "../../services/programExpense.service";

const ProgramExpenseViewModal = ({
  programId,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [program, setProgram] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  // ========================================
  // LOAD PROGRAM DETAILS
  // ========================================

  const loadProgramDetails = async () => {
    if (!programId) return;

    try {
      setLoading(true);

      const response =
        await getProgramExpenseById(programId);

      console.log(
        "PROGRAM EXPENSE DETAILS:",
        response
      );

      setProgram(response.data?.program || null);
      setExpenses(response.data?.expenses || []);
    } catch (error) {
      console.error(
        "Program Expense Details Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to load expense details."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // LOAD WHEN MODAL OPENS
  // ========================================

  useEffect(() => {
    if (isOpen && programId) {
      loadProgramDetails();
    }
  }, [isOpen, programId]);

  // ========================================
  // FORMAT DATE
  // ========================================

  const formatDate = (date) => {
    if (!date) return "-";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return "-";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // ========================================
  // FORMAT MONEY
  // ========================================

  const formatAmount = (amount) => {
    return Number(amount || 0).toLocaleString(
      "en-IN"
    );
  };

  // ========================================
  // APPROVE
  // ========================================

  const handleApprove = async (expenseId) => {
    const confirmApprove = window.confirm(
      "Are you sure you want to approve this expense?"
    );

    if (!confirmApprove) return;

    try {
      setActionLoading(true);

      await updateExpenseStatus(expenseId, {
        status: "Approved",
        adminRemark: "",
      });

      alert("Expense approved successfully.");

      // Reload details
      await loadProgramDetails();

      // Refresh parent table
      if (onSuccess) {
        await onSuccess();
      }
    } catch (error) {
      console.error(
        "Approve Expense Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to approve expense."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ========================================
  // REJECT
  // ========================================

  const handleReject = async (expenseId) => {
    if (!rejectReason.trim()) {
      alert("Please enter rejection reason.");
      return;
    }

    try {
      setActionLoading(true);

      await updateExpenseStatus(expenseId, {
        status: "Rejected",
        adminRemark: rejectReason.trim(),
      });

      alert("Expense rejected successfully.");

      setRejectReason("");
      setShowRejectBox(false);

      // Reload details
      await loadProgramDetails();

      // Refresh parent table
      if (onSuccess) {
        await onSuccess();
      }
    } catch (error) {
      console.error(
        "Reject Expense Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to reject expense."
      );
    } finally {
      setActionLoading(false);
    }
  };

  // ========================================
  // CLOSE
  // ========================================

  const handleClose = () => {
    if (actionLoading) return;

    setProgram(null);
    setExpenses([]);
    setRejectReason("");
    setShowRejectBox(false);

    onClose();
  };

  // ========================================
  // DON'T RENDER
  // ========================================

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="bg-white w-full max-w-6xl max-h-[90vh] rounded-xl shadow-xl overflow-hidden">

        {/* ==================================
            HEADER
        ================================== */}

        <div className="flex items-center justify-between px-5 py-4 border-b bg-gray-50">

          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Program Expense Details
            </h2>

            {program && (
              <p className="text-sm text-gray-500 mt-1">
                {program.programName}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={actionLoading}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
          >
            <FaTimes size={20} />
          </button>

        </div>


        {/* ==================================
            CONTENT
        ================================== */}

        <div className="p-5 overflow-y-auto max-h-[calc(90vh-75px)]">

          {loading ? (

            <div className="flex flex-col items-center justify-center py-16 text-gray-500">

              <FaSpinner
                className="animate-spin mb-3"
                size={28}
              />

              <p>
                Loading expense details...
              </p>

            </div>

          ) : !program ? (

            <div className="text-center py-16 text-gray-500">
              Program details not found.
            </div>

          ) : (

            <>

              {/* ==================================
                  PROGRAM DETAILS
              ================================== */}

              <div className="mb-6">

                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Program Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

                  {/* Staff */}

                  <div className="bg-gray-50 rounded-lg p-4">

                    <p className="text-xs text-gray-500">
                      Staff
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {program.staff?.name || "-"}
                    </p>

                    {program.staff?.employeeId && (
                      <p className="text-xs text-gray-500">
                        {program.staff.employeeId}
                      </p>
                    )}

                  </div>


                  {/* Program */}

                  <div className="bg-gray-50 rounded-lg p-4">

                    <p className="text-xs text-gray-500">
                      Program
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {program.programName || "-"}
                    </p>

                  </div>


                  {/* Date */}

                  <div className="bg-gray-50 rounded-lg p-4">

                    <p className="text-xs text-gray-500">
                      Program Date
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {formatDate(
                        program.programDate
                      )}
                    </p>

                  </div>


                  {/* Location */}

                  <div className="bg-gray-50 rounded-lg p-4">

                    <p className="text-xs text-gray-500">
                      Location
                    </p>

                    <p className="font-semibold text-gray-800 mt-1">
                      {program.location || "-"}
                    </p>

                  </div>

                </div>


                {/* Amount Summary */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

                  {/* Advance */}

                  <div className="border rounded-lg p-4">

                    <p className="text-sm text-gray-500">
                      Advance Amount
                    </p>

                    <p className="text-xl font-bold text-blue-600 mt-1">
                      ₹
                      {formatAmount(
                        program.advanceAmount
                      )}
                    </p>

                  </div>


                  {/* Total Expense */}

                  <div className="border rounded-lg p-4">

                    <p className="text-sm text-gray-500">
                      Approved Expense
                    </p>

                    <p className="text-xl font-bold text-orange-600 mt-1">
                      ₹
                      {formatAmount(
                        program.totalExpense
                      )}
                    </p>

                  </div>


                  {/* Remaining */}

                  <div className="border rounded-lg p-4">

                    <p className="text-sm text-gray-500">
                      Remaining Amount
                    </p>

                    <p className="text-xl font-bold text-green-600 mt-1">
                      ₹
                      {formatAmount(
                        program.remainingAmount
                      )}
                    </p>

                  </div>

                </div>

              </div>


              {/* ==================================
                  DESCRIPTION
              ================================== */}

              {program.description && (
                <div className="mb-6">

                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Description
                  </h3>

                  <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                    {program.description}
                  </div>

                </div>
              )}


              {/* ==================================
                  EXPENSE DETAILS
              ================================== */}

              <div>

                <div className="flex items-center justify-between mb-4">

                  <h3 className="text-lg font-semibold text-gray-800">
                    Expense Details
                  </h3>

                  <span className="text-sm text-gray-500">
                    {expenses.length} Expense
                    {expenses.length !== 1
                      ? "s"
                      : ""}
                  </span>

                </div>


                {expenses.length === 0 ? (

                  <div className="border rounded-lg p-8 text-center text-gray-500">
                    No expenses submitted yet.
                  </div>

                ) : (

                  <div className="overflow-x-auto border rounded-lg">

                    <table className="w-full min-w-[900px]">

                      <thead className="bg-gray-50">

                        <tr>

                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                            Date
                          </th>

                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                            Category
                          </th>

                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                            Description
                          </th>

                          <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">
                            Amount
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

                        {expenses.map(
                          (expense) => (

                            <tr
                              key={expense._id}
                              className="hover:bg-gray-50"
                            >

                              {/* Date */}

                              <td className="px-4 py-4 text-sm">
                                {formatDate(
                                  expense.expenseDate
                                )}
                              </td>


                              {/* Category */}

                              <td className="px-4 py-4 text-sm font-medium text-gray-800">
                                {expense.category ||
                                  "-"}
                              </td>


                              {/* Description */}

                              <td className="px-4 py-4 text-sm text-gray-600">
                                {expense.description ||
                                  "-"}
                              </td>


                              {/* Amount */}

                              <td className="px-4 py-4 text-sm font-semibold text-orange-600">
                                ₹
                                {formatAmount(
                                  expense.amount
                                )}
                              </td>


                              {/* Status */}

                              <td className="px-4 py-4">

                                <span
                                  className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                    expense.status ===
                                    "Approved"
                                      ? "bg-green-100 text-green-700"
                                      : expense.status ===
                                        "Rejected"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {expense.status ||
                                    "Pending"}
                                </span>

                              </td>


                              {/* ACTION */}

                              <td className="px-4 py-4">

                                {expense.status ===
                                "Pending" ? (

                                  <div className="flex flex-col gap-2">

                                    {/* Buttons */}

                                    <div className="flex gap-2">

                                      <button
                                        type="button"
                                        disabled={
                                          actionLoading
                                        }
                                        onClick={() =>
                                          handleApprove(
                                            expense._id
                                          )
                                        }
                                        className="flex items-center gap-1 bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-3 py-2 rounded-lg text-xs font-medium"
                                      >
                                        <FaCheck />
                                        Approve
                                      </button>


                                      <button
                                        type="button"
                                        disabled={
                                          actionLoading
                                        }
                                        onClick={() => {
                                          setShowRejectBox(
                                            true
                                          );
                                          setRejectReason(
                                            ""
                                          );
                                        }}
                                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-3 py-2 rounded-lg text-xs font-medium"
                                      >
                                        <FaBan />
                                        Reject
                                      </button>

                                    </div>


                                    {/* Reject Box */}

                                    {showRejectBox && (
                                      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg">

                                        <label className="block text-xs font-semibold text-gray-700 mb-1">
                                          Rejection Reason
                                        </label>

                                        <textarea
                                          value={
                                            rejectReason
                                          }
                                          onChange={(e) =>
                                            setRejectReason(
                                              e.target.value
                                            )
                                          }
                                          rows={3}
                                          placeholder="Enter reason for rejection..."
                                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                                        />

                                        <div className="flex gap-2 mt-2">

                                          <button
                                            type="button"
                                            disabled={
                                              actionLoading
                                            }
                                            onClick={() =>
                                              handleReject(
                                                expense._id
                                              )
                                            }
                                            className="bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-3 py-2 rounded-lg text-xs font-medium"
                                          >
                                            {actionLoading
                                              ? "Rejecting..."
                                              : "Reject Expense"}
                                          </button>

                                          <button
                                            type="button"
                                            disabled={
                                              actionLoading
                                            }
                                            onClick={() => {
                                              setShowRejectBox(
                                                false
                                              );
                                              setRejectReason(
                                                ""
                                              );
                                            }}
                                            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-xs font-medium"
                                          >
                                            Cancel
                                          </button>

                                        </div>

                                      </div>
                                    )}

                                  </div>

                                ) : (

                                  <div className="text-xs text-gray-500">

                                    {expense.status ===
                                      "Rejected" &&
                                    expense.adminRemark ? (
                                      <div>
                                        <p className="font-semibold text-red-600">
                                          Reason:
                                        </p>

                                        <p className="text-gray-600 mt-1">
                                          {
                                            expense.adminRemark
                                          }
                                        </p>
                                      </div>
                                    ) : expense.status ===
                                      "Approved" ? (
                                      <span className="text-green-600 font-medium">
                                        Approved
                                      </span>
                                    ) : (
                                      "-"
                                    )}

                                  </div>

                                )}

                              </td>

                            </tr>

                          )
                        )}

                      </tbody>

                    </table>

                  </div>

                )}

              </div>

            </>

          )}

        </div>

      </div>

    </div>
  );
};

export default ProgramExpenseViewModal;