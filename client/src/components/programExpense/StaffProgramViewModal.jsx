import { useEffect, useState } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";

import {
  getMyProgramExpenseItems,
  addProgramExpense,
} from "../../services/programExpense.service";

const StaffProgramViewModal = ({
  programId,
  isOpen,
  onClose,
  onSuccess,
}) => {

  const [loading, setLoading] = useState(false);

  const [program, setProgram] = useState(null);
  const [expenses, setExpenses] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    expenseDate: "",
    category: "",
    description: "",
    amount: "",
  });


  // ========================================
  // LOAD EXPENSES
  // ========================================

  const loadDetails = async () => {

    if (!programId) return;

    try {

      setLoading(true);

      const response =
        await getMyProgramExpenseItems(
          programId
        );

      console.log(
        "STAFF PROGRAM DETAILS:",
        response
      );

      setProgram(
        response.data?.program || null
      );

      setExpenses(
        response.data?.expenses || []
      );

    } catch (error) {

      console.error(
        "Staff Expense Details Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to load program details."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    if (isOpen && programId) {
      loadDetails();
    }

  }, [isOpen, programId]);


  // ========================================
  // DATE FORMAT
  // ========================================

  const formatDate = (date) => {

    if (!date) return "-";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

  };


  // ========================================
  // INPUT
  // ========================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  // ========================================
  // ADD EXPENSE
  // ========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.expenseDate) {
      alert("Please select expense date.");
      return;
    }

    if (!formData.category.trim()) {
      alert("Please enter expense category.");
      return;
    }

    if (!formData.description.trim()) {
      alert("Please enter expense description.");
      return;
    }

    if (
      !formData.amount ||
      Number(formData.amount) <= 0
    ) {
      alert("Please enter valid amount.");
      return;
    }

    try {

      setLoading(true);

      await addProgramExpense({

        programExpense: programId,

        expenseDate:
          formData.expenseDate,

        category:
          formData.category.trim(),

        description:
          formData.description.trim(),

        amount:
          Number(formData.amount),

      });

      alert(
        "Expense submitted successfully."
      );

      setFormData({
        expenseDate: "",
        category: "",
        description: "",
        amount: "",
      });

      setShowForm(false);

      await loadDetails();

      if (onSuccess) {
        await onSuccess();
      }

    } catch (error) {

      console.error(
        "Add Expense Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to add expense."
      );

    } finally {

      setLoading(false);

    }

  };


  // ========================================
  // CLOSE
  // ========================================

  const handleClose = () => {

    setProgram(null);
    setExpenses([]);
    setShowForm(false);

    onClose();

  };


  if (!isOpen) {
    return null;
  }


  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">

        {/* HEADER */}

        <div className="flex items-center justify-between p-5 border-b">

          <div>

            <h2 className="text-xl font-bold text-gray-800">
              Program Expense
            </h2>

            <p className="text-sm text-gray-500">
              View and submit your expenses
            </p>

          </div>

          <button
            type="button"
            onClick={handleClose}
            className="text-gray-500 hover:text-red-600 text-xl"
          >
            <FaTimes />
          </button>

        </div>


        {loading && !program ? (

          <div className="p-10 text-center text-gray-500">
            Loading...
          </div>

        ) : (

          <div className="p-5">


            {/* PROGRAM DETAILS */}

            <div className="border rounded-lg p-4 mb-6">

              <h3 className="font-semibold text-lg mb-4">
                Program Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div>
                  <p className="text-sm text-gray-500">
                    Program
                  </p>

                  <p className="font-semibold">
                    {program?.programName || "-"}
                  </p>
                </div>


                <div>
                  <p className="text-sm text-gray-500">
                    Date
                  </p>

                  <p className="font-semibold">
                    {formatDate(
                      program?.programDate
                    )}
                  </p>
                </div>


                <div>
                  <p className="text-sm text-gray-500">
                    Location
                  </p>

                  <p className="font-semibold">
                    {program?.location || "-"}
                  </p>
                </div>


                <div>
                  <p className="text-sm text-gray-500">
                    Advance
                  </p>

                  <p className="font-semibold text-blue-600">
                    ₹
                    {Number(
                      program?.advanceAmount || 0
                    ).toLocaleString("en-IN")}
                  </p>
                </div>


                <div>
                  <p className="text-sm text-gray-500">
                    Approved Expense
                  </p>

                  <p className="font-semibold text-orange-600">
                    ₹
                    {Number(
                      program?.totalExpense || 0
                    ).toLocaleString("en-IN")}
                  </p>
                </div>


                <div>
                  <p className="text-sm text-gray-500">
                    Remaining
                  </p>

                  <p className="font-semibold text-green-600">
                    ₹
                    {Number(
                      program?.remainingAmount || 0
                    ).toLocaleString("en-IN")}
                  </p>
                </div>

              </div>

            </div>


            {/* ADD EXPENSE BUTTON */}

            {program?.status !== "Completed" && (

              <div className="flex justify-end mb-4">

                <button
                  type="button"
                  onClick={() =>
                    setShowForm(
                      !showForm
                    )
                  }
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >

                  <FaPlus />

                  {showForm
                    ? "Close Form"
                    : "Add Expense"}

                </button>

              </div>

            )}


            {/* EXPENSE FORM */}

            {showForm && (

              <form
                onSubmit={handleSubmit}
                className="border rounded-lg p-4 mb-6 bg-gray-50"
              >

                <h3 className="font-semibold text-lg mb-4">
                  Add Expense
                </h3>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* DATE */}

                  <div>

                    <label className="block text-sm font-medium mb-1">
                      Expense Date
                    </label>

                    <input
                      type="date"
                      name="expenseDate"
                      value={
                        formData.expenseDate
                      }
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2"
                    />

                  </div>


                  {/* CATEGORY */}

                  <div>

                    <label className="block text-sm font-medium mb-1">
                      Category
                    </label>

                    <input
                      type="text"
                      name="category"
                      value={
                        formData.category
                      }
                      onChange={handleChange}
                      placeholder="Travel, Food, Stationery..."
                      className="w-full border rounded-lg px-3 py-2"
                    />

                  </div>


                  {/* DESCRIPTION */}

                  <div className="md:col-span-2">

                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={
                        formData.description
                      }
                      onChange={handleChange}
                      rows="3"
                      placeholder="Enter expense details"
                      className="w-full border rounded-lg px-3 py-2 resize-none"
                    />

                  </div>


                  {/* AMOUNT */}

                  <div>

                    <label className="block text-sm font-medium mb-1">
                      Amount
                    </label>

                    <input
                      type="number"
                      name="amount"
                      value={
                        formData.amount
                      }
                      onChange={handleChange}
                      min="1"
                      placeholder="₹ 0"
                      className="w-full border rounded-lg px-3 py-2"
                    />

                  </div>

                </div>


                <div className="flex justify-end mt-4">

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-5 py-2 rounded-lg font-medium"
                  >
                    {loading
                      ? "Submitting..."
                      : "Submit Expense"}
                  </button>

                </div>

              </form>

            )}


            {/* EXPENSE LIST */}

            <div>

              <h3 className="font-semibold text-lg mb-4">
                My Expenses
              </h3>


              {expenses.length === 0 ? (

                <div className="border rounded-lg p-8 text-center text-gray-500">
                  No expenses submitted yet.
                </div>

              ) : (

                <div className="overflow-x-auto border rounded-lg">

                  <table className="w-full min-w-[750px]">

                    <thead className="bg-gray-50">

                      <tr>

                        <th className="text-left px-4 py-3 text-sm">
                          Date
                        </th>

                        <th className="text-left px-4 py-3 text-sm">
                          Category
                        </th>

                        <th className="text-left px-4 py-3 text-sm">
                          Description
                        </th>

                        <th className="text-left px-4 py-3 text-sm">
                          Amount
                        </th>

                        <th className="text-left px-4 py-3 text-sm">
                          Status
                        </th>

                        <th className="text-left px-4 py-3 text-sm">
                          Admin Remark
                        </th>

                      </tr>

                    </thead>


                    <tbody className="divide-y">

                      {expenses.map(
                        (expense) => (

                          <tr key={expense._id}>

                            <td className="px-4 py-3">
                              {formatDate(
                                expense.expenseDate
                              )}
                            </td>

                            <td className="px-4 py-3 font-medium">
                              {expense.category}
                            </td>

                            <td className="px-4 py-3">
                              {expense.description}
                            </td>

                            <td className="px-4 py-3 font-semibold">
                              ₹
                              {Number(
                                expense.amount || 0
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </td>

                            <td className="px-4 py-3">

                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
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

                            <td className="px-4 py-3 text-sm text-gray-600">
                              {expense.adminRemark ||
                                "-"}
                            </td>

                          </tr>

                        )
                      )}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default StaffProgramViewModal;